import { useEffect, useState } from 'react'; // callback estava obsoleto, então removi
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Button, Typography, Paper, MenuItem, Modal } from '@mui/material';
import { StyledTextField } from './styledTextField';
import { styled } from '@mui/system';
import { AlterationConfirmation } from '../components/ModalAlteration'
import { DeleteConfirmation } from '../../shared/components/DeleteConfirmation';
import { StyledButton } from './styledButton';
import { useAuth } from '../contexts';
import UsersCRUD from '../services/crud';

// Estilos personalizados usando styled-components do Material UI v5
const Root = styled(Paper)(() => ({
    borderRadius: '0 0 30px 30px',
    marginTop: 24,
}));

const Title = styled(Typography)(() => ({
    backgroundColor: '#565656',
    color: 'white',
    padding: '16px',
    borderRadius: '30px 30px 0 0',
    fontFamily: "Titillium Web, sans-serif"
}));

const StyledTable = styled(Table)(() => ({
    minWidth: "70vw",
}));

const ButtonAlterar = styled(Button)(() => ({
    backgroundColor: '#23a2e1',
    color: '#fff',
    width: "65%",
    '&:hover': {
        backgroundColor: '#1b8bca',
    },
    textTransform: 'none',
    fontFamily: "Titillium Web, sans-serif"
}));

const ButtonExcluir = styled(Button)(() => ({
    backgroundColor: '#565656',
    color: '#fff',
    width: "65%",
    '&:hover': {
        backgroundColor: '#434343',
    },
    textTransform: 'none',
    fontFamily: "Titillium Web, sans-serif",
}));

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showConfirmationAlteration, setShowConfirmationAlteration] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [userToEdit, setUserToEdit] = useState(null);
    const [newProfile, setNewProfile] = useState("");
    const [newSector, setNewSector] = useState("");
    const { user } = useAuth();

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await UsersCRUD.fetchUsers();
            setUsers(data);
            setLoading(false);
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        if (!user || loading) return;

        const filtered = user.profile === 'admin'
            ? users
            : users.filter((u) => user.profile === 'gestao' && u.sector === user.sector);

        setFilteredUsers(filtered);
    }, [users, user, loading]);

    const handleAlterar = (userId) => {
        const userToEdit = users.find((user) => user.id === userId);
        if (userToEdit) {
            setUserToEdit(userToEdit);
            setNewProfile(userToEdit.profile);
            setNewSector(userToEdit.sector);
        }
    };

    const handleSaveAlteration = async () => {
        if (userToEdit) {
            const updatedUser = { ...userToEdit, profile: newProfile, sector: newSector };
            try {
                // Chama a função de atualização do usuário e aguarda a resposta
                await UsersCRUD.updateUser(updatedUser, setUsers);


                // Atualiza o estado local de forma otimista
                setUsers((prevUsers) =>
                    prevUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u))
                );

                setUserToEdit(null);
                setShowConfirmationAlteration(false);
            } catch (error) {
                console.error(error) // ------------ só por enquanto
            }
        }
    };

    const handleCloseAlterationConfirm = () => {
        setShowConfirmationAlteration(false);
    };

    const handleCancelAlteration = () => {
        setUserToEdit(null);
    };


    const handleExcluir = async (userId) => {
        await UsersCRUD.deleteUser(userId, setUsers); // Passe setUsers como argumento
        setShowConfirmation(false);
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
    };

    const openDeleteConfirmation = (userId) => {
        setUserIdToDelete(userId);
        setShowConfirmation(true);
    };

    return (
        <Root sx={{
            textAlign: "center",
            background: "#fff",
            boxShadow: "none",
        }}>
            <Title variant="h4" sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "10vh", boxShadow: "0px 4px 15px 0px #9CD6F3", }}>
                Lista de Usuários
            </Title>

            {/* Tabela de Usuários */}
            <TableContainer sx={{
                minWidth: 650,
                marginTop: "7px",
                borderRadius: "23px",
                border: "2px solid #565656",
                maxHeight: "45vh",
                '& thead': {
                },
                '& .MuiTableCell-root': {
                    padding: 3,
                    fontSize: '1rem',
                    textAlign: "center",
                    border: "1px solid black",
                    overflow: "hidden",
                },
                '& .MuiTableHead-root .MuiTableCell-root': {
                    color: '#000',
                    fontWeight: 'bold',
                    fontSize: "1.3rem",
                    textAlign: "center",
                    border: "1px 0 0 0 solid #3f3f3f"
                },
                '& .MuiTableRow-root': {
                    '&:hover': {
                        backgroundColor: '#e0e0e0',
                    },
                },
            }}>
                <StyledTable aria-label="tabela de usuários"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>Usuário</TableCell>
                            <TableCell>Tipo de Usuário</TableCell>
                            <TableCell>Setor</TableCell>
                            <TableCell>Alterar</TableCell>
                            <TableCell>Excluir</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.profile}</TableCell>
                                <TableCell>{user.sector}</TableCell>
                                <TableCell>

                                    <ButtonAlterar
                                        onClick={() => handleAlterar(user.id)}
                                    >
                                        Alterar
                                    </ButtonAlterar>
                                </TableCell>
                                <TableCell>
                                    <ButtonExcluir onClick={() => openDeleteConfirmation(user.id)}>
                                        Excluir
                                    </ButtonExcluir>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </StyledTable>
            </TableContainer>

            {/* Formulário de Alteração */}
            {userToEdit && (
                <Modal open={Boolean(userToEdit)} onClose={handleCancelAlteration}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            backgroundColor: "#444240",
                            height: "50vh",
                            width: "40vw",
                            borderRadius: "30px",
                            boxShadow: "0px 4px 15px 0px #9CD6F3",
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                fontSize: "1.7rem",
                                color: "#fff",
                                padding: 1,
                                borderRadius: "8px 8px 0 0",
                                margin: 2,
                            }}
                        >
                            ALTERAÇÃO DE USUÁRIO
                        </Typography>
                        <Box
                            sx={{
                                position: "relative",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                                background: "#fff",
                                height: "88%",
                                width: "100%",
                                gap: 4,
                                borderRadius: "0 0 30px 30px",
                                transition: 'filter 0.3s ease-in-out',
                            }}>
                            <StyledTextField
                                select
                                sx={{ width: "65%" }}
                                label="Novo Perfil"
                                value={newProfile}
                                onChange={(e) => setNewProfile(e.target.value)}
                                disabled={user?.profile === "gestao"}
                            >
                                <MenuItem value="">Selecione o tipo de usuário</MenuItem>
                                <MenuItem value="admin">Administrador</MenuItem>
                                <MenuItem value="gestao">Gestão</MenuItem>
                                <MenuItem value="user">Usuário</MenuItem>
                            </StyledTextField>

                            <StyledTextField
                                select
                                sx={{ width: "65%" }}
                                label="Novo Setor"
                                value={newSector}
                                onChange={(e) => setNewSector(e.target.value)}
                                disabled={user?.profile === "gestao"}
                            >
                                <MenuItem value="">Selecione o setor</MenuItem>
                                <MenuItem value="SRF">SRF</MenuItem>
                                <MenuItem value="SGA">SGA</MenuItem>
                                <MenuItem value="STI">STI</MenuItem>
                            </StyledTextField>
                            <Box sx={{ display: "flex", width: "65%", justifyContent: "space-around", gap: 4, flexWrap: "wrap" }}>
                                <StyledButton sx={{ background: "#565656", width: "30%" }} onClick={handleCancelAlteration}>Cancelar</StyledButton>
                                <StyledButton sx={{ width: "30%" }} onClick={setShowConfirmationAlteration} >Salvar Alterações</StyledButton>
                            </Box>
                        </Box>
                    </Box>
                </Modal>
            )}
            {showConfirmationAlteration && (

                <Modal open={Boolean(showConfirmationAlteration)} onClose={handleCloseAlterationConfirm}>
                    <Box>
                        <AlterationConfirmation
                            onCancel={handleCloseAlterationConfirm}
                            onConfirm={() => handleSaveAlteration()}
                        />
                    </Box>
                </Modal>
            )}
            {/* Componente de Confirmação de Exclusão */}
            {showConfirmation && (
                <Modal open={showConfirmation} onClose={handleCancelDelete}>
                    <Box>
                        <DeleteConfirmation
                            onCancel={handleCancelDelete}
                            onConfirm={() => handleExcluir(userIdToDelete)}
                        />
                    </Box>
                </Modal>
            )}
        </Root>
    );
};

export default UsersTable;
