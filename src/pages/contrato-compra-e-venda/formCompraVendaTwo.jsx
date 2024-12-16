import PropTypes from "prop-types";
import { Box, InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import { StyledTextField } from "../../shared/components/styledTextField";
import { StyledButton } from "../../shared/components/styledButton";
import Footer from "../../shared/components/footer";
import { aplicarmascaraCEP } from "../../shared/utils/mascara";
import MaskedInput from "react-text-mask"; // Adicionando a importação do MaskedInput

// Função de validação para aceitar apenas letras
const isOnlyLetters = (value) => /^[A-Za-zÀ-ÿ\s]*$/.test(value);

// Função de validação para aceitar apenas números
const isOnlyNumbers = (value) => /^[0-9]*$/.test(value);

// Função para capitalizar as palavras (primeira letra maiúscula e o resto minúsculo)
const capitalizeWords = (value) => {
  if (value === value.toUpperCase()) {
    return value; // Retorna o valor sem alterações se for todo em maiúsculo
  }

  return value
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const estados = [
  { sigla: "AC", nome: "Acre" },
  { sigla: "AL", nome: "Alagoas" },
  { sigla: "AP", nome: "Amapá" },
  { sigla: "AM", nome: "Amazonas" },
  { sigla: "BA", nome: "Bahia" },
  { sigla: "CE", nome: "Ceará" },
  { sigla: "DF", nome: "Distrito Federal" },
  { sigla: "ES", nome: "Espírito Santo" },
  { sigla: "GO", nome: "Goiás" },
  { sigla: "MA", nome: "Maranhão" },
  { sigla: "MT", nome: "Mato Grosso" },
  { sigla: "MS", nome: "Mato Grosso do Sul" },
  { sigla: "MG", nome: "Minas Gerais" },
  { sigla: "PA", nome: "Pará" },
  { sigla: "PB", nome: "Paraíba" },
  { sigla: "PR", nome: "Paraná" },
  { sigla: "PE", nome: "Pernambuco" },
  { sigla: "PI", nome: "Piauí" },
  { sigla: "RJ", nome: "Rio de Janeiro" },
  { sigla: "RN", nome: "Rio Grande do Norte" },
  { sigla: "RS", nome: "Rio Grande do Sul" },
  { sigla: "RO", nome: "Rondônia" },
  { sigla: "RR", nome: "Roraima" },
  { sigla: "SC", nome: "Santa Catarina" },
  { sigla: "SP", nome: "São Paulo" },
  { sigla: "SE", nome: "Sergipe" },
  { sigla: "TO", nome: "Tocantins" },
];

export const FormCompraVendaTwo = ({
  formData,
  handleInputChange,
  handleBack,
  handleNext,
}) => {
  // Função para verificar se todos os campos obrigatórios estão preenchidos
  const isFormValid = () => {
    const requiredFields = [
      "var_comprador",
      "rg_pf",
      "var_emissor",
      "var_cpf_comprador",
      "var_pagamento",
      "cep_pf",
      "n_pf",
      "bairro_pf",
      "city_pf",
      "UF",
      "var_prazo",
    ];

    return requiredFields.every((field) => formData[field]?.trim() !== "");
  };

  // Função para lidar com a mudança de valor, garantindo que os campos de letras aceitem apenas letras e os de números aceitem apenas números
  const handleChangeWithValidations = (e) => {
    const { name, value } = e.target;

    if (
      ["var_comprador", "var_emissor", "bairro_pf", "city_pf", "rg_pf"].includes(name)
    ) {
      if (isOnlyLetters(value)) {
        handleInputChange({
          target: { name, value: capitalizeWords(value) },
        });
      }
    } else if (
      [
        "rg_pf",
        "var_cpf_comprador",
        "var_pagamento",
        "cep_pf",
        "n_pf",
      ].includes(name)
    ) {
      if (isOnlyNumbers(value)) {
        handleInputChange(e);
      }
    } else if (name === "var_pagamento") {
      handleInputChange(e);
    }
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
      <Box sx={{ display: "flex", gap: 5, flex: 1, width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            justifyContent: "space-around",
          }}
        >
          <StyledTextField
            variant="outlined"
            label="Nome do comprador"
            name="var_comprador"
            autoComplete="off"
            value={formData.var_comprador}
            onChange={handleChangeWithValidations}
            slotProps={{
              htmlInput: { maxLength: 50 },
            }}
          />

          <Box sx={{ display: "flex", gap: 4 }}>
            <StyledTextField
              variant="outlined"
              label="RG"
              name="rg_pf"
              autoComplete="off"
              value={formData.rg_pf}
              onChange={handleChangeWithValidations}
              slotProps={{
                htmlInput: { maxLength: 14, width: "75%" },
              }}
            />
            <StyledTextField
              variant="outlined"
              label="Emissor"
              name="var_emissor"
              autoComplete="off"
              value={formData.var_emissor}
              onChange={handleChangeWithValidations}
              slotProps={{
                htmlInput: { maxLength: 4, width: "25%", minLength: 2 },
              }}
            />
          </Box>

          {/* Aplicando a máscara no campo CPF */}
          <StyledTextField
            variant="outlined"
            label="CPF"
            name="var_cpf_comprador"
            autoComplete="off"
            value={formData.var_cpf_comprador}
            onChange={(e) =>
              handleInputChange({
                target: { name: "var_cpf_comprador", value: e.target.value },
              })
            }
            InputProps={{
              inputComponent: MaskedInput,
              inputProps: {
                mask: [
                  /\d/,
                  /\d/,
                  /\d/,
                  ".",
                  /\d/,
                  /\d/,
                  /\d/,
                  ".",
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                ],
                guide: false,
              },
            }}
            slotProps={{
              htmlInput: { minLength: 14, maxLength: 14 },
            }}
          />
          <StyledTextField
            variant="outlined"
            label="Valor a ser pago à vista"
            name="var_pagamento"
            autoComplete="off"
            value={formData.var_pagamento}
            onChange={(e) =>
              handleInputChange({
                target: { name: "var_pagamento", value: e.target.value },
              })
            }
            InputProps={{
              inputComponent: MaskedInput,
              inputProps: {
                mask: [
                  "R",
                  "$",
                  " ",
                  /\d/,
                  /\d/,
                  /\d/,
                  ".",
                  /\d/,
                  /\d/,
                  /\d/,
                  ".",
                  /\d/,
                  /\d/,
                  /\d/,
                  ",",
                  /\d/,
                  /\d/,
                ],
                guide: false,
              },
            }}
            slotProps={{
              htmlInput: { maxLength: 15 },
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            justifyContent: "space-around",
          }}
        >
          <Box sx={{ display: "flex", gap: 4 }}>
            <StyledTextField
              variant="outlined"
              label="CEP"
              name="cep_pf"
              autoComplete="off"
              value={formData.cep_pf}
              onChange={(e) => handleInputChange(e, aplicarmascaraCEP)}
              slotProps={{
                htmlInput: { maxLength: 8, minLength: 8 },
              }}
            />

            <StyledTextField
              variant="outlined"
              label="Número"
              name="n_pf"
              autoComplete="off"
              value={formData.n_pf}
              onChange={handleChangeWithValidations}
              slotProps={{
                htmlInput: { maxLength: 4 },
              }}
            />
          </Box>
          <StyledTextField
            variant="outlined"
            label="Bairro"
            name="bairro_pf"
            autoComplete="off"
            value={formData.bairro_pf}
            onChange={handleChangeWithValidations}
            slotProps={{
              htmlInput: { maxLength: 25 },
            }}
          />
          <Box sx={{ display: "flex", gap: 4 }}>
            <StyledTextField
              variant="outlined"
              label="Cidade"
              name="city_pf"
              autoComplete="off"
              value={formData.city_pf}
              onChange={handleChangeWithValidations}
              slotProps={{
                htmlInput: { maxLength: 25 },
              }}
            />
            <FormControl
              fullWidth
              variant="outlined"
              sx={{
                boxShadow: "0px 4px 10px 0px #00000033",
                width: "100%",
                "& .MuiInputBase-root": {
                  color: "#167aab", // Cor do texto do input
                },
                "& .MuiInputLabel-root": {
                  color: "#23A2E1", // Cor do label sem foco
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#167aab", // Cor do label em foco
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#23A2E1", // Cor da borda padrão
                  },
                  "&:hover fieldset": {
                    borderColor: "#167aab", // Cor da borda ao passar o mouse
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#167aab", // Cor da borda em foco
                  },
                },
              }}
            >
              <InputLabel>UF</InputLabel>
              <Select
                label="UF"
                name="UF"
                value={formData.UF || ""}
                onChange={handleInputChange}
                sx={{
                  boxShadow: "0px 4px 10px 0px #00000033",
                  "& .ul": {
                    height: "70px",
                  },
                }}
              >
                {estados.map((estado) => (
                  <MenuItem
                    key={estado.sigla}
                    value={estado.sigla}
                    sx={{
                      width: "50%",
                      height: "40px !important",
                    }}
                  >
                    {estado.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <StyledTextField
            variant="outlined"
            name="var_prazo"
            autoComplete="off"
            value={formData.var_prazo}
            type="date"
            onChange={handleInputChange}
            slotProps={{
              htmlInput: { maxLength: 90 },
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
          disabled={!isFormValid()}
        >
          Próximo
        </StyledButton>
      </Box>

      <Footer />
    </Box>
  );
};

FormCompraVendaTwo.propTypes = {
  formData: PropTypes.shape({
    var_comprador: PropTypes.string.isRequired,
    rg_pf: PropTypes.string.isRequired,
    var_emissor: PropTypes.string.isRequired,
    var_cpf_comprador: PropTypes.string.isRequired,
    var_pagamento: PropTypes.string.isRequired,
    cep_pf: PropTypes.string.isRequired,
    n_pf: PropTypes.string.isRequired,
    bairro_pf: PropTypes.string.isRequired,
    city_pf: PropTypes.string.isRequired,
    UF: PropTypes.string,
    var_prazo: PropTypes.string.isRequired,
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};
