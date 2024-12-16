import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import PropTypes from "prop-types"; // Importando PropTypes
import { DarkTheme, LightTheme } from "../themes";
import { ThemeProvider } from "@emotion/react";
import { Container } from "@mui/material";

const ThemeContext = createContext();

export const useAppThemeContext = () => useContext(ThemeContext);

export const AppThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState("light");

  const toggleTheme = useCallback(() => {
    setThemeName((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  });
  
  const theme = useMemo(
    () => (themeName === "light" ? LightTheme : DarkTheme),
    [themeName]
  );

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Container
          maxWidth="100vw"
          disableGutters
          sx={{
            width: "100vw",
            height: "100vh",
            bgcolor: theme.palette.background.default,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 0,
          }}
        >
          {/* <Button variant="contained" onClick={toggleTheme}>
            Mudar a Cor
          </Button> */}

          {children}
        </Container>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

// Validação de props
AppThemeProvider.propTypes = {
  children: PropTypes.node.isRequired, // Garantindo que children sejam um nó válido
};
