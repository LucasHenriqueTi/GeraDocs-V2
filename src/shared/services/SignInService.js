import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export async function signin(data) {
  try {
    // Realiza a requisição POST para a API de login
    const response = await axios.post(`${API_URL}/login`, {
      username: data.username,
      password: data.password,
    });

    // Retorna os dados da resposta se tudo estiver correto
    return response.data;
  } catch (error) {
    // Se o erro é proveniente de uma resposta do servidor
    if (error.response) {
      // Se o erro for 401 (não autorizado)
      if (error.response.status === 401) {
        // Limpa o console para evitar exibir detalhes da URL de erro
        console.clear();
        
        // Lança um erro genérico para o usuário
        throw new Error("Não autorizado. Verifique suas credenciais.");
      }

      // Caso seja outro erro, você pode logar a URL de erro
      console.error("Erro de autenticação. Detalhes do erro:", error.response.status);
      
      // Lança o erro com uma mensagem genérica para o usuário
      throw new Error("Não autorizado. Verifique suas credenciais.");
    }

    // Se o erro for algo fora da resposta da API (ex: erro de rede)
    console.error("Erro ao tentar autenticar:", error);
    throw new Error("Erro ao tentar autenticar. Tente novamente.");
  }
}
