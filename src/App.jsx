import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from "./pages/Accueil/Accueil";
import StopSMS from "./pages/GestionDesCampagnes/StopSMS/StopSMS";
import GestionDesCampagnes from './pages/GestionDesCampagnes/ListeDesCampagnes/GestionDesCampagnes';
import Utilisateurs from "./pages/Utilisateurs/Utilisateurs";
import Reporting from "./pages/Reporting/Reporting";
import AlertesServices from "./pages/AlertesServices/AlertesServices";
import FAQ from "./pages/FAQ/FAQ";
import ContactList from './pages/Contacts/Listcontact';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/accueil" element={<Accueil />} />
        <Route path="/stop-sms" element={<StopSMS />} />
        <Route path="/liste-campagnes" element={<GestionDesCampagnes />} />
         <Route path="/ListeContact" element={<ContactList />} />
          <Route path="/utilisateurs" element={<Utilisateurs />} />
        <Route path="/reporting" element={<Reporting />} />
        <Route path="/alertes-services" element={<AlertesServices />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </Router>
  );
}

export default App;