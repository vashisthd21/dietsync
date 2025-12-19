from flask import Flask, request, jsonify

# old task
from preprocessing.clean_data import load_and_clean_data
from recommender.meal_recommender import MealRecommender

# new task
from recommender.food_recommender import FoodRecommender

app = Flask(__name__)

# =====================================
# OLD TASK SETUP (user preference work)
# =====================================
FINAL_DATA_PATH = "data/Final_data.xlsx"
final_df = load_and_clean_data(FINAL_DATA_PATH)
meal_recommender = MealRecommender(final_df)

# =====================================
# NEW TASK SETUP (macros → food)
# =====================================
FOOD_DATA_PATH = "data/indian_food_nutrition_dataset.csv"
food_recommender = FoodRecommender(FOOD_DATA_PATH)

# =====================================
# HEALTH CHECK
# =====================================
@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})

# =====================================
# OLD ENDPOINT (KEEP AS IT IS)
# =====================================
@app.route("/recommend-meal", methods=["POST"])
def recommend_meal():
    data = request.json

    results = meal_recommender.recommend(
        user_calories=data["calories"],
        user_proteins=data["proteins"],
        user_carbs=data["carbs"],
        user_fats=data["fats"],
        diet_type=data["diet_type"],
        meal_type=data["meal_type"],
        top_n=5
    )

    if results is None or len(results) == 0:
        return jsonify([])

    return jsonify(results.to_dict(orient="records"))

@app.route("/recommend-food", methods=["POST"])
def recommend_food():
    data = request.json

    results = food_recommender.recommend(
        calories=data["calories"],
        carbs=data["carbs"],
        fats=data["fats"],
        proteins=data.get("proteins", 0),
        diet_type=data.get("diet_type", "Vegetarian"),
        top_n=5
    )

    # 🔥 FIX: handle empty or list result
    if results is None or isinstance(results, list):
        return jsonify([])

    return jsonify(results.to_dict(orient="records"))

# =====================================
# RUN SERVER
# =====================================
if __name__ == "__main__":
    app.run(port=5001, debug=True)
