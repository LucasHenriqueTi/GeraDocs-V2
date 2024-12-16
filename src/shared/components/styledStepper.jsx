import { Stepper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledStepper = styled(Stepper)(({ theme }) => ({
  width: "60% !important",
  margin: "0 auto !important",
  padding: "3 !important",
  fontSize: "10 !important",
  '& .MuiStepIcon-root.Mui-active': {
    color: "#9CD6F3 !important",
    border: "3px solid #fff !important",
    borderRadius: "50% !important",
    width: "45px !important",
    height: "auto !important",
    fontWeight: "bold !important",
    "& text": {
      color: "#fff !important",
      fill: "#fff !important",
    },
  },
  '& .MuiStepIcon-root': {
    color: "#565656 !important",
    border: "3px solid #fff !important",
    borderRadius: "50% !important",
    width: "45px !important",
    height: "auto !important",
    fontWeight: "bold !important",
    '& text': {
      color: "#fff !important",
      fill: "#afadad !important",
    },
  },
  '& .MuiStepConnector-root': {
    position: "absolute !important",
    top: "45% !important",
    height: "5px !important",
    background: "#fff !important",
    left: "calc(-49% + 20px) !important",
  }
}));
