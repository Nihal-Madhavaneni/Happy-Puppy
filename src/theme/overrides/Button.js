import React from "react";
const Button = () => {
  return {
    MuiButton: {
      styleOverrides: {
        color: "white",

        textTransform: "lowercase",

        root: {
          textTransform: "capitalize",
          textTransform: "lowercase",

          color: "white",

          fontWeight: "bold",
          borderRadius: 0,
          // ...other common styles
        },
        containedPrimary: { color: "red !important", fontSize: "80px" },

        // Button variants Here

        // ...other custom variants
      },
    },
  };
};

export default Button;
