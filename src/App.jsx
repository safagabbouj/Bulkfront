import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from "./pages/Accueil/Accueil";
import StopSMS from "./pages/GestionDesCampagnes/StopSMS/StopSMS";
// import GestionDesCampagnes from "./pages/safa/GestionDesCampagnes/GestionDesCampagnes";
import GestionDesCampagnes from './pages/GestionDesCampagnes/GestionDesCampagnes';
import ContactList from './pages/Gestioncontact/Listcontact';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/accueil" element={<Accueil />} />
        <Route path="/stop-sms" element={<StopSMS />} />
        <Route path="/ListeContact" element={<ContactList/>} />

        <Route path="/liste-campagnes" element={<GestionDesCampagnes />} />
      </Routes>
    </Router>
  );
}

export default App;