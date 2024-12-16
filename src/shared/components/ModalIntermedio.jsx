import PropTypes from 'prop-types';
import BoasVindas from '../../assets/ImgBoasVindas.svg';
import {
  Backdrop,
  Box,
  Modal,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { StyledButton } from './styledButton';

const ModalWarning = ({ isOpen, onClose }) => {

  // Função para fechar o modal e dar refresh na página
  const handleClose = () => {
    onClose(); // Chama o callback que foi passado como propriedade
    window.location.reload(); // Faz o refresh da página
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose} // Fechar o modal sem redirecionamento
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
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
          gap: "8%",
        }}
      >
        {/* Botão de fechar */}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Imagem centralizada */}
        <img
          src={BoasVindas}
          alt="Confirmação"
          style={{
            maxWidth: '80%',
            height: 'auto',
            marginBottom: '20px',
          }}
        />

        {/* Mensagem abaixo do centro */}
        <Typography
          align="center"
          sx={{
            fontSize: "1.1rem",
            mt: 2,
            color: 'text.primary',
          }}
        >
          Boas vindas ao nosso sistema de GeraDoc’s!<br/>
          Clique no botão para iniciar.
        </Typography>
        <StyledButton
        onClick={handleClose}
        sx={{mt: 2}}>
          Começar
        </StyledButton>
      </Box>
    </Modal>
  );
};

ModalWarning.propTypes = {
  isOpen: PropTypes.bool, // Define se o modal está aberto
  onClose: PropTypes.func, // Função para fechar o modal
};

export default ModalWarning;
