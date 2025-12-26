import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity


class FoodRecommender:
    def __init__(self, csv_path):
        # Robust CSV reading
        self.df = pd.read_csv(
            csv_path,
            engine="python",
            on_bad_lines="skip"
        )

        # standardize column names
        self.df.columns = self.df.columns.str.strip().str.lower()

        # rename columns
        self.df = self.df.rename(columns={
            "food name": "food_name",
            "calories (kcal)": "calories",
            "carbohydrates (g)": "carbs",
            "fats (g)": "fats",
            "protein (g)": "proteins",
            "dietary preference": "diet_type"
        })

        # keep required columns only
        self.df = self.df[
            ["food_name", "calories", "carbs", "fats", "proteins", "diet_type"]
        ]

        # numeric cleanup
        for col in ["calories", "carbs", "fats", "proteins"]:
            self.df[col] = pd.to_numeric(self.df[col], errors="coerce")

        self.df = self.df.dropna()

    def recommend(
        self,
        calories,
        carbs,
        fats,
        proteins=0,
        diet_type="Vegetarian",
        top_n=5
    ):
        df = self.df.copy()

        # ---------------------------
        # Diet filter
        # ---------------------------
        df = df[df["diet_type"].str.lower() == diet_type.lower()]

        if df.empty:
            return []

        if calories >= 500:
            min_cal = calories * 0.15
            max_cal = calories * 0.45
        else:
            min_cal = calories * 0.8
            max_cal = calories * 1.2

        df = df[
            (df["calories"] >= min_cal) &
            (df["calories"] <= max_cal)
        ]

        if df.empty:
            return []

        # ---------------------------
        # Feature matrix
        # ---------------------------
        X = df[["calories", "carbs", "fats", "proteins"]].values.astype(float)

        # ---------------------------
        # 🔥 WEIGHT CALORIES MORE
        # ---------------------------
        X[:, 0] = X[:, 0] * 2

        # normalize
        X = X / np.linalg.norm(X, axis=1, keepdims=True)

        # user vector
        user_vector = np.array([[calories * 2, carbs, fats, proteins]])
        user_vector = user_vector / np.linalg.norm(user_vector)

        # similarity
        similarities = cosine_similarity(X, user_vector).flatten()

        df = df.copy()
        df["similarity"] = similarities

        # ---------------------------
        # FINAL TOP FOODS
        # ---------------------------
        top = df.sort_values("similarity", ascending=False).head(top_n)

        return top[
            ["food_name", "calories", "carbs", "fats", "proteins", "diet_type", "similarity"]
        ]
