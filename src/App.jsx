import { AppThemeProvider } from "./shared/contexts/ThemeContext";
import Font from './shared/themes/styledFont.jsx'; // Importa o tema personalizado
import { RouterProvider } from "react-router-dom";
import { routers } from "./routes";

function App() {
  return (
    <AppThemeProvider theme={Font}>
      <RouterProvider router={routers} />
    </AppThemeProvider>
  );
}

export default App;
