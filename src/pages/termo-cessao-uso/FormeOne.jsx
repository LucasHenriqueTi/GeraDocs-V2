import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { aplicarmascaraSEI } from "../../shared/utils/mascara";
import { StyledButton } from "../../shared/components/styledButton";
import { StyledTextField } from "../../shared/components/styledTextField";
import Footer from "../../shared/components/footer";

export const FormOne = ({ formData, handleInputChange, handleNext }) => {
  // Função para verificar se os campos obrigatórios estão preenchidos
  const isFormValid = formData.var_cessionario.trim() !== "" && formData.num_contrato.trim() !== "";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        flex: 1,
        width: "79.5%",
        gap: 7,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "space-around",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <StyledTextField
            id="var_cessionario"
            label="Nome do Cessionário"
            name="var_cessionario"
            value={formData.var_cessionario}
            onChange={handleInputChange}
            variant="outlined"
            sx={{ boxShadow: "0px 4px 10px 0px #00000033", width: "48%" }}
            slotProps={{
              htmlInput: { maxLength: 100 },
            }}
            required  // Adicionando o atributo required
          />

          <StyledTextField
            id="num_contrato"
            label="Número do Contrato"
            name="num_contrato"
            value={formData.num_contrato}
            onChange={handleInputChange}
            variant="outlined"
            sx={{ boxShadow: "0px 4px 10px 0px #00000033", width: "48%" }}
            slotProps={{
              htmlInput: { maxLength: 8 },
            }}
            required  // Adicionando o atributo required
          />
        </Box>
        
        <StyledTextField
          id="num_contrato"
          label="Número do sei"
          name="var_sei"
          value={formData.var_sei}
          onChange={(e) => handleInputChange(e, aplicarmascaraSEI)}
          variant="outlined"
          fullWidth
          sx={{ boxShadow: "0px 4px 10px 0px #00000033" }}
          slotProps={{
            htmlInput: { maxLength: 22 },
          }}
        />
      </Box>

      <StyledButton
        variant="contained"
        onClick={handleNext}
        disabled={!isFormValid}  // O botão só é habilitado se os campos obrigatórios estiverem preenchidos
      >
        Avançar
      </StyledButton>
      <Footer />
    </Box>
  );
};

FormOne.propTypes = {
  formData: PropTypes.shape({
    var_cessionario: PropTypes.string.isRequired,
    num_contrato: PropTypes.string.isRequired,
    var_sei: PropTypes.string.isRequired,
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};
