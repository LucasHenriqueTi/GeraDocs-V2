import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledTextField = styled(TextField)(() => ({
  boxShadow: "0px 4px 10px 0px #00000033",
  width: "auto",
  '& .MuiInputBase-root': {
    color: '#167aab', // Cor do texto do input
  },
  '& .MuiInputLabel-root': {
    color: '#23A2E1', // Cor do label sem foco
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#167aab', // Cor do label em foco
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#23A2E1', // Cor da borda padrão
    },
    '&:hover fieldset': {
      borderColor: '#167aab', // Cor da borda ao passar o mouse
    },
    '&.Mui-focused fieldset': {
      borderColor: '#167aab', // Cor da borda em foco
    },
  },
})
);
