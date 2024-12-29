import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import pickle

# Create a model to predict future expenses
def train_model():
    # Example dataset (replace with real data in production)
    data = {
        'month': [1, 2, 3, 4, 5, 6],
        'expenses': [3000, 3200, 3100, 3300, 3400, 3500]
    }
    df = pd.DataFrame(data)

    # Prepare data for training
    X = df[['month']]
    y = df['expenses']

    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train the model
    model = RandomForestRegressor()
    model.fit(X_train, y_train)

    # Save the trained model
    with open('expense_model.pkl', 'wb') as f:
        pickle.dump(model, f)

    return "Model trained and saved."

if __name__ == "__main__":
    print(train_model())
