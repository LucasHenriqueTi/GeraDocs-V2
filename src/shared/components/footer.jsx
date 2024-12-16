import { Box } from '@mui/material';
import CasinhaImg from '../../assets/FooterCasinhasNovas.svg'; // Caminho da imagem

const Footer = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,  // Garante que o footer fique na parte inferior
        left: 0,
        right: 0,
        height: '70px',  // Ajuste a altura do footer conforme necessário
        bgcolor: '#fff',  // Fundo branco, você pode remover se preferir a imagem como fundo
        backgroundImage: `url(${CasinhaImg})`,
        backgroundSize: 'cover',  // Faz a imagem cobrir todo o espaço
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 997, // Garante que o footer fique abaixo de outros elementos
      }}
    />
  );
};

export default Footer;
