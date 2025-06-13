import random
import datetime
import sys
import psycopg2
from psycopg2.extras import execute_values

# Database connection settings - update these to match your environment
DATABASE_URL = "postgresql://postgres:mainak@localhost:5432/ledger"

# Connect to the database
try:
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()
    print("Connected to the database successfully!")
except Exception as e:
    print(f"Error connecting to the database: {e}")
    sys.exit(1)

# Get existing user IDs from the database
def get_user_ids():
    try:
        cursor.execute("SELECT id FROM users")
        user_ids = [row[0] for row in cursor.fetchall()]
        if not user_ids:
            print("No users found in the database. Please create at least one user first.")
            sys.exit(1)
        return user_ids
    except Exception as e:
        print(f"Error fetching user IDs: {e}")
        sys.exit(1)
        
# If you want to use a fixed user ID for testing
DEFAULT_USER_ID = 2

# Define items and their unit prices (based on the image and expanded)
items = {
    # Items from the image
    "Basmati rice": {"unit": "kg", "price": 180, "unit_options": [1, 2, 5, 10]},
    "Red lentils": {"unit": "kg", "price": 120, "unit_options": [0.5, 1, 2]},
    "Mustard oil": {"unit": "L", "price": 160, "unit_options": [0.5, 1, 2, 5]},
    "Salt": {"unit": "kg", "price": 25, "unit_options": [0.5, 1, 2]},
    "Atta (Wheat Flour)": {"unit": "kg", "price": 200, "unit_options": [1, 2, 5, 10]},
    "Sugar": {"unit": "kg", "price": 90, "unit_options": [0.5, 1, 2, 5]},
    "Turmeric powder": {"unit": "gm", "price": 0.16, "unit_options": [100, 200, 500]},
    "Tea leaves": {"unit": "gm", "price": 0.6, "unit_options": [100, 250, 500]},
    "Groundnut oil": {"unit": "L", "price": 200, "unit_options": [0.5, 1, 2, 5]},
    "Jaggery": {"unit": "gm", "price": 0.12, "unit_options": [250, 500, 1000]},
    "Red chilli powder": {"unit": "gm", "price": 0.35, "unit_options": [100, 200, 500]},
    "Cumin seeds": {"unit": "gm", "price": 0.4, "unit_options": [100, 250, 500]},
    "Black pepper": {"unit": "gm", "price": 1.2, "unit_options": [50, 100, 200]},
    
    # Additional Indian grocery items
    "Coriander powder": {"unit": "gm", "price": 0.3, "unit_options": [100, 200, 500]},
    "Cardamom": {"unit": "gm", "price": 2.5, "unit_options": [50, 100, 200]},
    "Cloves": {"unit": "gm", "price": 1.8, "unit_options": [50, 100, 200]},
    "Green gram": {"unit": "kg", "price": 130, "unit_options": [0.5, 1, 2]},
    "Chickpeas": {"unit": "kg", "price": 110, "unit_options": [0.5, 1, 2]},
    "Bay leaves": {"unit": "gm", "price": 0.5, "unit_options": [50, 100, 200]},
    "Dry red chilli": {"unit": "gm", "price": 0.6, "unit_options": [100, 200, 500]},
    "Moong dal": {"unit": "kg", "price": 140, "unit_options": [0.5, 1, 2]},
    "Masoor dal": {"unit": "kg", "price": 115, "unit_options": [0.5, 1, 2]},
    "Refined oil": {"unit": "L", "price": 150, "unit_options": [0.5, 1, 2, 5]},
    "Sunflower oil": {"unit": "L", "price": 170, "unit_options": [0.5, 1, 2, 5]},
    "Besan (Gram Flour)": {"unit": "kg", "price": 100, "unit_options": [0.5, 1, 2]},
    "Toor dal": {"unit": "kg", "price": 125, "unit_options": [0.5, 1, 2]},
    "Urad dal": {"unit": "kg", "price": 135, "unit_options": [0.5, 1, 2]},
    "Poha": {"unit": "kg", "price": 80, "unit_options": [0.5, 1, 2]},
    "Suji (Semolina)": {"unit": "kg", "price": 60, "unit_options": [0.5, 1, 2]},
    "Ghee": {"unit": "kg", "price": 550, "unit_options": [0.25, 0.5, 1]},
    "Coconut oil": {"unit": "L", "price": 220, "unit_options": [0.5, 1]},
    "Tamarind": {"unit": "gm", "price": 0.2, "unit_options": [100, 250, 500]},
    "Fennel seeds": {"unit": "gm", "price": 0.5, "unit_options": [100, 200]},
    "Fenugreek seeds": {"unit": "gm", "price": 0.3, "unit_options": [100, 200]},
    "Asafoetida": {"unit": "gm", "price": 2.0, "unit_options": [50, 100]},
    "Cashew nuts": {"unit": "gm", "price": 1.0, "unit_options": [100, 250, 500]},
    "Almonds": {"unit": "gm", "price": 1.2, "unit_options": [100, 250, 500]},
    "Raisins": {"unit": "gm", "price": 0.5, "unit_options": [100, 250, 500]},
    "Peanuts": {"unit": "kg", "price": 160, "unit_options": [0.5, 1]},
    "Chana dal": {"unit": "kg", "price": 95, "unit_options": [0.5, 1, 2]},
    "Rajma (Kidney beans)": {"unit": "kg", "price": 140, "unit_options": [0.5, 1]},
    "Sago": {"unit": "kg", "price": 120, "unit_options": [0.5, 1]},
    "Vermicelli": {"unit": "kg", "price": 90, "unit_options": [0.5, 1]},
    "Baking soda": {"unit": "gm", "price": 0.15, "unit_options": [100, 200]},
    "Baking powder": {"unit": "gm", "price": 0.2, "unit_options": [100, 200]},
    "Custard powder": {"unit": "gm", "price": 0.3, "unit_options": [100, 200]},
    "Jelly crystals": {"unit": "gm", "price": 0.25, "unit_options": [100, 200]},
    "Honey": {"unit": "gm", "price": 0.6, "unit_options": [250, 500]},
    "Jam": {"unit": "gm", "price": 0.3, "unit_options": [250, 500]},
    "Pickle": {"unit": "gm", "price": 0.25, "unit_options": [250, 500]},
    "Papad": {"unit": "gm", "price": 0.4, "unit_options": [100, 200]}
}

# Generate a date within the last 2 months
def generate_date():
    end_date = datetime.datetime.now()
    start_date = end_date - datetime.timedelta(days=60)  # 2 months period
    days_between = (end_date - start_date).days
    random_days = random.randint(0, days_between)
    return (start_date + datetime.timedelta(days=random_days)).strftime("%Y-%m-%d")

# Format quantity string based on unit and value
def format_quantity(quantity, unit):
    if unit == "kg" or unit == "L":
        return f"{quantity}{unit}"
    elif unit == "gm":
        return f"{int(quantity)}gm"
    return str(quantity) + unit

# Generate transactions with 2-7 items per order
def generate_transactions(num_transactions=300):
    # Use a fixed user ID or get from database
    # user_ids = get_user_ids()
    user_id = DEFAULT_USER_ID  # For simplicity, using a fixed user ID
    
    transactions = []
    current_id = 1
    order_count = 0
    
    while len(transactions) < num_transactions:
        # Generate a new order with 2-7 items
        order_id = f"{order_count + 1}"  # Simple sequential order IDs
        order_date = generate_date()
        order_items_count = random.randint(2, 7)  # 2-7 items per order
        
        # Create a timestamp for this order
        timestamp = datetime.datetime.strptime(order_date, "%Y-%m-%d")
        timestamp = timestamp.replace(hour=random.randint(9, 18), minute=random.randint(0, 59), second=random.randint(0, 59))
        timestamp_str = timestamp.strftime("%Y-%m-%d %H:%M:%S.%f")[:-3] + "+05:30"
        
        # Select random items for this order (without duplicates)
        order_items = random.sample(list(items.keys()), order_items_count)
        
        for item_name in order_items:
            item_data = items[item_name]
            quantity_value = random.choice(item_data["unit_options"])
            unit = item_data["unit"]
            
            # Calculate price based on quantity and unit price
            if unit == "gm":
                selling_price = int(quantity_value * item_data["price"])
            else:
                selling_price = int(quantity_value * item_data["price"])
            
            # Format quantity string
            quantity_str = format_quantity(quantity_value, unit)
            
            transaction = {
                "id": current_id,
                "UserId": user_id,
                "date": order_date,
                "item": item_name,
                "sellingPrice": str(selling_price),
                "createdAt": timestamp_str,
                "updatedAt": timestamp_str,
                "orderID": order_id,
                "quantity": quantity_str
            }
            
            transactions.append(transaction)
            current_id += 1
            
            # Break if we've reached the target number of transactions
            if len(transactions) >= num_transactions:
                break
        
        order_count += 1
    
    return transactions[:num_transactions]  # Ensure exactly num_transactions are returned

# Insert transactions into the database
def insert_transactions(transactions):
    try:
        # Prepare data for bulk insert
        values = [(
            t["UserId"], 
            t["date"], 
            t["item"], 
            t["sellingPrice"], 
            t["createdAt"], 
            t["updatedAt"], 
            t["orderID"], 
            t["quantity"]
        ) for t in transactions]
        
        # Bulk insert using execute_values
        execute_values(
            cursor,
            """
            INSERT INTO transactions 
            ("UserId", date, item, "sellingPrice", "createdAt", "updatedAt", "orderID", quantity) 
            VALUES %s
            """,
            values
        )
        
        conn.commit()
        print(f"Successfully inserted {len(transactions)} transactions!")
    except Exception as e:
        conn.rollback()
        print(f"Error inserting transactions: {e}")
        sys.exit(1)

# Main execution
if __name__ == "__main__":
    num_transactions = 300  # Default number of transactions to generate
    
    # Allow command-line argument to specify number of transactions
    if len(sys.argv) > 1:
        try:
            num_transactions = int(sys.argv[1])
        except ValueError:
            print("Invalid number of transactions. Using default value of 300.")
    
    print(f"Generating {num_transactions} random transactions...")
    transactions = generate_transactions(num_transactions)
    print(f"Generated {len(transactions)} transactions. Inserting into database...")
    insert_transactions(transactions)
    
    # Close database connection
    cursor.close()
    conn.close()
    print("Database connection closed.")