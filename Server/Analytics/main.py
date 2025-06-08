# Server/main.py
from fastapi import FastAPI
from Analytics.routes.analytics_routes import router as analytics_router
# Import other routers as needed
# from Auth-Service.routes.auth_routes import router as auth_router

app = FastAPI()

# Include routers
app.include_router(analytics_router, prefix="/analytics")
# app.include_router(auth_router, prefix="/auth")

@app.get("/")
def root():
    return {"message": "Welcome to LedgerSense API"}

# You can run this via: uvicorn main:app --reload
