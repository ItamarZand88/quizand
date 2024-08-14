import React, { useState } from "react";

const SimpleHebrewTextarea = () => {
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <textarea
      value={text}
      onChange={handleChange}
      dir="rtl" // Explicitly setting direction to right-to-left
      style={{ width: "300px", height: "100px", textAlign: "right" }}
    />
  );
};

export default SimpleHebrewTextarea;
