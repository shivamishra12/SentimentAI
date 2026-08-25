from flask import Flask, request, jsonify, render_template
import joblib

app = Flask(__name__)

model = joblib.load("sentiment_model.pkl")


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    review = data.get("review", "")

    if not review:
        return jsonify({"error": "No text provided"}), 400

    prediction = model.predict([review])[0]
    sentiment = "positive" if prediction == 1 else "negative"

    return jsonify({
        "review": review,
        "sentiment": sentiment
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)