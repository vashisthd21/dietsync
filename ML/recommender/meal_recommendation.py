import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

DATA_PATH = "data/indian_food_nutrition_dataset.csv"

def recommend_meals(target, diet_type, meal_type, top_k=5):
    df = pd.read_csv(DATA_PATH)

    # Normalize column names (important)
    df.columns = df.columns.str.lower()

    # Filter
    df = df[df["dietary preference"].str.lower() == diet_type.lower()]

    # Features
    features = ["calories (kcal)", "carbohydrates (g)", "fats (g)", "protein (g)"]

    X = df[features].values
    target_vector = [[
        target["calories"],
        target["carbs"],
        target["fats"],
        target["proteins"]
    ]]

    similarities = cosine_similarity(X, target_vector).flatten()
    df["similarity"] = similarities

    top = df.sort_values("similarity", ascending=False).head(top_k)

    return top[[
        "food name",
        "calories (kcal)",
        "carbohydrates (g)",
        "fats (g)",
        "protein (g)",
        "dietary preference",
        "similarity"
    ]].to_dict(orient="records")
