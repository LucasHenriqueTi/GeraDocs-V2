import { StyledButton } from './styledButton';
import ImgButtonDownload from '../../assets/buttonDownloadModelDoc.svg';
//import TesteDownload from '';

export const ButtonDownload = () => {
  return (
    <StyledButton
      sx={{ width: "68%", gap: 2 }}
      component="a" // Usa o botão como um link
      //href={TesteDownload} // Caminho do arquivo para download
      download=""
    >
      Baixar documento modelo
      <img src={ImgButtonDownload} alt="" style={{ marginLeft: 5 }} />
    </StyledButton>
  );
};

export default ButtonDownload;
