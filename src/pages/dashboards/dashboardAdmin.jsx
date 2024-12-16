import PropTypes from "prop-types";
import { Box } from "@mui/material";
import ImgDashAdmin from "../../assets/HomePageAdmin.svg";
import Header from "../../shared/components/header";
import Footer from "../../shared/components/footer";
import { SideMenu } from "../../shared/components/SideMenu";
import ModalWarning from "../../shared/components/ModalIntermedio";
import { useState, useEffect } from "react";

export const DashboardAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            <Header />

            {/* Sidebar */}
            <Box
                sx={{
                    position: "absolute", // Garante que a sidebar seja posicionada de forma independente
                    top: 150,
                    left: 30, // Move para a esquerda
                    height: "70%",
                    zIndex: 999 // Ajusta z-index para que não sobreponha o conteúdo principal
                }}
            >
                <SideMenu />
            </Box>

            {/* Imagem lateral */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    top: "50%", // Centraliza verticalmente
                    left: "50%", // Centraliza horizontalmente
                    transform: "translate(-50%, -50%)", // Ajusta o centro do elemento para o centro da tela
                    height: "30vh",
                    width: "20vw",
                    zIndex: 99, // Garantir que a imagem não sobreponha outros componentes
                }}
            >
                <img
                    src={ImgDashAdmin}
                    alt="Imagem Lupa"
                    style={{
                        width: "100%", // Ajusta para ocupar todo o espaço do Box
                        height: "auto",
                    }}
                />
            </Box>
            <Footer />
        </Box>
    );
};

DashboardAdmin.propTypes = {
    children: PropTypes.node,
};
