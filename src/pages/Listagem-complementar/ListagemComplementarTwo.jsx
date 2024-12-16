import PropTypes from "prop-types";
import { Box, MenuItem } from "@mui/material";
import { StyledTextField } from "../../shared/components/styledTextField";
import { StyledButton } from "../../shared/components/styledButton";
import Footer from "../../shared/components/footer";
import MaskedInput from "react-text-mask";

export const FormListagemComplementarTwo = ({
    formData,
    handleInputChange,
    handleBack,
    handleSubmit,
}) => {

    // Definindo a máscara para o CPF
    const cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

    // Função para verificar se todos os campos obrigatórios estão preenchidos
    const isFormValid = () => {
        return formData.estadoCivilLegitimado && 
               formData.cpfLegitimado && 
               formData.maeLegitimado &&
               formData.rgLegitimado &&
               formData.emissorLegitimado &&
               formData.paiLegitimado;
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                gap: 1,
                padding: 10,
            }}
        >
            <Box sx={{ display: "flex", gap: 5, flex: 1, width: "83%" }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "50%",
                        justifyContent: "flex-start",
                        gap: 4,
                    }}
                >
                    <StyledTextField
                        select
                        variant="outlined"
                        label="Estado Civil do Beneficiário"
                        name="estadoCivilLegitimado"
                        value={formData.estadoCivilLegitimado}
                        onChange={handleInputChange}
                        slotProps={{
                            htmlInput: { maxLength: 90 },
                        }}
                        required
                    >
                        <MenuItem value="Casado">Casado(a)</MenuItem>
                        <MenuItem value="Divorciado">Divorciado(a)</MenuItem>
                        <MenuItem value="Solteiro">Solteiro(a)</MenuItem>
                    </StyledTextField>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 2,
                        }}
                    >
                        <StyledTextField
                            variant="outlined"
                            label="CPF do legitimado:"
                            name="cpfLegitimado"
                            autoComplete="off"
                            value={formData.cpfLegitimado}
                            onChange={handleInputChange}
                            slotProps={{
                                htmlInput: { maxLength: 14, minLength: 14 },
                            }}
                            InputProps={{
                                inputComponent: MaskedInput,
                                inputProps: {
                                    mask: cpfMask, // Aplicando a máscara de CPF
                                },
                            }}
                            required
                        />
                        <StyledTextField
                            variant="outlined"
                            label="CPF do conjuge:"
                            name="cpfConjugeLegitimado"
                            autoComplete="off"
                            value={formData.cpfConjugeLegitimado}
                            onChange={handleInputChange}
                            slotProps={{
                                htmlInput: { maxLength: 14, minLength: 14 },
                            }}
                            InputProps={{
                                inputComponent: MaskedInput,
                                inputProps: {
                                    mask: cpfMask, // Aplicando a máscara de CPF
                                },
                            }}
                            required
                        />
                    </Box>
                    <StyledTextField
                        variant="outlined"
                        label="Nome da mãe do legitimado:"
                        name="maeLegitimado"
                        autoComplete="off"
                        value={formData.maeLegitimado}
                        onChange={handleInputChange}
                        slotProps={{
                            htmlInput: { maxLength: 50, width: "25%" },
                        }}
                        required
                    />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "50%",
                        justifyContent:"flex-start",
                        gap: 4,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 2,
                        }}
                    >
                        <StyledTextField
                            variant="outlined"
                            label="RG do legitimado:"
                            name="rgLegitimado"
                            autoComplete="off"
                            value={formData.rgLegitimado}
                            onChange={handleInputChange}
                            slotProps={{
                                htmlInput: { maxLength: 15 },
                            }}
                            required
                        />
                        <StyledTextField
                            variant="outlined"
                            label="Emissor do RG do legitimado:"
                            name="emissorLegitimado"
                            autoComplete="off"
                            value={formData.emissorLegitimado}
                            onChange={handleInputChange}
                            slotProps={{
                                htmlInput: { maxLength: 4, minLength: 2 },
                            }}
                            required
                        />
                    </Box>

                    <StyledTextField
                        variant="outlined"
                        label="Nome do pai do legitimado:"
                        name="paiLegitimado"
                        autoComplete="off"
                        value={formData.paiLegitimado}
                        onChange={handleInputChange}
                        slotProps={{
                            htmlInput: { maxLength: 50 },
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
                            variant="outlined"
                            label="Regime do Casamento:"
                            name="regimeCasamento"
                            autoComplete="off"
                            value={formData.regimeCasamento}
                            onChange={handleInputChange}
                            slotProps={{
                                htmlInput: { maxLength: 50 },
                            }}
                            required
                        />
                        <StyledTextField
                            variant="outlined"
                            label="Conjuge do Legitimado:"
                            name="conjugeLegitimado"
                            autoComplete="off"
                            value={formData.conjugeLegitimado}
                            onChange={handleInputChange}
                            slotProps={{
                                htmlInput: { maxLength: 50 },
                            }}
                            required
                        />
                    </Box>
                </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 5 }}>
                <StyledButton
                    variant="contained"
                    sx={{ width: "50%", borderRadius: 5, backgroundColor: '#565656', '&:hover': { backgroundColor: '#434343' } }}
                    onClick={handleBack}
                >
                    Anterior
                </StyledButton>
                <StyledButton
                    variant="contained"
                    sx={{ width: "80%", borderRadius: 5 }}
                    onClick={handleSubmit}
                    type="submit"
                    disabled={!isFormValid()} // Desabilita o botão caso algum campo esteja vazio
                >
                    Gerar Documento
                </StyledButton>
            </Box>
            <Footer />
        </Box>
    );
};

// Validação dos props
FormListagemComplementarTwo.propTypes = {
    formData: PropTypes.shape({
        estadoCivilLegitimado: PropTypes.string,    
        cpfLegitimado: PropTypes.string,
        rgLegitimado: PropTypes.string,
        emissorLegitimado: PropTypes.string,
        paiLegitimado: PropTypes.string,
        maeLegitimado: PropTypes.string,
        regimeCasamento: PropTypes.string,
        conjugeLegitimado: PropTypes.string,
        cpfConjugeLegitimado: PropTypes.string,
    }).isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleBack: PropTypes.func,
    handleNext: PropTypes.func,
    handleSubmit: PropTypes.func,
};

export default FormListagemComplementarTwo;
