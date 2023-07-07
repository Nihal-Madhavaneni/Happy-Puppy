import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import Button from "./overrides/Button";
import TextField from "./overrides/TextField";

// A custom theme for this app
const theme = createTheme({
  palette: {
    // color variants used throughout the application
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },

  typography: {
    fontFamily: "",

    // variants from here
  },

  components: {
    ...Button,
    ...TextField,
  },
});

export default theme;
