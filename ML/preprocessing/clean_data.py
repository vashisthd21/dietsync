import pandas as pd

REQUIRED_COLS = [
    "diet_type",
    "meal_type",
    "Calories",
    "Proteins",
    "Carbs",
    "Fats"
]

def load_and_clean_data(file_path):
    df = pd.read_excel(file_path)

    df = df[REQUIRED_COLS]
    df.dropna(inplace=True)

    # ✅ NORMALIZE TEXT DATA
    df["diet_type"] = df["diet_type"].str.strip().str.lower()
    df["meal_type"] = df["meal_type"].str.strip().str.lower()

    return df
