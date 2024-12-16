import axios from "axios";

const apisga = import.meta.env.VITE_API_SGA;
const apiUrlComplementar = import.meta.env.VITE_API_URL_COMPLEMENTAR;
export const apiService = {
  sendFormData: async (data) => {
    try {
     
      const response = await axios.post(
        apisga + "cessao-usopf",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
          responseType: "blob",
        }
      );

      const timestamp = new Date()
        .toISOString()
        .replace(/[-:.]/g, "")
        .slice(0, 15);

      const contentDisposition = response.headers["content-disposition"];
      const fileName = contentDisposition
        ? contentDisposition.split("filename=")[1].replace(/"/g, "")
        : `Termo_Cessao_de_Uso_PF_${timestamp}.docx`;

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      throw error;
    }
  },

  sendContratoVenda: async (data) => {
    try {
      const response = await axios.post(
        apisga + "compra-venda",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
          responseType: "blob",
        }
      );

      const timestamp = new Date()
        .toISOString()
        .replace(/[-:.]/g, "")
        .slice(0, 15);

      const contentDisposition = response.headers["content-disposition"];
      const fileName = contentDisposition
        ? contentDisposition.split("filename=")[1].replace(/"/g, "")
        : `Contrato_Compra_e_venda${timestamp}.docx`;

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      throw error;
    }
  },

  sendListagemBeneficiario: async (data) => {
    try {
      // Data já contém os beneficiários no formato correto
      const response = await axios.post(
        apiUrlComplementar + "listagem-complementar",
        JSON.stringify(data), // Envia o objeto diretamente no formato esperado
        {
          headers: {
            "Content-Type": "application/json",
          },
          responseType: "blob",
        }
      );
  
      // Gera timestamp para nome do arquivo
      const timestamp = new Date()
        .toISOString()
        .replace(/[-:.]/g, "")
        .slice(0, 15);
  
      // Obtém nome do arquivo do cabeçalho ou define um padrão
      const contentDisposition = response.headers["content-disposition"];
      const fileName = contentDisposition
        ? contentDisposition.split("filename=")[1].replace(/"/g, "")
        : `Listagem_Beneficiarios_${timestamp}.docx`;
  
      // Cria URL Blob e faz download do arquivo
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      throw error;
    }
  },
  

  sendListagemComplementar: async (data) => {
    try {
      const response = await axios.post(
        apiUrlComplementar + "generate",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
          responseType: "blob",
        }
      );

      const timestamp = new Date()
        .toISOString()
        .replace(/[-:.]/g, "")
        .slice(0, 15);

      const contentDisposition = response.headers["content-disposition"];
      const fileName = contentDisposition
        ? contentDisposition.split("filename=")[1].replace(/"/g, "")
        : `Listagem_Complementar_${timestamp}.docx`;

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      throw error;
    }
  },
};
