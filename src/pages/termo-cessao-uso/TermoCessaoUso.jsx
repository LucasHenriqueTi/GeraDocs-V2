import { useState } from "react";
import { Box } from "@mui/material";
import { LayoutForm } from "../../shared/layouts/LayoutForm";
import { apiService } from "../../shared/services/apiService";
import { FormOne } from "./FormeOne";
import { FormTwo } from "./FormTwo";
import ConfirmationModal from '../../shared/components/ConfirmationModal'; // Importar o modal

export const TermoCessaoUso = () => {
  const [formData, setFormData] = useState({
    var_cessionario: "",
    num_contrato: "",
    var_nome: "",
    var_RG: "",
    opcoes_emissor: "",
    var_rua: "",
    var_CPF: "",
    var_cep: "",
    var_numero: "",
    var_bairro: "",
    var_cidade: "",
    var_estado: "",
    var_sei: "",
  });
  const [activeStep, setActiveStep] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar o modal

  const steps = ["Dados do Cessionário", "Dados Adicionais"];

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  // Função de manipulação de input
  const handleInputChange = (e, maskFunction = (val) => val) => {
    const { name, value } = e.target;

    // Campos numéricos que devem ser filtrados
    const numericFields = ["num_contrato", "var_CPF", "var_cep", "var_numero"];
    const capitalizeFields = [
      "var_cessionario", "var_bairro", "var_cidade", "var_estado", "var_nome", "var_rua", "var_RG"
    ];

    // Para os campos que são numéricos, aplica-se o filtro
    const filteredValue = numericFields.includes(name)
      ? value.replace(/[^0-9]/g, "") // Remove caracteres não numéricos
      : value;

    // Função que verifica e capitaliza a primeira letra de cada palavra
    const capitalizeFirstLetter = (str) => {
      const cleanedStr = str.replace(/[^a-zA-Z\s]/g, ""); // Remove caracteres não alfabéticos
      return cleanedStr
        .split(" ") // Separa as palavras
        .map((word) => {
          if (word === word.toUpperCase()) {
            return word;
          }
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(" ");
    };

    // Aplica a capitalização apenas nos campos desejados
    const capitalizedValue = capitalizeFields.includes(name)
      ? capitalizeFirstLetter(filteredValue) // Aplica a capitalização
      : filteredValue;

    // Aplica a função de máscara (se houver), após capitalização ou filtragem
    const maskedValue = typeof maskFunction === 'function'
      ? maskFunction(capitalizedValue)  // Aplica a máscara no valor capitalizado
      : capitalizedValue;  // Caso não tenha máscara, usa o valor capitalizado ou filtrado

    // Atualiza o estado com o novo valor
    setFormData((prevData) => ({
      ...prevData,
      [name]: maskedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiService.sendFormData(formData);
      setIsModalOpen(true); // Abre o modal após o envio dos dados
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
    }
  };

  return (
    <LayoutForm
      titulo={"TERMO DE CESSÃO DE USO"}
      steps={steps}
      activeStep={activeStep}
      setActiveStep={setActiveStep}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
        }}
      >
        {activeStep === 0 && (
          <FormOne
            formData={formData}
            handleInputChange={handleInputChange}
            handleNext={handleNext}
          />
        )}
        {activeStep === 1 && (
          <FormTwo
            formData={formData}
            handleInputChange={handleInputChange}
            handleBack={handleBack}
            handleSubmit={handleSubmit}
          />
        )}
      </Box>

      {/* Modal de confirmação */}
          <ConfirmationModal
            isOpen={!!isModalOpen} // Passando o estado para controlar se o modal está aberto
            onClose={() => setIsModalOpen(false)} // Função para fechar o modal
          />
    </LayoutForm>
  );
};
