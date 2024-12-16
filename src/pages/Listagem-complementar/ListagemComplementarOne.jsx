import PropTypes from "prop-types";
import { Box, MenuItem } from "@mui/material";
import { StyledTextField } from "../../shared/components/styledTextField";
import { StyledButton } from "../../shared/components/styledButton";
import Footer from '../../shared/components/footer';

export const FormListagemComplementarONe = ({
    handleInputChange,
    formData,
    handleNext,
}) => {
    // Função que verifica se todos os campos obrigatórios estão preenchidos
    const validateForm = () => {
        return (
            formData.quadra &&
            formData.logradouro &&
            formData.nomeLegitimado &&
            formData.lote &&
            formData.numero &&
            formData.nacionalidadeLegitimado &&
            formData.profissaoLegitimado
        );
    };

    // Verifica se o formulário está completamente preenchido para habilitar o botão
    const isFormValid = validateForm();

    const handleNextClick = () => {
        if (isFormValid) {
            handleNext();
        } else {
            alert("Por favor, preencha todos os campos obrigatórios.");
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
                gap: 6,
                padding: 10,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "83%",
                    justifyContent: "space-around",
                    gap: 8,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "100%",
                        width: "50%",
                        gap: 4,
                    }}
                >
                    <StyledTextField
                        id="input_quadra"
                        label="Quadra"
                        name="quadra"
                        autoComplete="off"
                        value={formData.quadra}
                        onChange={handleInputChange}
                        variant="outlined"
                        sx={{ width: "100%" }}
                        slotProps={{
                            htmlInput: { maxLength: 4 },
                        }}
                        required
                    />
                    <StyledTextField
                        id="input_logradouro"
                        label="Logradouro"
                        name="logradouro"
                        autoComplete="off"
                        value={formData.logradouro}
                        onChange={handleInputChange}
                        variant="outlined"
                        sx={{ width: "100%" }}
                        slotProps={{
                            htmlInput: { maxLength: 50 },
                        }}
                        required
                    />
                    <StyledTextField
                        id="input_nome_legit"
                        label="Nome do legitimado"
                        name="nomeLegitimado"
                        autoComplete="off"
                        value={formData.nomeLegitimado}
                        onChange={handleInputChange}
                        variant="outlined"
                        sx={{ width: "100%" }}
                        slotProps={{
                            htmlInput: { maxLength: 50 },
                        }}
                        required
                    />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                        height: "100%",
                        width: "50%",
                        gap: 4,
                    }}
                >
                    <StyledTextField
                        id="input_lote"
                        label="Lote"
                        name="lote"
                        autoComplete="off"
                        value={formData.lote}
                        onChange={handleInputChange}
                        variant="outlined"
                        sx={{ width: "100%" }}
                        slotProps={{
                            htmlInput: { maxLength: 2 },
                        }}
                        required
                    />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 2,
                        }}
                    >
                        <StyledTextField
                            id="input_num_resid"
                            label="Número da residência"
                            name="numero"
                            autoComplete="off"
                            value={formData.numero}
                            onChange={handleInputChange}
                            variant="outlined"
                            sx={{ width: "100%" }}
                            slotProps={{
                                htmlInput: { maxLength: 4 },
                            }}
                            required
                        />
                        <StyledTextField
                            select
                            id="input_nacionalidade_legit"
                            label="Nacionalidade do legitimado"
                            name="nacionalidadeLegitimado"
                            value={formData.nacionalidadeLegitimado}
                            onChange={handleInputChange}
                            variant="outlined"
                            sx={{ width: "100%" }}
                            slotProps={{
                                htmlInput: { maxLength: 8 },
                            }}
                            required
                        >
                            <MenuItem value="Brasileiro(a)">Brasileiro(a)</MenuItem>
                            <MenuItem value="Estrangeiro(a)">Estrangeiro(a)</MenuItem>
                        </StyledTextField>
                    </Box>
                    <StyledTextField
                        id="input_profissao_legit"
                        label="Profissão legitimado"
                        name="profissaoLegitimado"
                        autoComplete="off"
                        value={formData.profissaoLegitimado}
                        onChange={handleInputChange}
                        variant="outlined"
                        sx={{ width: "100%" }}
                        slotProps={{
                            htmlInput: { maxLength: 20 },
                        }}
                        required
                    />
                </Box>
            </Box>
            <StyledButton
                variant="contained"
                sx={{ width: "25%", borderRadius: 5 }}
                onClick={handleNextClick}
                disabled={!isFormValid} // Desabilita o botão se o formulário não for válido
            >
                Avançar
            </StyledButton>
            <Footer />
        </Box>
    );
};

FormListagemComplementarONe.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    handleNext: PropTypes.func.isRequired,
    formData: PropTypes.shape({
        quadra: PropTypes.string,
        lote: PropTypes.string,
        logradouro: PropTypes.string,
        nomeLegitimado: PropTypes.string,
        numero: PropTypes.string,
        nacionalidadeLegitimado: PropTypes.string,
        profissaoLegitimado: PropTypes.string,
    }).isRequired,
};
