from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.services.gemini_service import generating_recipe

app=FastAPI(title="AI Recipe Generater API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[ "http://localhost:5173",
        "http://127.0.0.1:5173",],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RecipeRequrst(BaseModel):
    food_name:str

@app.get("/")
def home():
    return {"message": "Backend is Running"}


@app.post("/generate-recipe")
def generate(data:RecipeRequrst):
    return generating_recipe(data.food_name)