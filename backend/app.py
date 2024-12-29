from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import logging

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Mock user database (replace with a real database in production)
USER_DB = {
    "test@example.com": "securepassword"
}

# Load the trained model
try:
    with open('expense_model.pkl', 'rb') as f:
        model = pickle.load(f)
    logging.info("Expense model loaded successfully.")
except FileNotFoundError:
    model = None
    logging.error("Expense model file not found. Please ensure 'expense_model.pkl' is available.")

# --- Login Endpoint ---
@app.route('/login', methods=['POST'])
def login():
    """Handles user login."""
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')

        # Validate input
        if not email or not password:
            logging.warning("Login attempt with missing email or password.")
            return jsonify({'error': 'Email and password are required.'}), 400

        # Check credentials
        if email in USER_DB and USER_DB[email] == password:
            logging.info(f"Login successful for user: {email}")
            return jsonify({'message': 'Login successful!'}), 200
        else:
            logging.warning(f"Login failed for user: {email}")
            return jsonify({'error': 'Invalid email or password.'}), 401

    except Exception as e:
        logging.error(f"An error occurred during login: {str(e)}")
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

# --- Expense Prediction Endpoint ---
@app.route('/predict', methods=['POST'])
def predict_expense():
    """Predict monthly expenses based on the input month."""
    if not model:
        logging.error("Expense model is not loaded.")
        return jsonify({'error': 'Model not loaded. Contact admin.'}), 500

    try:
        data = request.json

        # Validate input presence
        if 'month' not in data:
            logging.warning("Missing 'month' key in the input.")
            return jsonify({'error': "Missing 'month' in the request body."}), 400

        month = data.get('month')

        # Validate the input type and range
        if not isinstance(month, int) or not (1 <= month <= 12):
            logging.warning(f"Invalid input for month: {month}")
            return jsonify({'error': 'Invalid month. Provide an integer between 1 and 12.'}), 400

        # Prepare input for the model
        month_array = np.array([[month]])
        prediction = model.predict(month_array)
        logging.info(f"Expense prediction successful for month: {month}")
        return jsonify({
            'predicted_expense': prediction[0],
            'model_version': '1.0'
        })

    except Exception as e:
        logging.error(f"An error occurred during expense prediction: {str(e)}")
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

# --- Financial Tips Endpoint ---
@app.route('/tips', methods=['GET'])
def financial_tips():
    """Provide financial management tips."""
    try:
        tips = [
            "Track your daily expenses to identify spending habits.",
            "Set a monthly budget and stick to it.",
            "Invest in high-interest savings accounts.",
            "Reduce unnecessary subscriptions.",
            "Plan major expenses and save in advance."
        ]
        logging.info("Tips endpoint accessed.")
        return jsonify({'tips': tips})
    except Exception as e:
        logging.error(f"An error occurred while fetching tips: {str(e)}")
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

if __name__ == "__main__":
    # Use environment variables for host and port (default: localhost:5000)
    app.run(debug=True, host='0.0.0.0', port=5000)
