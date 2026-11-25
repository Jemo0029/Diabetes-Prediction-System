# Diabetes Prediction Using Machine Learning

A machine learning project that predicts the likelihood of diabetes using the XGBoost algorithm and a Flask web application.

## Technologies
- Python
- Pandas & NumPy
- Scikit-learn
- XGBoost
- Flask
- HTML, CSS & JavaScript

## Project Structure
```text
Diabetes-Prediction-System/
├── API/
│   ├── app.py
│   ├── templates/
│   └── static/
├── module/
│   ├── diabetes_xgboost_model.pkl
│   └── diabetes_threshold.pkl
├── dataset/
├── notebooks/
├── README.md
└── .gitignore
```

## Model Performance

| Metric | Score |
|---|---:|
| Accuracy | 74.68% |
| Precision | 62.71% |
| Recall | 68.52% |
| F1-Score | 65.49% |

## How to Run

1. Clone the repository:
```bash
git clone https://github.com/YOUR-USERNAME/Diabetes-Prediction-System.git
```

2. Install dependencies:
```bash
pip install flask pandas numpy scikit-learn xgboost joblib
```

3. Run the application:
```bash
python API/app.py
```

4. Open `http://127.0.0.1:5000` in your browser.



