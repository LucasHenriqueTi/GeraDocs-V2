import { useAuth } from "../../shared/contexts/AuthContext"; // Importa o contexto de autenticação
import { Box, IconButton, Tooltip, Menu, MenuItem, Modal, Link } from "@mui/material";
import { Home, Group, Logout } from "@mui/icons-material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { UserRegistration } from "./UserRegistration";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importando useNavigate
import Grifo from "../../assets/GRIFO.svg"; // o caminho do logotipo atualizado
import Cookies from 'js-cookie';

export function SideMenu() {
  const { user } = useAuth(); // Obtém o usuário logado do contexto
  const navigate = useNavigate();

  // Estados para cada menu
  const [anchorElUsers, setAnchorElUsers] = useState(null);
  const [anchorElContracts, setAnchorElContracts] = useState(null);

  const [showUserRegister, setShowUserRegister] = useState(false);

  const handleCancelRegister = () => {
    setShowUserRegister(false); // Fecha o modal
  };

  const handleRegister = () => {
    console.log('Operação confirmada.');
    setShowUserRegister(false); // Fecha o modal
  };


  const handleOpenUserRegister = () => {
    setShowUserRegister(true); // Abre o modal
  };

  // Funções para controlar o menu de usuários
  const handleOpenUserMenu = (event) => setAnchorElUsers(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUsers(null);

  // Funções para controlar o menu de contratos
  const handleOpenContractMenu = (event) => setAnchorElContracts(event.currentTarget);
  const handleCloseContractMenu = () => setAnchorElContracts(null);

  const { logout } = useAuth();  // Pegando o método logout do contexto

  const handleGoBack = () => {
    navigate({ replace: true }); // Navega para a página anterior
  };

  const handleLogout = () => {
    // Remove o token do localStorage e dos cookies de forma imediata
    localStorage.removeItem('token');
    Cookies.remove('token');

    // Chama o método logout para atualizar o estado no contexto
    logout();

    // Redireciona imediatamente para a página  inicial (ou qualquer página desejada)
    navigate("/auth");
  };

  return (
    <Box
      sx={{
        width: 80,
        height: '70vh',
        background: 'linear-gradient(180deg, #8FBFD7 51.5%, #23A2E1 100%)',
        color: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px 0',
        position: 'absolute',
        zIndex: 900,
        left: '70px',
        borderRadius: '62px',
      }}
    >
      {/* Logotipo */}
      <Box sx={{ marginBottom: 4 }}>
        <img src={Grifo} alt="Logo" style={{ width: '48px', height: 'auto' }} />
      </Box>

      {/* Botões do Menu */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Tooltip title="Home" placement="right">
          <IconButton
            sx={{
              color: 'white',
              '&:hover': { backgroundColor: '#23A2E1' },
            }}
            onClick={handleGoBack}
          >
            <Home />
          </IconButton>
        </Tooltip>

        {['admin', 'gestao'].includes(user?.profile) && (
          <>
            <Tooltip title="Cadastrar Usuário" placement="right">
              <IconButton
                sx={{
                  color: 'white',
                  '&:hover': { backgroundColor: '#23A2E1' },
                }}
                onClick={handleOpenUserMenu}
              >
                <Group />
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorElUsers}
              open={Boolean(anchorElUsers)}
              onClose={handleCloseUserMenu}
              PaperProps={{
                sx: {
                  backgroundColor: '#8FBFD7',
                  borderRadius: '8px',
                  padding: 1,
                  margin: "-4.2% 0 0 3.2%",
                  zIndex: 900,
                },
              }}
            >
              <MenuItem
                onClick={handleOpenUserRegister}
                sx={{
                  '&:hover': {
                    backgroundColor: '#23A2E1', color: '#fff',
                  },
                }}
              >
                Cadastrar Usuário <PersonAddIcon sx={{ ml: 1 }} />
              </MenuItem>

              <Modal
                sx={{
                  width: "40vw",
                  height: "40vh",
                  position: "absolute",
                  top: "13%",
                  padding: 0,
                  borderRadius: 7,
                  boxShadow: "0px 4px 15px 0px #00000026",
                  margin: "0 auto",
                  textAlign: "center",
                }}
                open={showUserRegister}
                onClose={handleCancelRegister}
                aria-labelledby="user-registration-modal"
                aria-describedby="user-registration-description"
              >
                <Box
                  sx={{
                    width: "40vw",
                    height: "40vh",
                    borderRadius: "",
                    padding: 0,
                  }}
                >
                  <UserRegistration
                    onCancel={handleCancelRegister}
                    onConfirm={handleRegister}
                    onClose={handleCancelRegister}
                  />
                </Box>
              </Modal>

              <MenuItem
                onClick={handleCloseUserMenu}
                sx={{
                  ':hover': {
                    backgroundColor: '#23A2E1',
                    color: '#fff',
                    '& :hover': {
                      color: '#fff',
                      fill: '#fff',
                    }
                  }
                }}
              >
                <Link
                  href="/usuariosLista"
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    flexDirection: "row",
                    textDecoration: 'none',
                    color: "#000",
                  }}
                >
                  Visualizar Usuários <PersonSearchIcon sx={{ ml: 1 }} />
                </Link>
              </MenuItem>
            </Menu>
          </>
        )}

        <Tooltip title="Contratos" placement="right">
          <IconButton
            sx={{
              color: 'white',
              '&:hover': { backgroundColor: '#23A2E1' },
            }}
            onClick={handleOpenContractMenu}
          >
            <AutoStoriesIcon />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorElContracts}
          open={Boolean(anchorElContracts)}
          onClose={handleCloseContractMenu}
          PaperProps={{
            sx: {
              backgroundColor: '#8FBFD7',
              color: '#000',
              borderRadius: '8px',
              padding: 1,
              transform: 'translate(8px, -20px)', // Move o menu para cima
              margin: "-3.2% 0 0 3.2%",
              zIndex: 999,
            },
          }}
        >
          {(user?.sector === "STI" || user?.sector === "SGA") && (
            <MenuItem
              onClick={() => {
                navigate('/cessao-uso');
                handleCloseContractMenu();
              }}
              sx={{
                '&:hover': { backgroundColor: '#23A2E1', color: 'white' },
              }}
            >
              Termo de cessão de uso
            </MenuItem>
          )}

          {(user?.sector === "STI" || user?.sector === "SGA") && (
            <MenuItem
              onClick={() => {
                navigate('/contrato-venda');
                handleCloseContractMenu();
              }}
              sx={{
                '&:hover': { backgroundColor: '#23A2E1', color: 'white' },
              }}
            >
              Contrato de compra e venda
            </MenuItem>
          )}

          {(user?.sector === "STI" || user?.sector === "SRF") && (
            <MenuItem
              onClick={() => {
                navigate('/listagem-beneficiario');
                handleCloseContractMenu();
              }}
              sx={{
                '&:hover': { backgroundColor: '#23A2E1', color: 'white' },
              }}
            >
              Listagem de beneficiário
            </MenuItem>
          )}
          {(user?.sector === "STI" || user?.sector === "SRF") && (
            <MenuItem
              onClick={() => {
                navigate('/listagem-complementar');
                handleCloseContractMenu();
              }}
              sx={{
                '&:hover': { backgroundColor: '#23A2E1', color: 'white' },
              }}
            >
              Listagem complementar
            </MenuItem>
          )}

        </Menu>
      </Box>

      {/* Botão de Logout */}
      <Tooltip title="Sair" placement="right">
        <IconButton
          sx={{
            color: 'white',
            marginTop: 'auto',
            '&:hover': { backgroundColor: '#23A2E1' },
          }}
          onClick={handleLogout}
        >
          <Logout />
        </IconButton>
      </Tooltip>
    </Box>
  );
}