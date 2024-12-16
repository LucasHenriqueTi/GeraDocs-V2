import PropTypes from 'prop-types';
import { Box, Grid2, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { aplicarmascaraCEP, aplicarmascaraCPF, aplicarmascaraRG } from "../../shared/utils/mascara";
import { StyledTextField } from '../../shared/components/styledTextField';
import { StyledButton } from "../../shared/components/styledButton";
import Footer from '../../shared/components/footer';

{/**Falha ao recarregar /src/pages/termo-cessao-uso/FormTwo.jsx. Isso pode ser devido a erros de sintaxe ou à importação de módulos inexistentes. (veja os erros acima) */}

// Lista de estados brasileiros
const estados = [
  { sigla: 'AC', nome: 'Acre' },
  { sigla: 'AL', nome: 'Alagoas' },
  { sigla: 'AP', nome: 'Amapá' },
  { sigla: 'AM', nome: 'Amazonas' },
  { sigla: 'BA', nome: 'Bahia' },
  { sigla: 'CE', nome: 'Ceará' },
  { sigla: 'DF', nome: 'Distrito Federal' },
  { sigla: 'ES', nome: 'Espírito Santo' },
  { sigla: 'GO', nome: 'Goiás' },
  { sigla: 'MA', nome: 'Maranhão' },
  { sigla: 'MT', nome: 'Mato Grosso' },
  { sigla: 'MS', nome: 'Mato Grosso do Sul' },
  { sigla: 'MG', nome: 'Minas Gerais' },
  { sigla: 'PA', nome: 'Pará' },
  { sigla: 'PB', nome: 'Paraíba' },
  { sigla: 'PR', nome: 'Paraná' },
  { sigla: 'PE', nome: 'Pernambuco' },
  { sigla: 'PI', nome: 'Piauí' },
  { sigla: 'RJ', nome: 'Rio de Janeiro' },
  { sigla: 'RN', nome: 'Rio Grande do Norte' },
  { sigla: 'RS', nome: 'Rio Grande do Sul' },
  { sigla: 'RO', nome: 'Rondônia' },
  { sigla: 'RR', nome: 'Roraima' },
  { sigla: 'SC', nome: 'Santa Catarina' },
  { sigla: 'SP', nome: 'São Paulo' },
  { sigla: 'SE', nome: 'Sergipe' },
  { sigla: 'TO', nome: 'Tocantins' },
];

export const FormTwo = ({
  formData,
  handleInputChange,
  handleBack,
  handleSubmit,
}) => {

  const isFormValid = () => {
    return (
      formData.var_nome &&
      formData.var_RG &&
      formData.opcoes_emissor &&
      formData.var_CPF &&
      formData.var_cep &&
      formData.var_numero &&
      formData.var_rua &&
      formData.var_bairro &&
      formData.var_cidade &&
      formData.var_estado
    );
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        flex: 1,
        paddingLeft: 5,
        paddingRight: 5,
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "85%",
          gap: 2,
        }}
      >
        {/* Coluna da Esquerda */}
        <Grid2 container columns={12} spacing={2} sx={{ width: "50%" }}>
          <Grid2 size={12}>
            <StyledTextField
              label="Nome"
              name="var_nome"
              value={formData.var_nome}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              sx={{ boxShadow: "0px 4px 10px 0px #00000033", width: "100%" }}
              slotProps={{
                htmlInput: { maxLength: 90 },
              }}
            />
          </Grid2>

          <Grid2 size={12} sx={{ display: "flex", gap: 2 }}>
            <StyledTextField
              label="RG"
              name="var_RG"
              value={formData.var_RG}
              onChange={(e) => handleInputChange(e, aplicarmascaraRG)}
              variant="outlined"
              sx={{ boxShadow: "0px 4px 10px 0px #00000033", width: "75%" }}
              slotProps={{
                htmlInput: { maxLength: 10 },
              }}
            />
            <StyledTextField
              label="Emissor"
              name="opcoes_emissor"
              value={formData.opcoes_emissor}
              onChange={handleInputChange}
              variant="outlined"
              slotProps={{
                htmlInput: { maxLength: 4 },
              }}
              sx={{ boxShadow: "0px 4px 10px 0px #00000033", width: "25%" }}
            />
          </Grid2>

          <Grid2 size={12}>
            <StyledTextField
              label="CPF"
              name="var_CPF"
              value={formData.var_CPF}
              onChange={(e) => handleInputChange(e, aplicarmascaraCPF)}
              slotProps={{
                htmlInput: { maxLength: 14 },
              }}
              variant="outlined"
              fullWidth
              sx={{ boxShadow: "0px 4px 10px 0px #00000033", width: "100%" }}
            />
          </Grid2>
        </Grid2>

        {/* Coluna da Direita */}
        <Grid2 container columns={12} spacing={2} sx={{ width: "50%" }}>
          <Grid2 size={12} sx={{ display: "flex", gap: 2 }}>
            <StyledTextField
              label="CEP"
              name="var_cep"
              value={formData.var_cep}
              onChange={(e) => handleInputChange(e, aplicarmascaraCEP)}
              variant="outlined"
              sx={{ boxShadow: "0px 4px 10px 0px #00000033", width: "75%" }}
              slotProps={{
                htmlInput: { maxLength: 8 },
              }}
            />

            <StyledTextField
              label="Número"
              name="var_numero"
              value={formData.var_numero}
              onChange={handleInputChange}
              variant="outlined"
              sx={{ boxShadow: "0px 4px 10px 0px #00000033", width: "25%" }}
              slotProps={{
                htmlInput: { maxLength: 5 },
              }}
            />
          </Grid2>

          <Grid2 size={12} sx={{ display: "flex", gap: 2 }}>
            <StyledTextField
              label="Rua"
              name="var_rua"
              value={formData.var_rua}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              sx={{ boxShadow: "0px 4px 10px 0px #00000033", width: "50%" }}
            />
            <StyledTextField
              label="Bairro"
              name="var_bairro"
              value={formData.var_bairro}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              sx={{ boxShadow: "0px 4px 10px 0px #00000033", width: "50%" }}
              slotProps={{
                htmlInput: { maxLength: 90 },
              }}
            />
          </Grid2>

          <Grid2 size={12} sx={{ display: "flex", gap: 2 }}>
            <StyledTextField
              label="Cidade"
              name="var_cidade"
              value={formData.var_cidade}
              onChange={handleInputChange}
              variant="outlined"
              sx={{ boxShadow: "0px 4px 10px 0px #00000033", width: "75%" }}
              slotProps={{
                htmlInput: { maxLength: 80 },
              }}
            />

            {/* Select de UF */}
            <Grid2 size={12}>
              <FormControl fullWidth variant="outlined"
                sx={{
                  boxShadow: "0px 4px 10px 0px #00000033",
                  width: "100%",
                  '& .MuiInputBase-root': {
                    color: '#167aab', // Cor do texto do input
                  },
                  '& .MuiInputLabel-root': {
                    color: '#23A2E1', // Cor do label sem foco
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#167aab', // Cor do label em foco
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#23A2E1', // Cor da borda padrão
                    },
                    '&:hover fieldset': {
                      borderColor: '#167aab', // Cor da borda ao passar o mouse
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#167aab', // Cor da borda em foco
                    },
                  },
                }}>
                <InputLabel>UF</InputLabel>
                <Select
                  label="UF"
                  name="var_estado"
                  value={formData.var_estado}
                  onChange={handleInputChange}
                  sx={{ boxShadow: "0px 4px 10px 0px #00000033" }}
                >
                  {estados.map((estado) => (
                    <MenuItem key={estado.sigla} value={estado.sigla}>
                      {estado.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>
          </Grid2>
        </Grid2>
      </Box>

      {/* Botões de navegação */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 5 }}>
        <StyledButton variant="contained" onClick={handleBack} sx={{ backgroundColor: '#565656', '&:hover': { backgroundColor: '#434343' } }}>
          Anterior
        </StyledButton>
        <StyledButton variant="contained" onClick={handleSubmit} type="submit" disabled={!isFormValid()} >
          Gerar Documento
        </StyledButton>
      </Box>
      <Footer />
    </Box>
  );
};

// Validação de props com PropTypes
FormTwo.propTypes = {
  formData: PropTypes.shape({
    var_nome: PropTypes.string.isRequired,
    var_RG: PropTypes.string.isRequired,
    opcoes_emissor: PropTypes.string.isRequired,
    var_CPF: PropTypes.string.isRequired,
    var_cep: PropTypes.string.isRequired,
    var_numero: PropTypes.string.isRequired,
    var_rua: PropTypes.string.isRequired,
    var_bairro: PropTypes.string.isRequired,
    var_cidade: PropTypes.string.isRequired,
    var_estado: PropTypes.string.isRequired,
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default FormTwo;
