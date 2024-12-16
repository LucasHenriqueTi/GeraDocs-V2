import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { StyledButton } from "../../shared/components/styledButton";
import ImgLandingPage from "../../assets/NovaImgLandingPage.svg";
import { ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const LandPage = ({ handleButtonClick }) => {
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate("/auth");
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        width: "100vw",
        height: "100vh",
        background: `conic-gradient(from 200deg,
          rgba(102, 102, 102, 1) 0%,
          rgba(86, 86, 86, 1) 15%,
          rgba(86, 86, 86, 1) 30%,
          rgba(156, 214, 243, 1) 45%,
          rgba(86, 86, 86, 1) 60%,
          rgba(102, 102, 102, 1) 75%,
          rgba(102, 102, 102, 1) 90%,
          rgba(102, 102, 102, 1) 100%
        )`,
        backgroundPosition: "-63vw", // Levemente à esquerda
        backgroundSize: "200% 100%", // Expande o gradiente para um controle melhor
      }}
    >
      {/* Primeira div (esquerda) */}{/*#49644*/}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          paddingLeft: "20%",
          height: "94vh",
          width: "55%",
        }}>
        <img
          src={ImgLandingPage}
          alt="Chart"
          style={{ width: "64%", minWidth: "350px", height: "auto", marginBottom: "25px" }}
        />
      </Box>
      {/* Segunda div (direita) */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          alignContent: "space-around",
          justifyContent: "space-around",
          gap: 2,
          padding: 3,
          width: "45%",
          height: "50%",
        }}
      >
        <Typography variant="h1" sx={{
          fontFamily: "'Titillium Web', sans-serif",
          fontSize: "2.3rem",
          fontWeight: "bold",
          color: "#fff",
          paddingTop: "40px",
        }}>
          GERADOCs
        </Typography>
        <Typography variant="body1" paragraph
          sx={{
            fontSize: "1.1rem",
            color: "#fff",
          }}>
          Bem-vindo(a) ao sistema de geração de documentos! <br /><br />
          Tenha mais praticidade e agilidade em cada etapa da criação.
        </Typography>
        <StyledButton
          variant="contained"
          onClick={handleButtonClick}
          type="submit"
          onClickCapture={onSubmit}
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center", // Garante alinhamento vertical
            borderRadius: 25,
            width: 300,
            height: 70,
            fontSize: "1.2rem",
            background: "#9CD6F3",
            border: "2px solid #9CD6F3",
            boxShadow: "0px 4px 15px 0px #9CD6F3",
            "& svg": {
              fontSize: "2.8rem", // Tamanho do ícone
              color: "#fff", // Cor do ícone
              marginLeft: "2px", // Espaçamento entre o texto e o ícone
            },
          }}
        >
          Fazer login <ArrowForward />
        </StyledButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "6vh",
          gap: "4%",
          color: "#fff",
        }}
      >
          
          <Typography sx={{fontFamily: "'Titillium Web', sans-serif",}}>
          STI - Superintendêcia de  Tecnologia da Informação
        </Typography>
      </Box>
    </Box>
  );
};

LandPage.propTypes = {
  handleButtonClick: PropTypes.func,
};
