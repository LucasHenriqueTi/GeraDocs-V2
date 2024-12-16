import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import axios from "axios";

// URL da API vinda do .env
const API_URL = import.meta.env.VITE_API_FAKE; // Variável de ambiente do Vite

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      try {
        // Decodifica o token para obter informações básicas
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decodificação JWT
        const username = decodedToken?.username;

        if (!username) throw new Error("Token inválido: username ausente");

        // Usando axios para buscar os dados do usuário na API
        axios.get(`${API_URL}/users`)
          .then((response) => {
            const users = response.data; // Obtém os dados da resposta
            const currentUser = users.find((u) => u.username === username);

            if (currentUser) {
              setUser(currentUser);
              setIsAuthenticated(true);
            } else {
              throw new Error("Usuário não encontrado na base de dados");
            }
          })
          .catch((error) => {
            console.error("Erro ao buscar dados do usuário:", error.message);
            logout();
          });
      } catch (error) {
        console.error("Erro na autenticação:", error.message);
        logout();
      }
    }
  }, []);

  const login = (token) => {
    Cookies.set("token", token, { expires: 10 / 24 }); // Define o token no cookie com expiração de 10 horas
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove("token"); // Remove o token
    setIsAuthenticated(false);
    setUser(null); // Limpa os dados do usuário
    localStorage.removeItem('modalShown');

  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuth() {
  return useContext(AuthContext);
}