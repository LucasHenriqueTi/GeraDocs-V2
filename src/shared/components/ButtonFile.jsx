import { Box } from "@mui/material";
import { StyledButton } from "./styledButton";
import iconUploadFile from '../../assets/IconButtonUploadFile.svg'

const StyledFileInput = () => {
    return (
        <Box
            sx={{
                position: "relative",
                display: "inline-block",
                minWidth: "200px",
                width: "68%",
            }}
        >
            {/* Input oculto */}
            <input
                type="file"
                id="file-input"
                style={{
                    opacity: 0,
                    position: "absolute",
                    zIndex: -1,
                    width: "100%",
                    height: "100%",
                }}
            />
            {/* Botão estilizado */}
            <label htmlFor="file-input">
                <StyledButton
                    variant="contained"
                    component="span"
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "10px",
                        borderRadius: "5px",
                        background: "#23A2E1",
                        color: "white",
                        height: "85%",
                    }}
                >
                    Escolher Arquivo
                    <img src={iconUploadFile} alt="" />
                </StyledButton>
            </label>
        </Box>
    );
};

export default StyledFileInput;
