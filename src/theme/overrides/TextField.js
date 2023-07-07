const TextField = () => {
  return {
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          root: {
            "& .MuiInputBase-input": {
              height: "30px", // Adjust the height value as per your requirement
            },
          },
          //  styling change inside
        },
      },
    },
  };
};

export default TextField;
