import { useState, useEffect } from "react";
import { Box, MenuItem, Typography } from "@mui/material";
import { StyledTextField } from "./styledTextField";
import { StyledButton } from "./styledButton";
import PropTypes from 'prop-types';
import { useAuth } from "../contexts";


const API_URL = "/users";

export const UserRegistration = ({ onCancel, onClose }) => {
  const {user} = useAuth();
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    sector: "",
    profile: "",
  });


  useEffect(() => {
    // Verifica se o perfil do usuário atual é "gestão"
    if (user?.profile === "gestao") {
      setFormData((prev) => ({
        ...prev,
        sector: user.sector || "", // Define o setor do usuário autenticado, se disponível
        profile: "user",
      }));
    }
  }, [user]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: field === "username" ? event.target.value.toLowerCase() : event.target.value,
    });
  };

  const handleRegister = async () => {
    
     if (!formData.username) {
      alert("Erro: O campo de login não pode estar em branco.");
      return; }

    const usernameExists = users.some(
      (user) => user.username.toLowerCase() === formData.username.toLowerCase()
    );

    if (usernameExists) {
      alert("Erro: Este username já está em uso. Escolha outro.");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar usuário");
      }

      const newUser = await response.json();
      setUsers([...users, newUser]);
      alert("Usuário cadastrado com sucesso!");

      // Limpa os dados do formulário
      setFormData({
        username: "",
        sector: "",
        profile: "",
      });

      // Fecha o modal após o registro
      if (onClose) onClose();
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
    window.location.reload();
  };

  return (
    <Box
      sx={{
        width: "40vw",
        height: "auto",
        padding: 0,
        backgroundColor: "#fff",
        borderRadius: 7,
        boxShadow: "0px 4px 15px 0px #00000026",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#444240",
          height: "50px",
          borderRadius: "30px 30px 0 0",
          boxShadow: "0px 4px 15px 0px #9CD6F3",
          padding: 10,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontSize:"1.7rem",
            color: "#fff",
            padding: 1,
            borderRadius: "8px 8px 0 0",
          }}
        >
          CADASTRO DE USUÁRIOS
        </Typography>
      </Box>
      <Box component="form" sx={{ padding: "50px 8vw" }}>
        <Typography variant="body1" sx={{ textAlign: "left", mb: 1 }}>
          Login:
        </Typography>
        <StyledTextField
        inputProps={{maxLength: 20}}
          fullWidth
          placeholder="digite o login"
          value={formData.username}
          onChange={handleChange("username")}
          sx={{ mb: 2, width: "100%", textTransform:"lowercase"}}
          putprops={{maxLength: 20}} 
          onKeyPress={(event) => {
            const regex = /^[a-zA-Z.]$/; // Permite apenas letras
            if (!regex.test(event.key)) {
              event.preventDefault(); // Bloqueia qualquer outro caractere
            }
          }}
        />
<Typography variant="body1" sx={{ textAlign: "left", mb: 1 }}>
          Setor:
        </Typography>
       <StyledTextField
          fullWidth
          select
          value={formData.sector}
          onChange={handleChange("sector")}
          sx={{ mb: 2, width: "100%" }}
          disabled={user?.profile === "gestao"} 

        >
          <MenuItem value="">Selecione o setor</MenuItem>
          <MenuItem value="SRF">SRF</MenuItem>
          <MenuItem value="SGA">SGA</MenuItem>
          <MenuItem value="STI">STI</MenuItem>
        </StyledTextField>

        <Typography variant="body1" sx={{ textAlign: "left", mb: 1 }}>
          Tipo de usuário:
        </Typography>
        <StyledTextField
          fullWidth
          select
          value={formData.profile}
          onChange={handleChange("profile")}
          sx={{ mb: 2, width: "100%", }}
          disabled={user?.profile === "gestao"}
        >
           <MenuItem value="">Selecione o tipo de usuário</MenuItem>
                <MenuItem value="admin">Administrador</MenuItem>
                <MenuItem value="gestao">Gestão</MenuItem>
                <MenuItem value="user">Usuário</MenuItem>
  
          
        </StyledTextField>

        <Box sx={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", alignItems: "center", flexDirection:"row", mt: 5, width:"100%", gap: 2}}>
          <StyledButton
            variant="contained"
            sx={{
              backgroundColor: "#555",
              color: "#fff",
              boxShadow: "0px 4px 10px 0px #00000033",
              borderRadius: "15px",
              width: "7vw !important",
              height: "4.5vh",
            }}
            onClick={onCancel}
          >
            Cancelar
          </StyledButton>
          <StyledButton
            variant="contained"
            sx={{
              backgroundColor: "#23A2E1",
              color: "#fff",
              boxShadow: "0px 4px 10px 0px #00000033",
              borderRadius: "15px",
              width: "7vw",
              height: "4.5vh",
            }}
            onClick={handleRegister}
      
          >
            Cadastrar
          </StyledButton>
        </Box>
      </Box>
    </Box>
  );
  
};
UserRegistration.propTypes = {
  onClose: PropTypes.func, // Define se o Box está aberto
  onCancel: PropTypes.func, // Função para fechar o Box
};