import axios from "axios";

const API_URL = "/users";

// Função para buscar usuários
const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Axios retorna os dados diretamente na propriedade `data`
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return [];
  }
};

// Função para criar um novo usuário
const createUser = async (newUser, users, setUsers) => {
  const usernameExists = users.some(
    (user) => user.username.toLowerCase() === newUser.username.toLowerCase()
  );

  if (usernameExists) {
    alert("Erro: Este username já está em uso. Escolha outro.");
    return;
  }

  try {
    const response = await axios.post(API_URL, newUser, {
      headers: { "Content-Type": "application/json" },
    });

    setUsers((prevUsers) => [...prevUsers, response.data]);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
  }
};

// Função para atualizar um usuário
const updateUser = async (updatedUser, setUsers) => {
  try {
    const response = await axios.put(`${API_URL}/${updatedUser.id}`, updatedUser, {
      headers: { "Content-Type": "application/json" },
    });

    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === response.data.id ? response.data : user))
    );
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
  }
};

// Função para deletar um usuário
const deleteUser = async (id, setUsers) => {
  try {
    await axios.delete(`${API_URL}/${id}`);

    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
  }
};

export default {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
};
