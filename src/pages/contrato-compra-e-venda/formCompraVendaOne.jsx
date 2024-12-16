import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { StyledTextField } from "../../shared/components/styledTextField";
import { StyledButton } from "../../shared/components/styledButton";
import Footer from '../../shared/components/footer';

export const FormCompraVendaOne = ({
  handleInputChange,
  formData,
  handleNext,
}) => {
  // Lógica para verificar se os campos estão preenchidos e não são apenas espaços em branco
  const isButtonDisabled = !formData.var_cessionario?.trim() || !formData.num_contrato?.trim();

  // Função para permitir apenas números no campo num_contrato
  const handleNumContratoChange = (e) => {
    const value = e.target.value;
    // Permitir apenas números
    if (/^\d*$/.test(value)) {
      handleInputChange(e);  // Chama a função original para atualizar o estado
    }
  };

  // Função para permitir apenas letras no campo var_cessionario e formatar a entrada
  const handleVarCessionarioChange = (e) => {
    let value = e.target.value;
    // Verifica se o valor está em maiúsculas (como "RUA FLORES")
    if (/^[A-Z\s]*$/.test(value)) {
      handleInputChange(e);  // Chama a função original para atualizar o estado
    } else {
      // Se não estiver em maiúsculas, converte a primeira letra em maiúscula e o resto em minúsculas
      value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      e.target.value = value;
      handleInputChange(e);  // Chama a função original para atualizar o estado
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        flex: 1,
        height: "100%",
        padding: 10,
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
          gap: 5,
        }}
      >
        <StyledTextField
          id="num_venda"
          label="Número do contrato"
          name="num_contrato"
          autoComplete="off"
          value={formData.num_contrato || ""}
          onChange={handleNumContratoChange} // Usando a nova função de validação
          variant="outlined"
          sx={{ width: "50%" }}
          slotProps={{
            htmlInput: { maxLength: 5 },
            
          }}
        />

        <StyledTextField
          id="proc_lic"
          label="Procedimento Licitatório"
          name="var_cessionario"
          autoComplete="off"
          value={formData.var_cessionario || ""}
          onChange={handleVarCessionarioChange} // Usando a nova função de validação
          variant="outlined"
          sx={{ width: "50%" }}
          slotProps={{
            htmlInput: { maxLength: 50 },
          }}
        />
      </Box>

      <StyledButton
        variant="contained"
        sx={{ width: "25%", borderRadius: 5 }}
        onClick={handleNext}
        disabled={isButtonDisabled} 
      >
        Avançar
      </StyledButton>
      <Footer />
    </Box>
  );
};

FormCompraVendaOne.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    var_cessionario: PropTypes.string,
    num_contrato: PropTypes.string,
  }).isRequired,
};
