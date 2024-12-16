import { useState } from "react";
import { LayoutForm } from "../../shared/layouts/LayoutForm";
import { apiService } from "../../shared/services/apiService";
import { FormCompraVendaOne } from "./formCompraVendaOne";
import { FormCompraVendaTwo } from "./formCompraVendaTwo";
import { FormCompraVendaThree } from "./formCompraVendaThree";
import ConfirmationModal from "../../shared/components/ConfirmationModal"; // Certifique-se de que o caminho está correto

export const ContratoVenda = () => {
  // Dados
  const steps = ["one", "two", "three"];

  // Estados
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    num_venda: "",
    var_comprador: "",
    var_cpf_comprador: "",
    rg_pf: "",
    var_emissor: "",
    endereco_pf: "",
    n_pf: "",
    bairro_pf: "",
    city_pf: "",
    cep_pf: "",
    uf: "PE",
    rua_imovel: "",
    n_imovel: "",
    bairro_imovel: "",
    city_imovel: "",
    cep_imovel: "",
    area_imovel: "",
    var_laudo: "",
    matr_imovel: "",
    proc_lic: "",
    unknown: "",
    var_pagamento: "",
    var_prazo: "",
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a visibilidade do modal

  // Manipulação
  const handleInputChange = (e, maskFunction = (val) => val) => {
    const { name, value } = e.target;
  
    // Verifique se maskFunction é uma função
    const maskedValue = typeof maskFunction === 'function' ? maskFunction(value) : value;
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: maskedValue,
    }));
  };
  

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Apenas abre o modal após o envio do formulário
    setIsModalOpen(true); 
    
    // Chama a API
    await apiService.sendContratoVenda(formData);
  };

  return (
    <LayoutForm
    titulo={
      activeStep === 1 ? (
        <>
        
          <p
            style={{
               // Ajuste o tamanho da fonte
              
              color: "white",
              margin: 0,
            }}
          >
            CONTRATO DE COMPRA E VENDA
          </p>
          <p
            style={{
              fontSize: "16px", // Ajuste o tamanho da fonte para o subtítulo
              color: "white",
              margin: 0,
              textAlign: "center",
            }}
          >
            (Dados do comprador(a))
          </p>
        </>
      ) : activeStep === 2 ? (
        <>
          <p
            style={{
             
              
              color: "white",
              margin: 0,
            }}
          >
            CONTRATO DE COMPRA E VENDA
          </p>
          <p
            style={{
              fontSize: "16px",
              color: "white",
              margin: 0,
              textAlign: "center",
            }}
          >
            (Dados do imóvel)
          </p>
        </>
      ) : (
        "CONTRATO DE COMPRA E VENDA"
      )
    }
    steps={steps}
    activeStep={activeStep}
    setActiveStep={setActiveStep}
  >
      {activeStep === 0 && (
        <FormCompraVendaOne
          formData={formData}
          handleInputChange={handleInputChange}
          handleNext={handleNext}
        />
      )}
      {activeStep === 1 && (
        <FormCompraVendaTwo
          formData={formData}
          handleInputChange={handleInputChange}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      )}
      {activeStep === 2 && (
        <FormCompraVendaThree
          formData={formData}
          handleInputChange={handleInputChange}
          handleNext={handleNext}
          handleBack={handleBack}
          handleSubmit={handleSubmit}
        />
      )}

      {/* Modal exibido após o envio */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Fecha o modal
      />
    </LayoutForm>
  );
};
