import { createTheme, responsiveFontSizes } from "@mui/material";
import { green, orange } from "@mui/material/colors";

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: green[700],
        light: green[300],
      },
      secondary: {
        main: orange[700],
        light: orange[300],
      },
    },
  }),
  {
    factor: 5,
  }
);
