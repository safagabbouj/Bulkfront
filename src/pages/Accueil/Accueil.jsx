import { useNavigate } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import "./Accueil.css";

export default function Accueil() {
  const navigate = useNavigate();

  return (
    <MainLayout pageTitle="Dashboard" pageSubtitle="Accueil">
      <div className="homePage">
        <div className="homeText">
          <p>
            Lorem Ipsum is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has
            Been The Industry&apos;s Standard Dummy Text Ever Since The 1500s, When An Unknown Printer
            Took A Galley Of Type And Scrambled It To Make A Type Specimen Book. It Has Survived Not
            Only Five Centuries, But Also The Leap Into Electronic Typesetting, Remaining Essentially
            Unchanged.
          </p>

          <p>
            Lorem Ipsum is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has
            Been The Industry&apos;s Standard Dummy Text Ever Since The 1500s, When An Unknown Printer
            Took A Galley Of Type And Scrambled It To Make A Type Specimen Book. It Has Survived Not
            Only Five Centuries, But Also The Leap Into Electronic Typesetting, Remaining Essentially
            Unchanged.
          </p>
        </div>

        <div className="cardsRow">
          <div className="action-card" onClick={() => navigate("/liste-campagnes")}>
            <div className="card-icon">🏢</div>
            <div className="card-label">Gestion des campagnes</div>
          </div>
          <div className="action-card" onClick={() => navigate("/contacts")}>
            <div className="card-icon">📞</div>
            <div className="card-label">Gestion des contacts</div>
          </div>
          <div className="action-card" onClick={() => navigate("/utilisateurs")}>
            <div className="card-icon">👥</div>
            <div className="card-label">Gestion des utilisateurs</div>
          </div>
          <div className="action-card" onClick={() => navigate("/roles")}>
            <div className="card-icon">⚙️</div>
            <div className="card-label">Gestion des rôles</div>
          </div>
          <div className="action-card" onClick={() => navigate("/alertes-services")}>
            <div className="card-icon">🔔</div>
            <div className="card-label">Gestion des alertes et services</div>
          </div>
          <div className="action-card" onClick={() => navigate("/reporting")}>
            <div className="card-icon">📊</div>
            <div className="card-label">Reporting</div>
          </div>
          <div className="action-card" onClick={() => navigate("/faq")}>
            <div className="card-icon">❓</div>
            <div className="card-label">FAQ</div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
