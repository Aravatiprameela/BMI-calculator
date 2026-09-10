import { useState } from "react";
import "./App.css";

function App() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const calculateBMI = async (e) => {
    e.preventDefault();

    if (!weight || !height) {
      setError("Please enter both weight and height");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
  "https://bmi-calculator-nmn5.onrender.com/api/bmi/calculate",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      weight: Number(weight),
      height: Number(height),
    }),
  }
);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="bmi-card">
        <h1>BMI Calculator</h1>
        <p className="subtitle">
          Calculate your Body Mass Index
        </p>

        <form onSubmit={calculateBMI}>
          <div className="input-group">
            <label>Weight (kg)</label>
            <input
              type="number"
              placeholder="Enter your weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Height (cm)</label>
            <input
              type="number"
              placeholder="Enter your height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Calculating..." : "Calculate BMI"}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        {result && (
          <div className="result">
            <h2>Your BMI</h2>

            <div className="bmi-value">
              {result.bmi}
            </div>

            <p className="category">
              {result.category}
            </p>

            <div className="details">
              <span>Weight: {result.weight} kg</span>
              <span>Height: {result.height} cm</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;