import { useState } from "react";
import { LayoutForm } from "../../shared/layouts/LayoutForm";
import { apiService } from "../../shared/services/apiService";
import { FormListagemBeneficiarioONe } from "./ListagemBeneficiarioOne";
import { FormListagemBeneficiarioTwo } from "./ListagemBeneficiarioTwo";
import { FormListagemBeneficiarioThree } from "./ListagemBeneficiarioThree";
import ConfirmationModal from "../../shared/components/ConfirmationModal";

export const ListagemBeneficiario = () => {
  // Steps do formulário
  const steps = ["one", "two", "three"];

  // Estados
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    nomeBeneficiario: "",
    nacionalidadeBeneficiario: "",
    dataNascimento: "",
    maeBeneficiario: "",
    paiBeneficiario: "",
    rgBeneficiario: "",
    emissorRG: "",
    cpfBeneficiario: "",
    profissaoBeneficiario: "",
    estadoCivilBeneficiario: "",
    regimeCasamento: "",
    conjugeBeneficiario: "",
    dataNascimentoConjuge: "",
    rgConjuge: "",
    emissorRGConjuge: "",
    cpfConjuge: "",
    logradouro: "",
    quadra: "",
    lote: "",
    numero: "",
    cep: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // Controle do modal

  // Função para tratar as mudanças nos inputs
  const handleInputChange = (e, maskFunction = (val) => val) => {
    const { name, value } = e.target;

    // Definir os campos numéricos e de capitalização
    const numericFields = ["quadra", "lote", "numero", "cpfBeneficiario", "cpfConjugeBeneficiario", "cpfConjuge",];
    const capitalizeFields = [
      "logradouro", "profissaoBeneficiario", "nomeBeneficiario", "maeBeneficiario", 
      "emissorRG", "paiBeneficiario", "regimeCasamento", "conjugeBeneficiario", "emissorRGConjuge"
    ];

    // Para os campos que são numéricos, aplica-se o filtro
    const filteredValue = numericFields.includes(name)
      ? value.replace(/[^0-9]/g, "") // Remove caracteres não numéricos
      : value;

    // Função que verifica e capitaliza a primeira letra de cada palavra
    const capitalizeFirstLetter = (str) => {
      // Remove caracteres especiais (não letras ou espaços)
      const cleanedStr = str.replace(/[^a-zA-Z\s]/g, ""); // Remove qualquer caractere não alfabético e não espaço

      // Capitaliza a primeira letra de cada palavra, mas deixa as letras em maiúsculas se já estiverem assim
      return cleanedStr
        .split(" ") // Separa as palavras
        .map((word) => {
          // Se a palavra estiver toda em maiúsculas, deixa como está
          if (word === word.toUpperCase()) {
            return word;
          }
          // Caso contrário, capitaliza a primeira letra e mantém o restante em minúsculo
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(" "); // Junta as palavras de volta
    };

    // Aplica a capitalização apenas nos campos desejados e sem caracteres especiais
    const capitalizedValue = capitalizeFields.includes(name)
      ? capitalizeFirstLetter(filteredValue) // Aplica a capitalização
      : filteredValue;

    // Aplica a função de máscara, se houver, no valor capitalizado
    const maskedValue = typeof maskFunction === 'function'
      ? maskFunction(capitalizedValue)  // Aplica a máscara no valor capitalizado
      : capitalizedValue;  // Caso não tenha máscara, usa o valor capitalizado ou filtrado

    // Atualiza o estado com o novo valor
    setFormData((prevData) => ({
      ...prevData,
      [name]: maskedValue,
    }));
  };

  // Avançar para o próximo step
  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  // Voltar ao step anterior
  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Chamada ao serviço da API
      await apiService.sendListagemBeneficiario(formData);  // Aqui não é necessário capturar a resposta se não for utilizada
      setIsModalOpen(true); // Abre o modal após envio bem-sucedido
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
    }
  };

  return (
    <LayoutForm
      titulo={"LISTAGEM DE BENEFICIÁRIOS"}
      steps={steps}
      activeStep={activeStep}
      setActiveStep={setActiveStep}
    >
      {activeStep === 0 && (
        <FormListagemBeneficiarioONe
          formData={formData}
          handleInputChange={handleInputChange}
          handleNext={handleNext}
        />
      )}
      {activeStep === 1 && (
        <FormListagemBeneficiarioTwo
          formData={formData}
          handleInputChange={handleInputChange}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      )}
      {activeStep === 2 && (
        <FormListagemBeneficiarioThree
          formData={formData}
          handleInputChange={handleInputChange}
          handleNext={handleNext}
          handleBack={handleBack}
          handleSubmit={handleSubmit}
        />
      )}
      {/* Modal exibido após a submissão */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Fecha o modal
      />
    </LayoutForm>
  );
};
