import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo-section">
        <span style={{ fontWeight: "bold" }}>Orange</span> Messaging Pro
      </div>

      <ul className="menu">
        <li>
          <span className="icon">🏠</span> Accueil
        </li>
        
        {/* Item parent actif */}
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