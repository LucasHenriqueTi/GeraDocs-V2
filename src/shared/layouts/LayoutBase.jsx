import { Box, Container } from "@mui/material";
import PropTypes from "prop-types";



export const LayoutBase = ({ children }) => {

  return (
    <Container
      maxWidth="100vw"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        padding: 0,
        margin: 0,
        height: "100vh",
      }}
      disableGutters
    >

      <Box
        sx={{
          maxWidth: "65vw",
          width: "100%",
          height: "80vh",
          minWidth: "auto",
          borderRadius: "50px",
          boxShadow: "0px 4px 60px 0px #662D9799",
          zIndex: 2,
        }}
      >
        {children}
      </Box>

    </Container>
  );
};

// Validação de props
LayoutBase.propTypes = {
  children: PropTypes.node.isRequired, // O children deve ser um React node (pode ser qualquer tipo de conteúdo que o React renderiza)
};

