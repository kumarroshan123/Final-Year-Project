from sqlalchemy.orm import Session
from sqlalchemy import func
from database import get_db
from models.transaction_model import transactions

from datetime import datetime

def get_key_metrics():
    db: Session = next(get_db())

    # Total Revenue = Sum of (selling price * quantity)
    total_revenue = db.query(
        func.sum(transactions.sellingPrice * transactions.quantity)
    ).scalar() or 0

    # Total number of orders (each row = one transaction/order)
    total_orders = db.query(transactions).count()

    # Average Order Value
    avg_order_value = total_revenue / total_orders if total_orders else 0

    # NOTE: Removed Customer Lifetime Value (no customer table or relation exists)

    return {
        "totalRevenue": total_revenue,
        "averageOrderValue": avg_order_value,
        "totalOrders": total_orders
    }

def get_monthly_sales():
    db: Session = next(get_db())

    # Group sales by month
    results = db.query(
        func.date_trunc('month', transactions.date).label("month"),
        func.sum(transactions.sellingPrice * transactions.quantity).label("sales")
    ).group_by("month").order_by("month").all()

    # Add dummy profit (e.g., 25% of sales as estimated profit)
    response = [
        {
            "month": month.strftime("%b"),
            "sales": float(sales),
            "profit": float(sales) * 0.25  # Dummy profit logic
        }
        for month, sales in results
    ]

    return response
