import PropTypes from "prop-types";
import { Box, InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import { StyledTextField } from "../../shared/components/styledTextField";
import { StyledButton } from "../../shared/components/styledButton";
import { aplicarmascaraCEP } from "../../shared/utils/mascara";
import Footer from "../../shared/components/footer";
import MaskedInput from "react-text-mask";

// Função para garantir que o valor seja numérico
const handleNumberChange = (e, handleInputChange) => {
  const value = e.target.value;
  if (/^\d*$/.test(value)) {
    handleInputChange(e); // Só chama handleInputChange se for número
  }
};

// Função para garantir que o valor seja apenas letras
const handleTextChange = (e, handleInputChange) => {
  const value = e.target.value;
  if (/^[a-zA-Z\s]*$/.test(value)) { // Permite apenas letras e espaços
    e.target.value = capitalizeWords(value); // Aplica a capitalização das palavras
    handleInputChange(e); // Chama handleInputChange com o valor capitalizado
  }
};

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


export const FormCompraVendaThree = ({
  formData,
  handleInputChange,
  handleBack,
  handleSubmit,
}) => {
   // Função para verificar se todos os campos obrigatórios estão preenchidos
   const isFormValid = () => {
    const requiredFields = [
    "area_imovel",
    "valor_imovel",
    "var_laudo",
    "matr_imovel",
    "cep_imovel",
    "n_imovel",
    "bairro_imovel",
    "city_imovel",
    "uf",
    "rua_imovel",
    ];

    return requiredFields.every((field) => formData[field]?.trim() !== "");
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
            label="Área do Imóvel"
            name="area_imovel"
            autoComplete="off"
            value={formData.area_imovel}
            onChange={(e) => handleNumberChange(e, handleInputChange)}
            InputProps={{
              inputComponent: MaskedInput,
              inputProps: {
                mask: [/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/], // Máscara para 999.999
                guide: false,
              },
              endAdornment: <span>m²</span>, // Adiciona "m²" no final do campo
            }}
            slotProps={{
              htmlInput: { maxLength: 90 },
            }}
          />

          <StyledTextField
            variant="outlined"
            label="Valor do Imóvel"
            name="valor_imovel"
            autoComplete="off"
            value={formData.valor_imovel}
            onChange={(e) => handleNumberChange(e, handleInputChange)}
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
          <StyledTextField
            variant="outlined"
            label="Laudo de avaliação"
            name="var_laudo"
            autoComplete="off"
            value={formData.var_laudo}
            onChange={(e) => handleTextChange(e, handleInputChange)} // Validação de letras
            slotProps={{
              htmlInput: { maxLength: 8 },
            }}
          />
          <StyledTextField
            variant="outlined"
            label="Matrícula"
            name="matr_imovel"
            autoComplete="off"
            value={formData.matr_imovel}
            onChange={(e) => handleNumberChange(e, handleInputChange)}
            slotProps={{
              htmlInput: { maxLength: 90 },
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            width: "50%",
          }}
        >
          <Box sx={{ display: "flex", gap: 4 }}>
          <StyledTextField
  variant="outlined"
  label="CEP"
  name="cep_imovel"
  autoComplete="off"
  value={formData.cep_imovel}
  onChange={(e) => handleInputChange(e, aplicarmascaraCEP)}
  
  slotProps={{
    htmlInput: { maxLength: 10 },
  }}
/>

            <StyledTextField
              variant="outlined"
              label="Número"
              name="n_imovel"
              autoComplete="off"
              value={formData.n_imovel}
              onChange={(e) => handleNumberChange(e, handleInputChange)}
              slotProps={{
                htmlInput: { maxLength: 4 },
              }}
            />
          </Box>

          <StyledTextField
            variant="outlined"
            label="Bairro"
            name="bairro_imovel"
            autoComplete="off"
            value={formData.bairro_imovel}
            onChange={(e) => handleTextChange(e, handleInputChange)} // Validação de letras
            slotProps={{
              htmlInput: { maxLength: 25 },
            }}
          />

          <Box sx={{ display: "flex", gap: 4 }}>
            <StyledTextField
              variant="outlined"
              label="Cidade"
              name="city_imovel"
              autoComplete="off"
              value={formData.city_imovel}
              onChange={(e) => handleTextChange(e, handleInputChange)} // Validação de letras
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
                name="uf"
                value={formData.uf}
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
            label="Endereço"
            name="rua_imovel"
            autoComplete="off"
            value={formData.rua_imovel}
            onChange={(e) => handleTextChange(e, handleInputChange)} // Validação de letras
            slotProps={{
              htmlInput: { maxLength: 50 },
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
            background: "#565656",
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
          disabled={!isFormValid()}
        >
          Gerar Documento
        </StyledButton>
      </Box>
      <Footer />
    </Box>
  );
};

FormCompraVendaThree.propTypes = {
  formData: PropTypes.shape({
    area_imovel: PropTypes.string.isRequired,
    valor_imovel: PropTypes.string,
    var_laudo: PropTypes.string.isRequired,
    matr_imovel: PropTypes.string.isRequired,
    cep_imovel: PropTypes.string.isRequired,
    n_imovel: PropTypes.string.isRequired,
    bairro_imovel: PropTypes.string.isRequired,
    city_imovel: PropTypes.string.isRequired,
    uf: PropTypes.string.isRequired,
    rua_imovel: PropTypes.string.isRequired,
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
