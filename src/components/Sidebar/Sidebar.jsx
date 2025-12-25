import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import toggleIcon from "../../assets/Group 3.png";
import orangeLogo from "../../assets/orange lego.PNG";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Responsive: detect mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ✅ keep sidebar state (persist) + default: desktop open / mobile closed
  const [isOpen, setIsOpen] = useState(() => {
    const saved = localStorage.getItem("sidebar_open");
    if (saved !== null) return saved === "true";
    return window.innerWidth > 768; // desktop open, mobile closed
  });

  useEffect(() => {
    localStorage.setItem("sidebar_open", String(isOpen));
  }, [isOpen]);

  const toggleSidebar = () => setIsOpen((v) => !v);

  const [isCampaignsOpen, setIsCampaignsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("accueil");
  const [activeSubItem, setActiveSubItem] = useState(null);

  // ✅ helper: navigate + (mobile) close sidebar
  const goTo = (path) => {
    navigate(path);
    if (isMobile) setIsOpen(false);
  };

  // ✅ (A) Synchroniser l'état avec l'URL courante
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
    } else if (path === "/ListeContact") {
      setActiveItem("contacts");
      setActiveSubItem(null);
      setIsCampaignsOpen(false);
    } else if (path === "/utilisateurs") {
      setActiveItem("utilisateurs");
      setActiveSubItem(null);
      setIsCampaignsOpen(false);
    } else if (path === "/alertes-services") {
      setActiveItem("alertes-services");
      setActiveSubItem(null);
      setIsCampaignsOpen(false);
    } else if (path === "/reporting") {
      setActiveItem("reporting");
      setActiveSubItem(null);
      setIsCampaignsOpen(false);
    } else if (path === "/faq") {
      setActiveItem("faq");
      setActiveSubItem(null);
      setIsCampaignsOpen(false);
    }
  }, [location.pathname]);

  return (
    <>
      {/* ✅ overlay فقط في mobile وقت sidebar محلولة */}
      {isMobile && isOpen && (
        <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />
      )}

      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        {/* Bouton Toggle */}
        <button className="toggle-btn" onClick={toggleSidebar}>
          <img src={toggleIcon} alt="Toggle sidebar" />
        </button>

        <div className="logo-section">
          <img src={orangeLogo} alt="Orange Logo" className="orange-logo" />
          <div className="logo-text logo-text-hide">
            <span style={{ fontWeight: "bold" }}>Orange</span> Messaging Pro
          </div>
        </div>

        <ul className="menu">
          {/* Accueil */}
          <li
            className={activeItem === "accueil" ? "active" : ""}
            onClick={() => {
              setActiveItem("accueil");
              setActiveSubItem(null);
              setIsCampaignsOpen(false);
              goTo("/accueil");
            }}
          >
            <span className="icon">🏠</span>
            <span className="menu-label">Accueil</span>
          </li>

          {/* Gestion des campagnes */}
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

          {isCampaignsOpen && (
            <ul className={`submenu ${isOpen ? "submenu-open" : "submenu-float"}`}>
              {/* liste des campagnes */}
              <li
                className={activeSubItem === "liste-campagnes" ? "active-sub" : ""}
                onClick={() => {
                  setActiveItem("campagnes");
                  setActiveSubItem("liste-campagnes");
                  goTo("/liste-campagnes");
                  setIsCampaignsOpen(false);
                }}
              >
                <span className="menu-label">📋 liste des campagnes</span>
              </li>

              {/* stop sms */}
              <li
                className={activeSubItem === "stop-sms" ? "active-sub" : ""}
                onClick={() => {
                  setActiveItem("campagnes");
                  setActiveSubItem("stop-sms");
                  goTo("/stop-sms");
                  setIsCampaignsOpen(false);
                }}
              >
                <span className="menu-label">🟠 Stop sms</span>
              </li>
            </ul>
          )}

          {/* Contacts */}
          <li
            className={activeItem === "contacts" ? "active" : ""}
            onClick={() => {
              setActiveItem("contacts");
              setActiveSubItem(null);
              setIsCampaignsOpen(false);
              goTo("/ListeContact");
            }}
          >
            <span className="icon">📞</span>
            <span className="menu-label">Gestion des contacts</span>
          </li>

          {/* Utilisateurs */}
          <li
            className={activeItem === "utilisateurs" ? "active" : ""}
            onClick={() => {
              setActiveItem("utilisateurs");
              setActiveSubItem(null);
              setIsCampaignsOpen(false);
              goTo("/utilisateurs");
            }}
          >
            <span className="icon">👥</span>
            <span className="menu-label">Gestion des utilisateurs</span>
          </li>

          {/* Alertes & services */}
          <li
            className={activeItem === "alertes-services" ? "active" : ""}
            onClick={() => {
              setActiveItem("alertes-services");
              setActiveSubItem(null);
              setIsCampaignsOpen(false);
              goTo("/alertes-services");
            }}
          >
            <span className="icon">🔔</span>
            <span className="menu-label">Gestion des alertes et services</span>
          </li>

          {/* Reporting */}
          <li
            className={activeItem === "reporting" ? "active" : ""}
            onClick={() => {
              setActiveItem("reporting");
              setActiveSubItem(null);
              setIsCampaignsOpen(false);
              goTo("/reporting");
            }}
          >
            <span className="icon">📊</span>
            <span className="menu-label">Reporting</span>
          </li>

          {/* FAQ */}
          <li
            className={activeItem === "faq" ? "active" : ""}
            onClick={() => {
              setActiveItem("faq");
              setActiveSubItem(null);
              setIsCampaignsOpen(false);
              goTo("/faq");
            }}
          >
            <span className="icon">❓</span>
            <span className="menu-label">liste des FAQ</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
