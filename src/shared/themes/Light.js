import { createTheme } from "@mui/material";
import { cyan, yellow } from "@mui/material/colors";

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: "#EDCB58",
      light: "#F2D78D",
      dark: "#CDAF3C",
      contrastText: "#000",
    },
    secondary: {
      main: cyan[500],
      dark: cyan[700],
      light: cyan[300],
      contrastText: "#fff",
    },
    background: {
      default: "#fff",
      paper: "#f7f6f3",
    },
  },
});
