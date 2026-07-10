import os
import json
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def generating_recipe(food_name: str):
    prompt = f"""You are an expert chef. Generate a recipe ONLY for the food: "{food_name}".
    Rules:
    1. If "{food_name}" is not a food or drink, return:
    {{
      "success": false,
      "message": "I can only generate recipes for food and beverages."
    }}

    2. If it is a food or drink, return ONLY valid JSON matching this schema:
    {{
      "success": true,
      "food_name": "Name of the dish",
      "description": "Short description of the dish",
      "prep_time": "Prep duration",
      "cook_time": "Cook duration",
      "servings": "Number of servings",
      "difficulty": "Easy, Medium, or Hard",
      "ingredients": ["A flat array of string ingredients including measurements, no sub-objects or categories"],
      "instructions": ["Step-by-step list of instructions"],
      "tips": ["Useful kitchen tips"],
      "nutrition": {{
        "calories": "Calories info",
        "protein": "Protein info",
        "carbs": "Carbohydrates info",
        "fat": "Fat info"
      }}
    }}
    """
    
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json"
            )
        )
        return json.loads(response.text)
    except json.JSONDecodeError as e:
        print("JSONDecodeError details:", str(e))
        print("Raw response.text was:")
        print(response.text)
        return {
            "success": False,
            "message": "Invalid response format returned from Gemini."
        }
    except Exception as e:
        import traceback
        traceback.print_exc()
        return {
            "success": False,
            "message": f"An error occurred: {str(e)}"
        }