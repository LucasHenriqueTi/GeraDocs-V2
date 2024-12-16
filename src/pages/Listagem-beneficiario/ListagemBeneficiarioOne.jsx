import PropTypes from "prop-types";
import { Box, MenuItem} from "@mui/material";
import { StyledTextField } from "../../shared/components/styledTextField";
import { StyledButton } from "../../shared/components/styledButton";
import Footer from '../../shared/components/footer';
import { aplicarmascaraCEP } from "../../shared/utils/mascara";

export const FormListagemBeneficiarioONe = ({
    handleInputChange,
    formData,
    handleNext,
}) => {
    
    // Função para verificar se todos os campos foram preenchidos
    const isFormValid = () => {
        return (
            formData.quadra &&
            formData.lote &&
            formData.logradouro &&
            formData.nomeBeneficiario &&
            formData.numero &&
            formData.nacionalidadeBeneficiario &&
            formData.profissaoBeneficiario &&
            formData.cep
        );
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                gap: 10,
                padding: 10,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-around",
                    gap: 5,
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
                        required
                        sx={{ width: "100%" }}
                        slotProps={{
                            htmlInput: { maxLength: 4 },
                        }}
                    />
                    <StyledTextField
                        id="input_logradouro"
                        label="Logradouro"
                        name="logradouro"
                        autoComplete="off"
                        value={formData.logradouro}
                        onChange={handleInputChange}
                        variant="outlined"
                        required
                        sx={{ width: "100%" }}
                        slotProps={{
                            htmlInput: { maxLength: 50 },
                        }}
                    />
                    <StyledTextField
                        id="input_nome_legit"
                        label="Nome do Beneficiário"
                        name="nomeBeneficiario"
                        autoComplete="off"
                        value={formData.nomeBeneficiario}   
                        onChange={handleInputChange}
                        variant="outlined"
                        required
                        sx={{ width: "100%" }}
                        slotProps={{
                            htmlInput: { maxLength: 50 },
                        }}
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
                   <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 2,
                        }}
                    >
                        <StyledTextField
                            id="input_num_resid"
                            label="Lote"
                            name="lote"
                            autoComplete="off"
                            value={formData.lote}
                            onChange={handleInputChange}
                            variant="outlined"
                            required
                            sx={{ width: "100%" }}
                            slotProps={{
                                htmlInput: { maxLength: 2 },
                            }}
                        />
                        <StyledTextField
    id="input_nacionalidade_legit"
    label="CEP"
    name="cep"
    autoComplete="off"
    value={formData.cep}
    onChange={(e) => handleInputChange(e, aplicarmascaraCEP)}
    variant="outlined"
    required
    sx={{ width: "100%" }}
    slotProps={{
        htmlInput: { maxLength: 8 }, // Limita o comprimento a 10 caracteres
    }}
/>
                    </Box> 
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
                            required
                            sx={{ width: "100%" }}
                            slotProps={{
                                htmlInput: { maxLength: 5 },
                            }}
                        />
                        <StyledTextField
                            select
                            id="input_nacionalidade_legit"
                            label="Nacionalidade do legitimado"
                            name="nacionalidadeBeneficiario"
                            value={formData.nacionalidadeBeneficiario}
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
                        label="Profissão do Beneficiário"
                        name="profissaoBeneficiario"
                        autoComplete="off"
                        value={formData.profissaoBeneficiario}
                        onChange={handleInputChange}
                        variant="outlined"
                        required
                        sx={{ width: "100%" }}
                        slotProps={{
                            htmlInput: { maxLength: 50 },
                        }}
                    />
                </Box>
            </Box>
            <StyledButton
                variant="contained"
                sx={{ width: "25%", borderRadius: 5 }}
                onClick={handleNext}
                disabled={!isFormValid()}  // Desabilita o botão se o formulário não estiver completo
            >
                Avançar
            </StyledButton>
            <Footer />
        </Box>
    );
};

FormListagemBeneficiarioONe.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    handleNext: PropTypes.func.isRequired,
    formData: PropTypes.shape({
        quadra: PropTypes.string.isRequired,
        lote: PropTypes.string.isRequired,
        logradouro: PropTypes.string.isRequired,
        nomeBeneficiario: PropTypes.string.isRequired,
        numero: PropTypes.string.isRequired,
        nacionalidadeBeneficiario: PropTypes.string.isRequired,
        profissaoBeneficiario: PropTypes.string.isRequired,
        cep: PropTypes.string.isRequired,
    }).isRequired,
};
