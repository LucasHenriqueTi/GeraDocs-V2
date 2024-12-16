import { Box, Typography } from "@mui/material";
import AlterationImg from "../../assets/ImgConfirmAlter.svg";  // Importe a imagem
import PropTypes from 'prop-types';
import { StyledButton } from "./styledButton";


export const AlterationConfirmation = ({ onCancel, onConfirm }) => {
  return (
    <>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)", // Centraliza em relação ao eixo X e YF
            padding: 8,
            textAlign: "center",
            backgroundColor: "#fff",
            borderRadius: 2,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            height: "50vh",
            width: "40vw",
            margin: "0 auto",
          }}
        >
          <img
            src={AlterationImg}  // Usando a imagem importada
            alt="Alterar"
            style={{ width: "245px", height: "220px", marginBottom: "16px" }}
          />
          <Typography variant="body1" sx={{ mb: 2 }}>
            Você tem certeza que deseja alterar este usuário?
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "space-around", mt: 5 }}>
            <StyledButton
              variant="contained"
              sx={{
                backgroundColor: "#555",
                "&:hover": { backgroundColor: "#777" },
              }}
              onClick={onCancel}
            >
              Cancelar
            </StyledButton>
            <StyledButton
              variant="contained"
              sx={{
                backgroundColor: "#23A2E1",
                "&:hover": { backgroundColor: "#1a81c5" },
              }}
              onClick={onConfirm}
            >
              Confirmar
            </StyledButton>
          </Box>
        </Box>
    </>
  );
};

AlterationConfirmation.propTypes = {
  onConfirm: PropTypes.func.isRequired, // Define se o modal está aberto
  onCancel: PropTypes.func.isRequired, // Função para cancelar a ação
};