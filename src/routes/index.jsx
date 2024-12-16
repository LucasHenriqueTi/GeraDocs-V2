import { createBrowserRouter, Navigate } from "react-router-dom";
import { Auth } from "../pages/auth/Auth";
import { TermoCessaoUso } from "../pages/termo-cessao-uso/TermoCessaoUso";
import ErrorPage from "../pages/erro-page/ErroPage";
import { Layout } from "../shared/layouts";
import ProtectedRoute from "../shared/components/ProtectedRoute";
import { AuthProvider } from "../shared/contexts/AuthContext";
import { ContratoVenda } from "../pages/contrato-compra-e-venda/contratoCompraVenda";
import { LandPage } from "../pages/landing-page/LandingPage";
import { DashboardPagesrf } from "../pages/dashboards/dashboardsrf";//dashboar do srf
import { ListagemBeneficiario } from "../pages/Listagem-beneficiario/ListagemBeneficiario";
import { ListagemComplementar } from "../pages/Listagem-complementar/ListagemComplementar";
import UsersTablePage from "../pages/usuariosLista/usuariosLista";
import { DashboardPage } from "../pages/dashboards/dashboardsga";
import { DashboardAdmin } from "../pages/dashboards/dashboardAdmin";


export const routers = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Layout />
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="landpage" />,
      },
      {
        path: "auth",
        element: <Auth />,
      },
      {
        path: "about",
        element: <ProtectedRoute element={<div>Sobre Nós</div>} />,
      },
      
      {
        path: "cessao-uso",
        element: (
          <ProtectedRoute
            element={<TermoCessaoUso />}
            requiredProfile={["gestao", "user", "admin"]}
            requiredSector={["SGA", "STI"]}
            redirectTo="/auth"
          />
        ),
      },
      {
        path: "listagem-complementar",
        element: (<ProtectedRoute element={<ListagemComplementar />}
          requiredProfile={["admin", "gestao", "user"]}
          requiredSector={["STI", "SRF"]}
          redirectTo="/auth"
        />
        ),
      },
      {
        path: "UsuariosLista",
        element: (
          <ProtectedRoute element={<UsersTablePage />}
            requiredProfile={["admin", "gestao"]}
            requiredSector={["SRF", "STI", "SGA"]}
            redirectTo="/auth"
          />
        )
      },
      {
        path: "Listagem-Beneficiario",
        element: (
          <ProtectedRoute element={<ListagemBeneficiario/>}
            requiredProfile={["admin","gestao","user"]}
            requiredSector={["STI","SRF"]}
            redirectTo="/auth"
          />
        )
      },
      {
        path: "contrato-venda",
        element: (
          <ProtectedRoute
            element={<ContratoVenda />}
            requiredProfile={["user", "admin", "gestao"]}
            requiredSector={["SGA", "STI"]}
            redirectTo="/auth"
          />
        ),
      },
      {
        path: "dashboardSGA",
        element: (
          <ProtectedRoute
            element={<DashboardPage />}
            requiredProfile={["admin", "gestao", "user"]}
            requiredSector={["STI", "SGA"]}
            redirectTo="/auth"
          />
        )
      },
      {
        path: "dashboardSRF",
        element: (
          <ProtectedRoute
            element={<DashboardPagesrf />}
            requiredProfile={["admin", "gestao", "user"]}
            requiredSector={["SRF", "STI"]}
            redirectTo="/auth"
          />
        )
      },
      {
        path: "dashboardAdmin",
        element: (
          <ProtectedRoute
            element={<DashboardAdmin />}
            requiredProfile={["admin","gestao"]}
            requiredSector={["STI","SRF","SGA"]}
            redirectTo="/auth"
          />
        )
      },
      {
        path: "landpage",
        element: <LandPage/>
      },
    ],
  },
]);
