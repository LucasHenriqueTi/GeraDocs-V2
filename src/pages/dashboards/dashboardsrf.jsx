import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import ImgLupaDashBoard from "../../assets/BoyWithLupaDashBoard.svg";
import { StyledButton } from "../../shared/components/styledButton";
import Header from "../../shared/components/header";
import Footer from "../../shared/components/footer";
import { useNavigate } from "react-router-dom";
import { SideMenu } from "../../shared/components/SideMenu";
import ModalWarning from "../../shared/components/ModalIntermedio";
import ButtonDoc from "../../shared/components/ButtonTooltip";

export const DashboardPagesrf = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [showCardDocModel, setshowCardDocModel] = useState(false);

  // Verifica se o modal já foi exibido e exibe apenas uma vez
  useEffect(() => {
    const hasModalBeenShown = localStorage.getItem("modalShown");
    if (!hasModalBeenShown) {
      setIsModalOpen(true);
      localStorage.setItem("modalShown", "true");
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row", // Ajusta para ter uma linha de elementos
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "100vw",
        height: "100vh",
        background: "#fff",
        overflow: "hidden", // Impede scroll em ambas direções
      }}
    >
      <ModalWarning
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Fecha o modal
      />
      <ButtonDoc/>
      <Header />
      {/* Sidebar */}
      <Box
        sx={{
          position: "absolute", // Garante que a sidebar seja posicionada de forma independente
          top: 150,
          left: 30, // Move para a esquerda
          height: "70%",
          zIndex: 999, // Ajusta z-index para que não sobreponha o conteúdo principal
        }}
      >
        <SideMenu />
      </Box>

      {/* Imagem lateral */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-end",
          height: "100%",
          zIndex: 998, // Garantir que a imagem não sobreponha outros componentes
        }}
      >
        <img
          src={ImgLupaDashBoard}
          alt="Imagem Lupa"
          style={{
            position: "absolute",
            bottom: "0%",
            left: "7%",
            height: "25vw",
            width: "auto",
          }}
        />
      </Box>
      {/* Conteúdo principal */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "60%", // Ajuste para ocupar a maior parte da tela
          height: "100%",
          paddingTop: 2, // Espaçamento para o conteúdo não colidir com o header
          zIndex: 100, // Garante que o conteúdo principal fique acima da sidebar e da imagem
        }}
      >
        {/* Botões principais */}
        <StyledButton
          onClick={() => navigate("/listagem-beneficiario")}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#fff",
            borderRadius: 15,
            border: "3px solid #9CD6F3",
            boxShadow: "0px 4px 40px 0px #56565699",
            width: "25%",
            height: "30%",
            color: "#000",
            fontSize: "1.1rem",
            margin: "10px",
            textAlign: "center",
            left: "70%",
          }}
        >
          Listagem Beneficiário
        </StyledButton>   
        <StyledButton
          onClick={() => navigate("/listagem-complementar")}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#fff",
            borderRadius: 15,
            border: "3px solid #9CD6F3",
            width: "25%",
            height: "30%",
            boxShadow: "0px 4px 40px 0px #56565699",
            color: "#000",
            fontSize: "1.1rem",
            margin: "10px",
            textAlign: "center",
            left: "50%",
          }}
        >
          Listagem Complementar
        </StyledButton>
      </Box>
      <Footer />
    </Box>
  );
};

DashboardPagesrf.propTypes = {
  children: PropTypes.node,
};
    