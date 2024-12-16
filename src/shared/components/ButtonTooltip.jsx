import { Tooltip } from '@mui/material';
import imgButtonModelDowload from "../../assets/iconButtonModel.svg"
import { StyledButton } from './styledButton';
import CardDoc from './ModalCardDocModel';
import { useState } from "react";


export const ButtonDoc = () => {
    
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen((prevState) => !prevState);
        console.log("aqui")
      };

    // Função para fechar o modal e dar refresh na página
    return (
        <>
            <Tooltip title="Gerar documento listagem de beneficiário"
                enterDelay={200}
                leaveDelay={300}
                placement="left"
            >
                <StyledButton
                    open={isOpen}
                    onClick={toggleModal}
                    sx={{
                        position: "absolute",
                        minWidth: "5vw",
                        width: "5vw",
                        height: "5vw",
                        right: "5vw",
                        bottom: "10vh",
                        borderRadius: "50px",
                        padding: 0,
                        background: "#A1A1A1"
                    }}
                >
                    <img src={imgButtonModelDowload} alt="" style={{ width: "50%" }} />
                </StyledButton>
            </Tooltip >
            <CardDoc isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
};

export default ButtonDoc;
