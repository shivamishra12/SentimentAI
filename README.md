# SentimentAI

SentimentAI is an end-to-end **Machine Learning and Natural Language Processing (NLP) web application** that analyzes movie reviews and classifies their sentiment as **Positive** or **Negative**.

The project uses **TF-IDF n-gram feature extraction** with a **Linear Support Vector Machine (LinearSVC)** classifier. The trained model is serialized using Joblib and integrated into a **Flask REST API**, which powers the web application.

---

## 🚀 Live Demo

**Live Application:**
https://sentimentai-0rv2.onrender.com/

---

## ✨ Features

* **Real-time Sentiment Analysis**

  * Enter a movie review and get an instant Positive/Negative prediction.

* **NLP Text Preprocessing**

  * HTML removal
  * Lowercasing
  * Stopword removal
  * Punctuation removal
  * Tokenization
  * Stemming

* **TF-IDF Feature Extraction**

  * Uses unigram, bigram, trigram, and 4-gram features.

* **Linear SVM Classification**

  * Uses `LinearSVC` as the final classifier.

* **Model Comparison**

  * Multinomial Naive Bayes
  * Logistic Regression
  * Linear SVM

* **Hyperparameter Tuning**

  * Tested multiple TF-IDF n-gram ranges.
  * Tested multiple `C` values for LinearSVC.

* **REST API**

  * Provides a `/predict` endpoint for programmatic predictions.

* **Web Interface**

  * Allows users to enter reviews and view predictions.

* **Cloud Deployment**

  * Deployed on Render using Flask and Gunicorn.

---

## 📊 Dataset

This project uses the **IMDb Dataset of 50K Movie Reviews**.

### Dataset Details

| Property         |             Value |
| ---------------- | ----------------: |
| Total Reviews    |            50,000 |
| Positive Reviews |            25,000 |
| Negative Reviews |            25,000 |
| Classification   |            Binary |
| Input            | Movie Review Text |
| Target           |         Sentiment |

### Dataset Source

**Kaggle:**
https://www.kaggle.com/datasets/lakshmi25npathi/imdb-dataset-of-50k-movie-reviews

### Train-Test Split

The dataset is divided using an **80/20 train-test split**.

```text
50,000 Total Reviews
        ↓
40,000 Training Reviews
10,000 Testing Reviews
```

---

## 🧠 Machine Learning Approach

The sentiment classification pipeline follows these steps:

```text
Movie Review
     ↓
Text Preprocessing
     ↓
TF-IDF Vectorization
     ↓
1–4 Word N-grams
     ↓
LinearSVC
     ↓
Positive / Negative
```

### 🔄 How It Works

The complete application follows this flow:

```text
User
 ↓
Web Interface
 ↓
JavaScript
 ↓
POST /predict
 ↓
Flask API
 ↓
sentiment_model.pkl
 ↓
TF-IDF
 ↓
LinearSVC
 ↓
Prediction
 ↓
JSON Response
 ↓
Web Interface
```

---

## 📁 Project Structure

```text
SentimentAI/
│
├── static/
│   ├── script.js
│   └── style.css
│
├── templates/
│   └── index.html
│
├── .gitignore
├── app.py
├── README.md
├── requirements.txt
├── sentiment_model.pkl
└── SentimentAnalysis.ipynb
```

---

## 📋 File Description

| File                      | Description                                                   |
| ------------------------- | ------------------------------------------------------------- |
| `app.py`                  | Flask backend and REST API                                    |
| `sentiment_model.pkl`     | Trained TF-IDF + LinearSVC Pipeline                           |
| `requirements.txt`        | Python dependencies                                           |
| `SentimentAnalysis.ipynb` | Data preprocessing, experimentation, training, and evaluation |
| `templates/index.html`    | Web interface                                                 |
| `static/script.js`        | Frontend/API interaction                                      |
| `static/style.css`        | Frontend styling                                              |
| `.gitignore`              | Git ignored files                                             |
| `README.md`               | Project documentation                                         |

---

## 📊 Machine Learning Models

Multiple classification algorithms were evaluated during experimentation:

| Model                   | Purpose                          |
| ----------------------- | -------------------------------- |
| Multinomial Naive Bayes | Baseline text classification     |
| Logistic Regression     | Linear classification comparison |
| LinearSVC               | Final selected model             |

The final application uses **LinearSVC** because it provided strong performance for the text classification task.

---

## ⚙️ Hyperparameter Tuning

The project experimented with:

### TF-IDF N-gram Ranges

```text
Unigram       → (1,1)
Bigram        → (1,2)
Trigram       → (1,3)
4-gram        → (1,4)
```

### LinearSVC C Values

Multiple `C` values were tested to determine an effective regularization parameter for the final model.

---

## 🌐 REST API

The Flask application exposes a `/predict` endpoint for sentiment prediction.

### Endpoint

```text
POST /predict
```

### Example Request

```json
{
  "review": "This movie was absolutely fantastic!"
}
```

### Example Response

```json
{
  "sentiment": "Positive"
}
```

---

## 💻 Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/shivamishra12/SentimentAI.git
cd SentimentAI
```

### 2. Create a Virtual Environment

#### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

#### macOS/Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the Application

```bash
python app.py
```

### 5. Open the Application

```text
http://127.0.0.1:5000
```

---

## 🌍 Live Application

**SentimentAI:**
https://sentimentai-0rv2.onrender.com/

---

## 👨‍💻 Author

**Shivam Mishra**

B.Tech Computer Science — Artificial Intelligence

### GitHub

https://github.com/shivamishra12/SentimentAI

---

## 📄 License

This project is intended for **educational, learning, and portfolio purposes**.
