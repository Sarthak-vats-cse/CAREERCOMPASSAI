from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.recommendation_routes import router as recommendation_router

app = FastAPI(
    title="Career Compass AI",
    description="AI Powered Career Guidance Platform",
    version="1.0"
)

# =====================================
# CORS Configuration
# =====================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =====================================
# Routers
# =====================================


app.include_router(recommendation_router)

# =====================================
# Home
# =====================================

@app.get("/")
def home():
    return {
        "message": "Career Compass AI Backend Running"
    }

# =====================================
# Health Check
# =====================================

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }