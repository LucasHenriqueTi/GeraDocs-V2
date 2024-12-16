import PropTypes from "prop-types";
import { Box } from "@mui/material";
import Footer from "../../shared/components/footer";
import { SideMenu } from "../../shared/components/SideMenu";
import UsersTable from "../../shared/components/ListUSers";

export const UsersTablePage = () => {

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row", // Ajusta para ter uma linha de elementos
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        background: "#fff",
      }}
    >
      <SideMenu/>      
      <UsersTable/>
      <Footer />
    </Box>
  );
};

UsersTablePage.propTypes = {
  children: PropTypes.node,
};


export default UsersTablePage;
