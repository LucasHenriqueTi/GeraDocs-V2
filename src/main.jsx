import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Font from './shared/themes/styledFont.jsx'; // Importa o tema personalizado

import { CssBaseline, ThemeProvider, GlobalStyles } from "@mui/material";
import App from "./App.jsx";

const StyledStepperGlobalStyles = (
  <GlobalStyles
    styles={{
      '.MuiStepper-root': {
        width: 'auto',
      },
      '.MuiStepper-root .MuiInputBase-root': {
        color: '#167aab', // Cor do texto do input
      },
      '.MuiStepper-root .MuiInputLabel-root': {
        color: '#23A2E1', // Cor do label sem foco
      },
      '.MuiStepper-root .MuiInputLabel-root.Mui-focused': {
        color: '#167aab', // Cor do label em foco
      },
      '.MuiStepper-root .MuiOutlinedInput-root fieldset': {
        borderColor: '#23A2E1', // Cor da borda padrão
      },
      '.MuiStepper-root .MuiOutlinedInput-root:hover fieldset': {
        borderColor: '#167aab', // Cor da borda ao passar o mouse
      },
      '.MuiStepper-root .MuiOutlinedInput-root.Mui-focused fieldset': {
        borderColor: '#167aab', // Cor da borda em foco
      },
    }}
  />
);

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={Font}>
    <StrictMode>
      <CssBaseline />
      {StyledStepperGlobalStyles}
      <App />
    </StrictMode>
  </ThemeProvider>
);
