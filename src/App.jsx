import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from "./pages/Accueil/Accueil";
import StopSMS from "./pages/StopSMS/StopSMS";
import GestionDesCampagnes from "./pages/GestionDesCampagnes/GestionDesCampagnes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/accueil" element={<Accueil />} />
        <Route path="/stop-sms" element={<StopSMS />} />
        <Route path="/liste-campagnes" element={<GestionDesCampagnes />} />
      </Routes>
    </Router>
  );
}

export default App;