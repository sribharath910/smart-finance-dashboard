import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Validate input fields
    if (!email || !password) {
      setErrorMessage("Both email and password are required.");
      return;
    }

    try {
      // Make a POST request to the backend
      const response = await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        // Login successful
        alert(response.data.message);
        navigate("/dashboard"); // Redirect to the dashboard
      }
    } catch (error) {
      // Handle errors
      if (error.response && error.response.data.error) {
        setErrorMessage(error.response.data.error); // Backend error
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="login-page" style={styles.container}>
      <h1 style={styles.header}>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      {errorMessage && <p style={styles.error}>{errorMessage}</p>}
      <button onClick={handleLogin} style={styles.button}>
        Login
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f7f7f7",
  },
  header: {
    fontSize: "2rem",
    marginBottom: "1rem",
    color: "#333",
  },
  input: {
    width: "300px",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    width: "150px",
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
};

export default LoginPage;
