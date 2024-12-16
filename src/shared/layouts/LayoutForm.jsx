import PropTypes from "prop-types";
import {
  Box,
  Container,
  Step,
  StepButton,
  Typography,
} from "@mui/material";
import Header from "../components/header";
import {StyledStepper} from "../components/styledStepper"

export const LayoutForm = ({
  titulo,
  steps,
  activeStep,
  children,
}) => {

  // Remover a função handleStepChange do StepButton
  return (
    <Container
      maxWidth="100vw"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
        background: "white",
      }}
    >
      <Header/>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "65vw",
          width: "100%",
          height: "75%",
          margin: "7% 0 0 0",
          bgcolor: "#fff",
          boxShadow: "0px 4px 4px 0px #00000040",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "100%",
            flex: 0.3,
            bgcolor: "#565656",
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0px 4px 10px 0px #9CD6F3",
            '& .css-1k81fv-MuiStepConnector-root': {
              marginTop:"10px",
              marginLeft: "5px",
              background: "#fff",
              width: "100%",
              height: 6,
              '& .css-14ncu80-MuiStepConnector-line': {
                height: "20px !important",
              }
            }
          }}
        >
          <Typography
            variant="h1"
            sx={{ fontSize: 25, fontWeight: 500, textTransform: "uppercase" }}
          >
            {titulo}
          </Typography>

          <StyledStepper
            activeStep={activeStep}
            nonLinear
            alternativeLabel
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepButton
                  color="inherit"
                  disabled  // Desabilitar o botão para que não seja clicável
                >
                </StepButton>
              </Step>
            ))}
          </StyledStepper>
        </Box>

        <Box sx={{ flex: 1, width: "100%" }}>{children}</Box>
      </Box>
    </Container >
  );
};

// Validação das props
LayoutForm.propTypes = {
  titulo: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),  // título é uma string obrigatória // Aceitar string ou JSX
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,  // steps é um array de strings obrigatório
  activeStep: PropTypes.number.isRequired,  // activeStep é um número obrigatório
  setActiveStep: PropTypes.func.isRequired,  // setActiveStep é uma função obrigatória
  children: PropTypes.node.isRequired,  // children pode ser qualquer elemento React
};
