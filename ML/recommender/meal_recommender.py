from sklearn.preprocessing import StandardScaler
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
DIET_TYPE_MAP = {
    "veg": "vegetarian",
    "vegetarian": "vegetarian",
    "vegan": "vegan",
    "non-veg": "balanced",
    "nonveg": "balanced",
    "balanced": "balanced",
    "keto": "keto",
    "low-carb": "low-carb",
    "paleo": "paleo"
}

class MealRecommender:
    def __init__(self, dataframe):
        self.df = dataframe.copy()
        self.features = ["Calories", "Proteins", "Carbs", "Fats"]

        self.scaler = StandardScaler()
        self.scaler.fit(self.df[self.features])

    def recommend(
        self,
        user_calories,
        user_proteins,
        user_carbs,
        user_fats,
        diet_type,
        meal_type,
        top_n=5
    ):
        # normalize inputs
        diet_type = diet_type.lower().strip()
        meal_type = meal_type.lower().strip()
        diet_type = DIET_TYPE_MAP.get(diet_type, diet_type)

        # filter dataset
        filtered = self.df[
            (self.df["diet_type"] == diet_type) &
            (self.df["meal_type"] == meal_type)
        ]

        if filtered.empty:
            return []

        # meal-level calorie distribution
        MEAL_CAL_DISTRIBUTION = {
            "breakfast": 0.3,
            "lunch": 0.4,
            "dinner": 0.3
        }

        factor = MEAL_CAL_DISTRIBUTION.get(meal_type, 0.33)

        filtered = filtered.copy()
        filtered["Calories"] *= factor
        filtered["Proteins"] *= factor
        filtered["Carbs"] *= factor
        filtered["Fats"] *= factor

        # scale features
        filtered_scaled = self.scaler.transform(
            filtered[self.features]
        )

        user_df = pd.DataFrame([{
            "Calories": user_calories,
            "Proteins": user_proteins,
            "Carbs": user_carbs,
            "Fats": user_fats
        }])

        user_vector = self.scaler.transform(user_df)

        similarity = cosine_similarity(
            user_vector, filtered_scaled
        )[0]

        filtered["similarity"] = similarity

        return filtered.sort_values(
            by="similarity",
            ascending=False
        ).head(top_n)
