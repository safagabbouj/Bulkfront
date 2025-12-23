import { useState } from "react";
import "./Sidebar.css";
import toggleIcon from "../../assets/Group 3.png";
import orangeLogo from "../../assets/orange lego.PNG";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

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
        <li>
          <span className="icon">🏠</span>
          <span className="menu-label">Accueil</span>
        </li>
        
        <li className="active">
          <span className="icon">🏢</span>
          <span className="menu-label">Gestion des campagnes</span>
        </li>
        
        {/* Sous-menu qui apparaît sous l'item actif */}
        <ul className="submenu">
          <li className="active-sub">
            <span className="menu-label">🟠 Stop sms</span>
          </li>
          <li>
            <span className="menu-label">📋 liste des campagnes</span>
          </li>
        </ul>

        <li>
          <span className="icon">📞</span>
          <span className="menu-label">Gestion des contacts</span>
        </li>
        <li>
          <span className="icon">👥</span>
          <span className="menu-label">Gestion des utilisateurs</span>
        </li>
        <li>
          <span className="icon">📊</span>
          <span className="menu-label">Reporting</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;