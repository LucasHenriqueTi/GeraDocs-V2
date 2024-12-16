import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { StyledTextField } from "../../shared/components/styledTextField";
import { StyledButton } from "../../shared/components/styledButton";
import Footer from "../../shared/components/footer";
import MaskedInput from "react-text-mask";


export const FormListagemBeneficiarioThree = ({
  formData,
  handleInputChange,
  handleBack,
  handleSubmit,
}) => {
  // Verificar se todos os campos obrigatórios estão preenchidos
  const cpfMask = [
    /[1-9]/,
    /[1-9]/,
    /[1-9]/,
    ".",
    /[1-9]/,
    /[1-9]/,
    /[1-9]/,
    ".",
    /[1-9]/,
    /[1-9]/,
    /[1-9]/,
    "-",
    /[1-9]/,
    /[1-9]/,
  ];
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
      <Box sx={{ display: "flex", gap: 5, flex: 1, width: "100%" }}>
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
              gap: 4,
              width: "50%",
            }}
          >
            <StyledTextField
              variant="outlined"
              label="Regime de casamento:"
              name="regimeCasamento"
              autoComplete="off"
              value={formData.regimeCasamento}
              onChange={handleInputChange}
              slotProps={{
                htmlInput: { maxLength: 90 },
              }}
            />
            <StyledTextField
              variant="outlined"
              label="CPF do Cônjuge do Beneficiário:"
              name="cpfConjuge"
              autoComplete="off"
              value={formData.cpfConjuge}
              onChange={handleInputChange}
              required
              InputProps={{
                inputComponent: MaskedInput, // Integrando a máscara
                inputProps: {
                  mask: cpfMask, // Aplique a máscara no campo de CPF
                },
              }}
              slotProps={{
                htmlInput: { maxLength: 14, width: "75%", minLength: 14 }, // CPF possui 14 caracteres
              }}
            />
            <StyledTextField
              variant="outlined"
              label="RG do Cônjuge do Beneficiário:"
              name="rgConjuge"
              autoComplete="off"
              value={formData.rgConjuge}
              onChange={handleInputChange}
              slotProps={{
                htmlInput: { maxLength: 14, minLength: 8 },
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              width: "50%",
            }}
          >
            <StyledTextField
              variant="outlined"
              label="Cônjuge do Beneficiário:"
              name="conjugeBeneficiario"
              autoComplete="off"
              value={formData.conjugeBeneficiario}
              onChange={handleInputChange}
              slotProps={{
                htmlInput: { maxLength: 90 },
              }}
              sx={{
                width: "100%",
              }}
            />
            <StyledTextField
              variant="outlined"
              label="Data de Nascimento do Cônjuge:"
              name="dataNascimentoConjuge"
              autoComplete="off"
              value={formData.dataNascimentoConjuge}
              onChange={handleInputChange}
              type="date"
              InputLabelProps={{
                shrink: true, // Mantém o label acima quando o campo está preenchido
              }}
              sx={{
                width: "100%",
              }}
            />
            <StyledTextField
              variant="outlined"
              label="Emissor do RG do Cônjuge:"
              name="emissorRGConjuge"
              autoComplete="off"
              value={formData.emissorRGConjuge}
              onChange={handleInputChange}
              slotProps={{
                htmlInput: { maxLength: 4 },
              }}
            />
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 5 }}>
        <StyledButton
          variant="contained"
          sx={{
            width: "50%",
            borderRadius: 5,
            backgroundColor: "#565656",
            "&:hover": { backgroundColor: "#434343" },
          }}
          onClick={handleBack}
        >
          Anterior
        </StyledButton>
        <StyledButton
          variant="contained"
          sx={{ width: "80%", borderRadius: 5 }}
          onClick={handleSubmit}
          type="submit"
        >
          Gerar Documento
        </StyledButton>
      </Box>
      <Footer />
    </Box>
  );
};

FormListagemBeneficiarioThree.propTypes = {
  formData: PropTypes.shape({
    regimeCasamento: PropTypes.string.isRequired,
    cpfConjuge: PropTypes.string,
    conjugeBeneficiario: PropTypes.string.isRequired,
    rgConjuge: PropTypes.string,
    emissorRGConjuge: PropTypes.string,
    dataNascimentoConjuge: PropTypes.string,
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
