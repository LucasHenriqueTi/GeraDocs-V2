import { AppBar, Toolbar, Button, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAuth } from '../../shared/contexts/AuthContext';
import Home from '@mui/icons-material/Home';

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();  // Pegando o método logout do contexto

  const handleGoBack = () => {
    navigate(-1); // Navega para a página anterior
  };

  const handleLogout = () => {
    // Remove o token específico do localStorage e cookies
    localStorage.removeItem('token');
    Cookies.remove('token');
    // Chama o método logout para atualizar o estado no contexto
    logout();
    // Redireciona para a página inicial
    navigate("/");
};


  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: '#fff',
        boxShadow: '0px 12px 20px rgba(0, 0, 0, .4)',
        borderRadius: '0 0 30px 30px',
        top: 0,
        left: 0,
        right: 0,
        margin: 0,
        padding: '8px',
        zIndex: 900,
      }}onClick={handleGoBack}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Botão de Voltar */}
        <IconButton
          
          sx={{
            color: '#000',
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
          }}
        >
          <Home />
        </IconButton>

        {/* Botão Sair */}
        <Button
          variant="outlined"
          color="primary"
          onClick={handleLogout}
          sx={{
            borderRadius: '50px',
            padding: '8px 25px',
            textTransform: 'none',
            border: '1px solid #565656',
            fontWeight: 'bold',
            color: '#000',
            '&:hover': {
              backgroundColor: '#565656',
              color: '#fff',
            },
          }}
          endIcon={<LogoutIcon sx={{ color: '#000' }} />}
        >
          Sair
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
