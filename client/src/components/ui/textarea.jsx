import React, { forwardRef } from "react";

const Textarea = forwardRef((props, ref) => {
  return (
    <textarea
      ref={ref}
      {...props} // Spread all props to retain flexibility
      dir="rtl" // Force RTL direction
      style={{
        width: "100%", // Ensure full width
        minHeight: "80px", // Minimum height for better visibility
        textAlign: "right", // Align text to the right
      }}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
