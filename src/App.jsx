import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from "./pages/Accueil/Accueil";
import StopSMS from "./pages/GestionDesCampagnes/StopSMS/StopSMS";
import GestionDesCampagnes from './pages/GestionDesCampagnes/ListeDesCampagnes/GestionDesCampagnes';
import Contacts from "./pages/Contacts/Contacts";
import Reporting from "./pages/Reporting/Reporting";
import AlertesServices from "./pages/AlertesServices/AlertesServices";
import FAQ from "./pages/FAQ/FAQ";
import ListeDesUtilisateurs from "./pages/Utilisateurs/ListeDesUtilisateurs/ListeDesUtilisateurs";
import GestionDesRoles from "./pages/Utilisateurs/GestionDesRoles/GestionRoles";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
const queryClient = new QueryClient();

  return (
  <QueryClientProvider client={queryClient}>
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/accueil" element={<Accueil />} />
        <Route path="/stop-sms" element={<StopSMS />} />
        <Route path="/liste-campagnes" element={<GestionDesCampagnes />} />
         <Route path="/contacts" element={<Contacts />} />
        <Route path="/utilisateurs" element={<ListeDesUtilisateurs />} />
        <Route path="/roles" element={<GestionDesRoles />} />
        <Route path="/reporting" element={<Reporting />} />
        <Route path="/alertes-services" element={<AlertesServices />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </Router>
  </QueryClientProvider>

  );
}

export default App;