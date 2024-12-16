import { Box, Typography } from "@mui/material";
import ImgDelete from "../../assets/ImgDeleteUser.svg"; // Importando a imagem
import { StyledButton } from "./styledButton";
import PropTypes from 'prop-types';

export const DeleteConfirmation = ({ onCancel, onConfirm }) => {
  return (
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
        gap: "5%",
      }}
    >
      <img
        src={ImgDelete} // Usando a imagem importada
        alt="Excluir"
        style={{ width: "272px", height: "222px", marginBottom: "16px" }}
      />
      <Typography variant="body1" sx={{ mb: 3 }}>
        Você tem certeza que deseja excluir este usuário?
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-around", mt: 5 }}>
        <StyledButton
          variant="contained"
          sx={{
            backgroundColor: "#555",
          }}
          onClick={onCancel}
        >
          Cancelar
        </StyledButton>
        <StyledButton
          variant="contained"
          sx={{
            backgroundColor: "#23A2E1",
          }}
          onClick={onConfirm}
        >
          Confirmar
        </StyledButton>
      </Box>
    </Box>
  );
};
DeleteConfirmation.propTypes = {
  onConfirm: PropTypes.func, // Define se o Box está aberto
  onCancel: PropTypes.func, // Função para fechar o Box
};