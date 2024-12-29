import React from "react";

function Suggestions({ tips }) {
  return (
    <div className="suggestions">
      <h2>Financial Tips</h2>
      <ul>
        {tips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}

export default Suggestions;
