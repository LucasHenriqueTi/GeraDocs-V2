import { useState, useEffect, useCallback } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ element, requiredProfile, requiredSector, redirectTo = "/auth" }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null); // Armazena o perfil e setor do usuário
  const navigate = useNavigate();

  const logout = useCallback(() => {
    // Remove o token do cookie e limpa sessão
    document.cookie = "token=; path=/; max-age=0; SameSite=Lax; Secure";
    navigate("/auth"); // Redireciona para a página de login
  }, [navigate]);

  useEffect(() => {
    const checkAuth = async () => {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );

      if (token) {
        try {
          // Decodifica o token para extrair o username
          const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decodificação básica
          const username = decodedToken?.username;

          if (!username) throw new Error("Token inválido: username ausente");

          // Busca o usuário na API externa
          const response = await fetch("/users");
          if (!response.ok) throw new Error("Erro ao acessar a base de dados externa");

          const users = await response.json();
          const currentUser = users.find((u) => u.username === username);

          if (!currentUser) throw new Error("Usuário não encontrado na base de dados");

          setUser(currentUser);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Erro na autenticação:", error.message || error);
          setIsAuthenticated(false);
          logout();
        }
      } else {
        setIsAuthenticated(false);
        logout();
      }
    };

    checkAuth();
  }, [logout]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to={redirectTo} replace />;
  }

  // Função para verificar se o perfil está autorizado
  const hasProfilePermission =
    Array.isArray(requiredProfile)
      ? requiredProfile.includes(user.profile) // Verifica se o perfil do usuário está no array
      : user.profile === requiredProfile; // Se for uma string, compara diretamente

  // Função para verificar se o setor está autorizado
  const hasSectorPermission =
    Array.isArray(requiredSector)
      ? requiredSector.includes(user.sector) // Verifica se o setor do usuário está no array
      : user.sector === requiredSector; // Se for uma string, compara diretamente

  const hasProfileAndSectorPermission = hasProfilePermission && hasSectorPermission;

  if (!hasProfileAndSectorPermission) {
    console.warn(
      `Acesso negado: Perfil (${user.profile}) ou Setor (${user.sector}) não autorizado para esta rota.`
    );
    return <Navigate to="/auth" replace />; // Rota de acesso negado
  }

  return element;
};

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired, // Componente protegido
  requiredProfile: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]), // Perfil necessário (pode ser string ou array de strings)
  requiredSector: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]), // Setor necessário (pode ser string ou array de strings)
  redirectTo: PropTypes.string, // Rota de redirecionamento
};

export default ProtectedRoute;
