import { useState } from "react";
import "./Sidebar.css";
import toggleIcon from "../../assets/Group 3.png";

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
        <span style={{ fontWeight: "bold" }}>Orange</span> Messaging Pro
      </div>

      <ul className="menu">
        <li>
          <span className="icon">🏠</span> Accueil
        </li>
        
        <li className="active">
          <span className="icon">🏢</span> Gestion des campagnes
        </li>
        
        {/* Sous-menu qui apparaît sous l'item actif */}
        <ul className="submenu">
          <li className="active-sub">🟠 Stop sms</li>
          <li>📋 liste des campagnes</li>
        </ul>

        <li>
          <span className="icon">📞</span> Gestion des contacts
        </li>
        <li>
          <span className="icon">👥</span> Gestion des utilisateurs
        </li>
        <li>
          <span className="icon">📊</span> Reporting
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;