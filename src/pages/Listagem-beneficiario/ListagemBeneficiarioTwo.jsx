import PropTypes from "prop-types";
import { Box, MenuItem } from "@mui/material";
import { StyledTextField } from "../../shared/components/styledTextField";
import { StyledButton } from "../../shared/components/styledButton";
import Footer from "../../shared/components/footer";
import MaskedInput from "react-text-mask";

export const FormListagemBeneficiarioTwo = ({
  formData,
  handleInputChange,
  handleBack,
  handleNext,
}) => {
  // Função para verificar se todos os campos estão preenchidos
  const isFormValid = () => {
    return (
      formData.estadoCivilBeneficiario &&
      formData.cpfBeneficiario &&
      formData.maeBeneficiario &&
      formData.rgBeneficiario &&
      formData.emissorRG &&
      formData.dataNascimento
    );
  };
  // Máscara para CPF
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
            name="estadoCivilBeneficiario"
            value={formData.estadoCivilBeneficiario}
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
          <StyledTextField
            variant="outlined"
            label="CPF do Beneficiário"
            name="cpfBeneficiario"
            autoComplete="off"
            value={formData.cpfBeneficiario}
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
            label="Nome da mãe do Beneficiário"
            name="maeBeneficiario"
            autoComplete="off"
            value={formData.maeBeneficiario}
            onChange={handleInputChange}
            required
            slotProps={{
              htmlInput: { maxLength: 90, width: "25%" },
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            justifyContent: "flex-start",
            gap: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <StyledTextField
              variant="outlined"
              label="RG do Beneficiário"
              name="rgBeneficiario"
              autoComplete="off"
              value={formData.rgBeneficiario}
              onChange={handleInputChange}
              required
              slotProps={{
                htmlInput: { maxLength: 14, minLength: 8 },
              }}
              sx={{
                width: "45%",
              }}
            />
            <StyledTextField
              variant="outlined"
              label="Emissor do RG do Beneficiário"
              name="emissorRG"
              autoComplete="off"
              value={formData.emissorRG}
              onChange={handleInputChange}
              required
              slotProps={{
                htmlInput: { maxLength: 4 },
              }}
              sx={{
                width: "55%",
              }}
            />
          </Box>

          <StyledTextField
            variant="outlined"
            label="Nome do pai do Beneficiário:"
            name="paiBeneficiario"
            autoComplete="off"
            value={formData.paiBeneficiario}
            onChange={handleInputChange}
            slotProps={{
              htmlInput: { maxLength: 90 },
            }}
          />
          <StyledTextField
            variant="outlined"
            label="Data de Nascimento do Beneficiário"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleInputChange}
            type="date"
            required
            InputLabelProps={{
              shrink: true, // Mantém o label acima quando o campo está preenchido
            }}
            sx={{
              width: "100%",
            }}
          />
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
          onClick={handleNext}
          type="submit"
          disabled={!isFormValid()} // Desabilita o botão se o formulário não estiver completo
        >
          Próximo
        </StyledButton>
      </Box>
      <Footer />
    </Box>
  );
};

// Validação dos props
FormListagemBeneficiarioTwo.propTypes = {
  formData: PropTypes.shape({
    estadoCivilBeneficiario: PropTypes.string,
    cpfBeneficiario: PropTypes.string,
    rgBeneficiario: PropTypes.string,
    emissorRG: PropTypes.string,
    paiBeneficiario: PropTypes.string,
    maeBeneficiario: PropTypes.string,
    dataNascimento: PropTypes.string, // Novo campo adicionado
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleNext: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default FormListagemBeneficiarioTwo;
