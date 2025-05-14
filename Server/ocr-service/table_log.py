import os
import numpy as np
import pandas as pd
import re
import matplotlib.pyplot as plt
import cv2
from paddleocr import PaddleOCR

def config_ocr_engine():
    try:
        print("Initializing PaddleOCR...")
        ocr_engine = PaddleOCR(use_angle_cls=True, lang="en", use_gpu=False, show_log=False)
        print("PaddleOCR initialized successfully.")
        return ocr_engine
    except Exception as e:
        print(f"Error initializing PaddleOCR: {e}")
        print("Please ensure that paddleocr and paddlepaddle are installed correctly.")
        return None
    
def process_image(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    binary = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 11, 4)
    blurred = cv2.medianBlur(binary, 3)
    return gray, blurred

def get_table_structure(blurred):
    horizontal_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (40, 1))
    detect_horizontal = cv2.morphologyEx(blurred, cv2.MORPH_OPEN, horizontal_kernel, iterations=2)
    cnts_h = cv2.findContours(detect_horizontal, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cnts_h = cnts_h[0] if len(cnts_h) == 2 else cnts_h[1]
    horizontal_lines = []
    for c in cnts_h:
        x, y, w, h = cv2.boundingRect(c)
        if w > 50:
            horizontal_lines.append((x, y, x + w, h))

    vertical_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (1, 40))
    detect_vertical = cv2.morphologyEx(blurred, cv2.MORPH_OPEN, vertical_kernel, iterations=2)
    cnts_v = cv2.findContours(detect_vertical, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cnts_v = cnts_v[0] if len(cnts_v) == 2 else cnts_v[1]
    vertical_lines = []
    for c in cnts_v:
        x, y, w, h = cv2.boundingRect(c)
        if h > 50:
            vertical_lines.append((x, y, x, y + h))

    horizontal_lines.sort(key=lambda line:line[1])
    vertical_lines.sort(key=lambda line:line[0])

    return horizontal_lines, vertical_lines

def extract_table(ocr_engine, gray, horizontal_lines, vertical_lines):
    table_data = []
    cell_padding = 3

    if not horizontal_lines or not vertical_lines or len(horizontal_lines) < 2 or len(vertical_lines) < 2:
        print(f"Warning: Could not detect enough horizontal lines or vertical lines to form a grid")
    else:
        print(f"Detected potential structure: {len(horizontal_lines) - 1} rows, {len(vertical_lines) - 1} columns.")
        for i in range(len(horizontal_lines) - 1):
            row_data = []
            y1 = horizontal_lines[i][1]
            y2 = horizontal_lines[i+1][1]
            for j in range(len(vertical_lines) - 1):
                x1 = vertical_lines[j][0]
                x2 = vertical_lines[j+1][0]
                # --- Cell Extraction ---
                if y1 < y2 and x1 < x2:
                    roi_y1 = max(0, y1 + cell_padding)
                    roi_y2 = min(gray.shape[0], y2 - cell_padding)
                    roi_x1 = max(0, x1 + cell_padding)
                    roi_x2 = min(gray.shape[1], x2 - cell_padding)
                    if roi_y1 < roi_y2 and roi_x1 < roi_x2:
                        cell_image = gray[roi_y1:roi_y2, roi_x1:roi_x2]
                        cell_image_bordered = cv2.copyMakeBorder(cell_image, 5, 5, 5, 5, cv2.BORDER_CONSTANT, value=[255])

                        cell_text = ""
                        try:
                            result = ocr_engine.ocr(cell_image_bordered, cls=False)
                            if result and result[0]:
                                texts = [line[1][0] for line in result[0] if line and len(line) > 1]
                                cell_text = " ".join(texts).strip()
                                cell_text = cell_text.replace('\n', ' ').replace('\r', ' ')
                        except Exception as e:
                            print(f"PaddleOCR for cell ({i}, {j}): {e}")
                            cell_text = "[OCR Error]"
                        row_data.append(cell_text)
                    else:
                        row_data.append("[Invalid ROI]")
                else:
                    row_data.append("[Invalid Coords]")

            if row_data:
                table_data.append(row_data)

    return clean_table_data(table_data)

def clean_cell(x):
    if isinstance(x, (list, tuple)) or hasattr(x, 'tolist'):
        try:
            x = x[0]
        except Exception:
            pass
    s = str(x).strip()
    if s.startswith('[') and s.endswith(']'):
        s = s[1:-1].strip()
    return s

def is_stopword(s):
    if not s:
        return True
    if s in {'-', '--'}:
        return True
    if re.search(r'Invalid', s, re.IGNORECASE):
        return True
    return False

def clean_table_data(table_data):
    if table_data:
        df = pd.DataFrame(table_data)
        try:
            if all(isinstance(x, str) and len(x) > 0 and not x.isnumeric() for x in df.iloc[0]):
                df.columns = df.iloc[0]
                df = df[1:]
                df = df.reset_index(drop=True)
        except Exception:
            pass
    else:
        return pd.DataFrame()
    
    df_cleaned = df.applymap(clean_cell)

    mask = df_cleaned.applymap(is_stopword)

    keep_cols = ~mask.all(axis=0)
    df_cleaned = df_cleaned.loc[:, keep_cols]
    
    keep_rows = ~mask.all(axis=1)
    df_cleaned = df_cleaned.loc[keep_rows, :]

    df_cleaned.reset_index(drop=True, inplace=True)
    
    df_header = df_cleaned.iloc[0]
    df_res = df_cleaned[1:].copy()
    df_res.columns = df_header
    df_res = df_res.reset_index(drop=True)

    df_res['OrderID'] = df_res['OrderID'].replace(r'^\s*$', np.nan, regex=True)
    df_res['OrderID'] = df_res['OrderID'].ffill()
    # df_res['OrderID'] = df_res['OrderID'].astype(int)

    return df_res

def result_table_log(img):
    ocr_engine = config_ocr_engine()
    if ocr_engine is None:
        return None
    
    gray, blurred = process_image(img)
    horizontal_lines, vertical_lines = get_table_structure(blurred)
    table_data = extract_table(ocr_engine, gray, horizontal_lines, vertical_lines)
    if table_data.empty:
        print("No table data extracted.")
        return None
    
    print("Table data extracted successfully.")
    return table_data