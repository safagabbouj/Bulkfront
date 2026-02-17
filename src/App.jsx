import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from "./services/AuthContext";

// Import des pages et composants
import Login from "./pages/Login/Login";
import Accueil from "./pages/Accueil/Accueil";
import StopSMS from "./pages/GestionDesCampagnes/StopSMS/StopSMS";
import GestionDesCampagnes from './pages/GestionDesCampagnes/ListeDesCampagnes/GestionDesCampagnes';
import Contacts from "./pages/Contacts/Contacts";
import Reporting from "./pages/Reporting/Reporting";
import AlertesServices from "./pages/AlertesServices/AlertesServices";
import FAQ from "./pages/FAQ/FAQ";
import ListeDesUtilisateurs from "./pages/Utilisateurs/ListeDesUtilisateurs/ListeDesUtilisateurs";
import GestionDesRoles from "./pages/Utilisateurs/GestionDesRoles/GestionRoles";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";
import PrivateRoute from "./routes/PrivateRoute";
import Reclamation from "./pages/Reclamations/Reclamation";
import VerifyLogin from "./pages/Login/VerifyLogin";
import OtpRoute from "./routes/OtpRoute";
import ResetPassword from "./pages/Login/ResetPassword/ResetPassword";
import ConsultReclamation from "./pages/Reclamations/ConsultReclamation";

// Initialisation du QueryClient en dehors du composant pour éviter les re-référancements inutiles
const queryClient = new QueryClient();

function App() {
  const location = window.location;

  // Logique de gestion de l'inactivité (Session Timeout)
  useEffect(() => {
    const inactivityTimeout = parseInt(process.env.REACT_APP_ENV_SESSION_TIMEOUT) || 900000; // Par défaut 15 min

    const handleUserActivity = () => {
      const currentTime = new Date().getTime();
      localStorage.setItem("lastActivity", currentTime.toString());
    };

    const checkInactivity = () => {
      const lastActivity = parseInt(localStorage.getItem("lastActivity"), 10) || 0;
      const elapsedTime = new Date().getTime() - lastActivity;

      if (elapsedTime > inactivityTimeout) {
        localStorage.clear();
        if (!location.pathname.startsWith("/login")) {
          window.location.replace("/login");
        }
      }
    };

    checkInactivity();

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);

    const intervalId = setInterval(checkInactivity, 60 * 1000);

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      clearInterval(intervalId);
    };
  }, [location]);

  // Définition des routes avec createBrowserRouter
  const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/reset-password", element: <ResetPassword /> },
    { path: "*", element: <NotFoundPage /> },
    {
      path: "/verify",
      element: (
        <OtpRoute>
          <VerifyLogin />
        </OtpRoute>
      ),
    },
    // Routes protégées par PrivateRoute
    {
      path: "/",
      element: <PrivateRoute><Accueil /></PrivateRoute>,
    },
    {
      path: "/accueil",
      element: <PrivateRoute><Accueil /></PrivateRoute>,
    },
    {
      path: "/liste-campagnes",
      element: <PrivateRoute><GestionDesCampagnes /></PrivateRoute>,
    },
    {
      path: "/stop-sms",
      element: <PrivateRoute><StopSMS /></PrivateRoute>,
    },
    {
      path: "/contacts",
      element: <PrivateRoute><Contacts /></PrivateRoute>,
    },
    {
      path: "/utilisateurs",
      element: <PrivateRoute><ListeDesUtilisateurs /></PrivateRoute>,
    },
    {
      path: "/roles",
      element: <PrivateRoute><GestionDesRoles /></PrivateRoute>,
    },
    {
      path: "/reporting",
      element: <PrivateRoute><Reporting /></PrivateRoute>,
    },
    {
      path: "/alertes-services",
      element: <PrivateRoute><AlertesServices /></PrivateRoute>,
    },
    {
      path: "/faq",
      element: <PrivateRoute><FAQ /></PrivateRoute>,
    },
    {
      path: "/reclamations",
      element: <PrivateRoute><Reclamation /></PrivateRoute>,
    },
    {
      path: "/rec",
      element: <PrivateRoute><ConsultReclamation /></PrivateRoute>,
    },
  ]);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;