import PropTypes from 'prop-types';
import {
    Modal,
    Box,
    Typography,
    List,
    IconButton
} from '@mui/material';
import { ButtonDownload } from './ButtonDownload';
import StyledFileInput from './ButtonFile'
import imgCardModelDown from '../../assets/imgCardModelDown.svg'
import CloseIcon from '@mui/icons-material/Close'; // Ícone de fechar


const CardDoc = ({ isOpen, onClose }) => {

    // Função para fechar o modal e dar refresh na página
    const handleClose = () => {
        onClose(); // Chama o callback que foi passado como propriedade
    };

    return (
        <Modal
            open={isOpen}
            onClose={handleClose} // Fechar o modal sem redirecionamento
            sx={{
                // Adicione estilos no Modal se necessário
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)", // Centraliza em relação ao eixo X e Y
                    padding: 8,
                    textAlign: "center",
                    backgroundColor: "#fff",
                    borderRadius: 2,
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    height: "65vh",
                    width: "55vw",
                    margin: "0 auto",
                    gap: "5%",
                }}
            >
                {/* Botão Fechar */}
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        color: "#fff",
                        background: "red",
                        '& :hover': {
                            color: "#000",
                        }
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <Box sx={{ gap: 6, height: "50%", textAlign: 'left', paddingLeft: 10 }}>
                    <Typography>Para realizar o envio corretamente, siga as instruções abaixo:</Typography>
                    <List
                        sx={{
                            margin: "3%",
                            '& li': {
                                listStyle: 'inside !important',
                                textAlign: 'left'
                            }
                        }}
                    >
                        <li>Clique no botão “Baixar documento modelo” para baixar o arquivo;</li >
                        <li>Altere os campos obrigatórios no documento com as informações solicitadas por você;</li >
                        <li>Após alterar, clique no botão “Escolher arquivo” e anexe o documento preenchido CSV., XLS. ou ODT..</li >
                    </List>
                    <Typography>Certifique-se de que o arquivo está no formato correto antes de enviá-lo.</Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 4, height: "50%" }}>
                    <img src={imgCardModelDown} alt="" style={{ width: "40%" }} />
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", height: "100%", gap: 5, width: "45%" }}>
                        <ButtonDownload/>
                        <StyledFileInput/>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

CardDoc.propTypes = {
    isOpen: PropTypes.bool, // Define se o modal está aberto
    onClose: PropTypes.func, // Função para fechar o modal
};

export default CardDoc;
