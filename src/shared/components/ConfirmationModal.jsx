import PropTypes from 'prop-types';
import imgConfirmGenerator from '../../assets/imgConfirmGeneratorDoc.svg';
import {
  Backdrop,
  Box,
  Modal,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ConfirmationModal = ({ isOpen, onClose }) => {

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
          gap: "5%",
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
            color: "#fff",
            background: "red",
            '& :hover': {
                color: "#000",
            }
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Imagem centralizada */}
        <img
          src={imgConfirmGenerator}
          alt="Confirmação"
          style={{
            maxWidth: '80%',
            height: 'auto',
            marginBottom: '20px',
          }}
        />

        {/* Mensagem abaixo do centro */}
        <Typography
          variant="h6"
          align="center"
          sx={{
            mt: 2,
            color: 'text.primary',
          }}
        >
          Seu documento foi gerado com sucesso!
        </Typography>
      </Box>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool, // Define se o modal está aberto
  onClose: PropTypes.func, // Função para fechar o modal
};

export default ConfirmationModal;
