import {
  AccountCircle,
  LockOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import {
  Box,
  Grid2,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { signinSchema } from "../../shared/schemas";
import { signin } from "../../shared/services/SignInService";


import imagemLogin from "../../assets/ImgLogin.svg";
import { LayoutBase } from "../../shared/layouts/LayoutBase";
import { useAuth } from "../../shared/contexts";
import { StyledButton } from "../../shared/components/styledButton";

export function Auth() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Estado para mensagens de erro
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signinSchema) });

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => event.preventDefault();

  async function onSubmit(data) {
    try {
      setErrorMessage(""); // Limpa mensagem de erro anterior
      
      const response = await fetch("/users");
      if (!response.ok) {
        throw new Error("Erro ao acessar a base de dados externa");
      }

      const users = await response.json();
      const user = users.find((user) => user.username === data.username);
      if (!user) {
        setErrorMessage(<>
          <p>Usuário ou senha incorretos</p>
        </>);
        return;
      }

      const authResponse = await signin(data);
      if (authResponse.token) {
        login(authResponse.token);

        if (user.profile === "admin") {
          navigate("/dashboardAdmin", { replace: true });
        } else if (user.profile === "user") {
          switch (user.sector) {
            case "SGA":
              navigate("/dashboardSGA", { replace: true });
              break;
            case "SRF":
              navigate("/dashboardSRF", { replace: true });
              break;
            default:
              
              navigate("/auth");
              break;
          }
        } else if (user.profile === "gestao") {
          switch (user.sector) {
            case "SGA":
            case "SRF":
              navigate("/dashboardAdmin", { replace: true });
              break;
            default:
              
              navigate("/auth");
              break;
          }
        } else {
          
          navigate("/auth");
        }
      } else {
        setErrorMessage("Falha na autenticação. Verifique as credenciais.");
      }
    } catch {
      setErrorMessage("Erro no processo de login.");
    }
  }

  return (
    <LayoutBase>
      <Grid2
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{
          maxWidth: "65vw",
          width: "100%",
          height: "80vh",
          minWidth: "auto",
          borderRadius: "50px",
          boxShadow: "0px 4px 60px 0px #9CD6F3",
          backgroundColor: "#444240",
        }}
      >
        {/* LADO A */}
        <Grid2
          size={{ xs: 12, sm: 6, md: 5 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 5,
            textAlign: "center",
            width: "100%",
            height: "100%",
            borderTopLeftRadius: "50px",
            borderBottomLeftRadius: "50px",
            position: "relative",
          }}
        >
          <Box sx={{ width: "120%", position: "absolute", top: 145, left: 50 }}>
            <img
              src={imagemLogin}
              alt="Logo"
              style={{ width: "70%", height: "auto" }}
            />
          </Box>
        </Grid2>

        {/* LADO B */}
        <Grid2
          size={{ xs: 12, sm: 6, md: 7 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            textAlign: "center",
          }}
        >
          <Typography
            className="Font-TitilliumWeb"
            variant="h1"
            sx={{
              fontSize: 28,
              fontWeight: "bold",
              color: "#fff",
              fontFamily: "'Titillium Web', sans-serif",
            }}
          >
            Login
          </Typography>

          {errorMessage && (
            <Typography sx={{ color: "red", marginBottom: 24, position: "absolute", }}>
              Usuário ou senha incorretos
            </Typography>
          )}

          <Box
            component={"form"}
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 5,
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                width: "100%",
                "& .MuiInputBase-root": {
                  color: "white",
                },
                "& .MuiInputLabel-root": {
                  color: "#23A2E1",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "white",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#23A2E1",
                  },
                  "&:hover fieldset": {
                    borderColor: "#167aab",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
                "& svg": {
                  fill: "#fff",
                },
              }}
            >
              <AccountCircle />
              <TextField
                id="input-login"
                label="Usuário"
                variant="outlined"
                autoComplete="off"
                sx={{
                  width: "50%",
                  '& .css-er619e-MuiFormHelperText-root.Mui-error':{
                    position: "absolute !important",
                    marginTop: "60px !important",
                  },
                }}
                {...register("username", {
                  onChange: (e) => {
                    e.target.value = e.target.value.toLowerCase();
                  },
                })}
                error={!!errors.username}
                helperText={errors.username?.message}
                required
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                width: "100%",
                "& svg": {
                  fill: "#fff",
                },
              }}
            >
              <LockOutlined />
              <TextField
                id="input-password"
                label="Senha"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                autoComplete="off"
                sx={{
                  width: "50%",
                  '& #input-password-helper-text':{
                    position: "absolute !important",
                    marginTop: "60px !important",
                  },
                  "& .MuiInputBase-root": {
                    color: "white",
                  },
                  "& .MuiInputLabel-root": {
                    color: "#23A2E1",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#23A2E1",
                    },
                    "&:hover fieldset": {
                      borderColor: "#167aab",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                  "& svg": {
                    fill: "#fff",
                  },
                }}
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                required
              />
            </Box>

            <StyledButton
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "#23A2E1",
                borderRadius: "20px",
                width: "176px",
                color: "white",
                textTransform: "lowercase",
              }}
            >
              Iniciar
            </StyledButton>
          </Box>
        </Grid2>
      </Grid2>
    </LayoutBase>

  );
}
