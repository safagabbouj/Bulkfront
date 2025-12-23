import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import toggleIcon from "../../assets/Group 3.png";
import orangeLogo from "../../assets/orange lego.PNG";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [isCampaignsOpen, setIsCampaignsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("accueil");
  const [activeSubItem, setActiveSubItem] = useState(null);

  // Synchroniser l'état avec l'URL courante
  useEffect(() => {
    const path = location.pathname;
    
    if (path === "/" || path === "/accueil") {
      setActiveItem("accueil");
      setActiveSubItem(null);
      setIsCampaignsOpen(false);
    } else if (path === "/stop-sms") {
      setActiveItem("campagnes");
      setActiveSubItem("stop-sms");
      setIsCampaignsOpen(true);
    } else if (path === "/liste-campagnes") {
      setActiveItem("campagnes");
      setActiveSubItem("liste-campagnes");
      setIsCampaignsOpen(true);
    }
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      {/* Bouton Toggle */}
      <button className="toggle-btn" onClick={toggleSidebar}>
        <img src={toggleIcon} alt="Toggle sidebar" />
      </button>

      <div className="logo-section">
        <img src={orangeLogo} alt="Orange Logo" className="orange-logo" />
        <div className="logo-text">
          <span style={{ fontWeight: "bold" }}>Orange</span> Messaging Pro
        </div>
      </div>

      <ul className="menu">
        <li
          className={activeItem === "accueil" ? "active" : ""}
          onClick={() => {
            setActiveItem("accueil");
            setIsCampaignsOpen(false);
            navigate("/accueil");
          }}
        >
          <span className="icon">🏠</span>
          <span className="menu-label">Accueil</span>
        </li>
        
        <li
          className={activeItem === "campagnes" ? "active" : ""}
          onClick={() => {
            setActiveItem("campagnes");
            setIsCampaignsOpen((v) => !v);
          }}
        >
          <span className="icon">🏢</span>
          <span className="menu-label">Gestion des campagnes</span>
        </li>
        
        {/* Sous-menu : affiché uniquement quand Gestion des campagnes est ouvert */}
        {isCampaignsOpen && (
          <ul className="submenu">
            <li
              className={activeSubItem === "stop-sms" ? "active-sub" : ""}
              onClick={() => {
                setActiveSubItem("stop-sms");
                navigate("/stop-sms");
              }}
            >
              <span className="menu-label">🟠 Stop sms</span>
            </li>
            <li
              className={activeSubItem === "liste-campagnes" ? "active-sub" : ""}
              onClick={() => {
                setActiveSubItem("liste-campagnes");
                navigate("/liste-campagnes");
              }}
            >
              <span className="menu-label">📋 liste des campagnes</span>
            </li>
          </ul>
        )}

        <li
          className={activeItem === "contacts" ? "active" : ""}
          onClick={() => {
            setActiveItem("contacts");
            setIsCampaignsOpen(false);
          }}
        >
          <span className="icon">📞</span>
          <span className="menu-label">Gestion des contacts</span>
        </li>
        <li
          className={activeItem === "utilisateurs" ? "active" : ""}
          onClick={() => {
            setActiveItem("utilisateurs");
            setIsCampaignsOpen(false);
          }}
        >
          <span className="icon">👥</span>
          <span className="menu-label">Gestion des utilisateurs</span>
        </li>
        <li
          className={activeItem === "reporting" ? "active" : ""}
          onClick={() => {
            setActiveItem("reporting");
            setIsCampaignsOpen(false);
          }}
        >
          <span className="icon">📊</span>
          <span className="menu-label">Reporting</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;