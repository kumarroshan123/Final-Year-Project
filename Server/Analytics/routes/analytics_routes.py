from fastapi import APIRouter
from Analytics.services.analytics_service import (
    get_key_metrics,
    get_monthly_sales
)

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("/key-metrics")
def key_metrics():
    return get_key_metrics()

@router.get("/monthly-sales")
def monthly_sales():
    return get_monthly_sales()
