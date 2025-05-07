import axios from "axios";
import { ChangeEvent, useState, useRef } from "react";
import { FiUploadCloud, FiX } from "react-icons/fi";
import Navbar from "../layout/Navbar";

type UploadStatus = "idle" | "uploading" | "success" | "error";

interface FileWithStatus {
    file: File;
    status: UploadStatus;
    progress: number;
    error?: string;
}

export default function FileUploader() {
    const [files, setFiles] = useState<FileWithStatus[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const allowedFileTypes = {
        "image/png": [".png"],
        "image/jpeg": [".jpg", ".jpeg"],
    };
    // Function to validate the file type and size
    function validateFile(file: File): { isValid: boolean; error?: string } {
        const allowedMimeTypes = Object.keys(allowedFileTypes);

        if (!allowedMimeTypes.includes(file.type)) {
            return {
                isValid: false,
                error: "Invalid file type. Only PNG, JPG, and JPEG files are allowed.",
            };
        }

        if (file.size > 10 * 1024 * 1024) {
            // 10MB limit
            return {
                isValid: false,
                error: "File size exceeds 10MB limit.",
            };
        }

        return { isValid: true };
    }

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files).map((file) => {
                const validation = validateFile(file);
                return {
                    file,
                    status: validation.isValid
                        ? ("idle" as UploadStatus)
                        : ("error" as UploadStatus),
                    progress: 0,
                    error: validation.error,
                };
            });
            setFiles((prev) => [...prev, ...newFiles]);
        }
    }

    // Function to trigger the file input dialog
    function triggerFileInput() {
        fileInputRef.current?.click();
    }
    // Function to dismiss a selected file
    function dismissFile(index: number) {
        setFiles((prev) => prev.filter((_, i) => i !== index));
        // Reset the file input value to allow the same file to be selected again
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }
    // Function to dismiss all selected files
    function dismissAllFiles() {
        setFiles([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }
    // Function to handle file upload
    // This function will upload files that are in 'idle' status
    async function handleFileUpload() {
        const filesToUpload = files.filter((f) => f.status === "idle");
        if (filesToUpload.length === 0) return;

        // Create an array of upload promises
        const uploadPromises = filesToUpload.map(async (fileWithStatus) => {
            const formData = new FormData();
            formData.append("image", fileWithStatus.file); // Changed "file" to "image"

            try {
                setFiles((prev) =>
                    prev.map((f) =>
                        f.file === fileWithStatus.file
                            ? { ...f, status: "uploading" as UploadStatus }
                            : f
                    )
                );

                // Replace the URL with your actual upload endpoint
                const response = await axios.post("http://localhost:5003/ocr", formData, { // Changed URL
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    onUploadProgress: (progressEvent) => {
                        // Calculate the progress percentage
                        const progress = progressEvent.total
                            ? Math.round(
                                  (progressEvent.loaded * 100) /
                                      progressEvent.total
                              )
                            : 0;

                        setFiles((prev) =>
                            prev.map((f) =>
                                f.file === fileWithStatus.file
                                    ? { ...f, progress }
                                    : f
                            )
                        );
                    },
                });

                setFiles((prev) =>
                    prev.map((f) =>
                        f.file === fileWithStatus.file
                            ? {
                                  ...f,
                                  status: "success" as UploadStatus,
                                  progress: 100,
                              }
                            : f
                    )
                );
                console.log("OCR Response:", response.data); // Optional: Log the OCR response
            } catch (error: unknown) { // Added ': any' to access error properties
                console.error("Upload error details:", error); // Log the full error object

                let errorMessage = "Upload failed. Please try again.";
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.error("Server Response Data:", error.response.data);
                        console.error("Server Response Status:", error.response.status);
                        errorMessage =
                            error.response.data?.error || // Check for "error" field in response
                            error.response.data?.message || // Check for "message" field
                            `Server error: ${error.response.status}`;
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser
                        console.error("No response received:", error.request);
                        errorMessage = "Network error or server not reachable. Check browser console (Network tab).";
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        errorMessage = error.message;
                    }
                } else if (error instanceof Error) {
                    errorMessage = error.message;
                }

                setFiles((prev) =>
                    prev.map((f) =>
                        f.file === fileWithStatus.file
                            ? { ...f, status: "error" as UploadStatus, error: errorMessage } // Store the detailed error
                            : f
                    )
                );
            }
        });

        // Upload all files concurrently
        await Promise.all(uploadPromises);
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <section className="bg-gradient-to-r from-blue-800 to-emerald-600 text-white py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-center flex items-center justify-center">
                        Upload Files
                    </h1>
                </div>
            </section>
            {/* Main content area */}
            <main className="flex-shrink flex items-center justify-center py-12">
                <div className="max-w-md w-full mx-auto p-6 border border-gray-200 rounded-lg shadow-md bg-white space-y-4">
                    {/* Hidden file input */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        multiple
                        accept=".png,.jpg,.jpeg" // Updated accept types
                    />

                    {/* Custom file input trigger */}
                    <div className="relative">
                        <button
                            onClick={triggerFileInput}
                            className="w-full flex flex-col items-center justify-center px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition-colors duration-200">
                            <FiUploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                            <span className="text-sm font-medium text-gray-600">
                                {files.length > 0
                                    ? "Add more files"
                                    : "Drag and drop your files here"}
                            </span>
                            <span className="text-xs text-gray-500">
                                PNG, JPG, JPEG only (up to 10MB) {/* Updated file types text */}
                            </span>
                        </button>
                    </div>

                    {/* Select File Button */}
                    <button
                        onClick={triggerFileInput}
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
                        Select Files
                    </button>

                    {/* Instructions for the user */}
                    <div className="relative">
                        <ul className="w-full flex flex-col items-center justify-center text-gray-600">
                            Instructions:
                            <li className="flex items-center text-center justify-center text-sm text-gray-600">
                                1. Make sure that there is enough contrast
                                between the image and the background for better
                                visibility.
                            </li>
                            <li className="flex items-center text-center justify-center text-sm text-gray-600">
                                2. Check the ledger generated by the system to
                                ensure that the data is accurate and complete
                                before committing to the database.
                            </li>
                            <li className="flex items-center text-center justify-center text-sm text-gray-600">
                                3. Maximum file size is 10MB.
                            </li>
                            <li className="flex items-center text-center justify-center text-sm text-gray-600 ">
                                4. Supported file types: PNG, JPG, and JPEG. {/* Updated file types text */}
                            </li>
                        </ul>
                    </div>

                    {files.length > 0 && (
                        // Display the list of selected files
                        <div className="space-y-3">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-600">
                                    {files.length} file(s) selected
                                </span>
                                <button
                                    onClick={dismissAllFiles}
                                    className="text-sm text-red-500 hover:text-red-700 font-medium">
                                    Cancel All
                                </button>
                            </div>
                            {files.map((fileWithStatus, index) => (
                                <div
                                    key={fileWithStatus.file.name + index}
                                    className={`text-sm border rounded-md p-3 ${
                                        fileWithStatus.error
                                            ? "border-red-200 bg-red-50"
                                            : "border-gray-200 bg-gray-50"
                                    } relative`}>
                                    {/* Dismiss button for each file */}
                                    <button
                                        onClick={() => dismissFile(index)}
                                        className="absolute top-2 right-2 text-gray-500 hover:text-red-500">
                                        <FiX className="w-5 h-5" />
                                    </button>
                                    <p className="font-medium text-gray-800 pr-8">
                                        {fileWithStatus.file.name}
                                    </p>
                                    <p className="text-gray-600 text-xs">
                                        Size:{" "}
                                        {(
                                            fileWithStatus.file.size / 1024
                                        ).toFixed(2)}{" "}
                                        KB
                                    </p>
                                    {fileWithStatus.error && (
                                        <p className="text-sm text-red-600 mt-1">
                                            {fileWithStatus.error}
                                        </p>
                                    )}
                                    {fileWithStatus.status === "uploading" && (
                                        <div className="mt-2 space-y-1">
                                            <div className="h-2 w-full rounded-full bg-gray-200">
                                                <div
                                                    className="h-2 rounded-full bg-blue-500 transition-all duration-300 ease-out"
                                                    style={{
                                                        width: `${fileWithStatus.progress}%`,
                                                    }}></div>
                                            </div>
                                            <p className="text-xs text-blue-600 text-right">
                                                {fileWithStatus.progress}%
                                                uploaded
                                            </p>
                                        </div>
                                    )}
                                    {fileWithStatus.status === "success" && (
                                        <p className="text-sm text-green-600 mt-1">
                                            Upload complete
                                        </p>
                                    )}
                                    {fileWithStatus.status === "error" && (
                                        <p className="text-sm text-red-600 mt-1">
                                            Upload failed
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Show button container if files are selected */}
                    {files.length > 0 &&
                        files.some((f) => f.status === "idle") && (
                            <button
                                onClick={handleFileUpload}
                                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200">
                                Upload{" "}
                                {
                                    files.filter((f) => f.status === "idle")
                                        .length
                                }{" "}
                                Files
                            </button>
                        )}
                </div>
            </main>
        </div>
    );
}
