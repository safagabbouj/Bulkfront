import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import toggleIcon from "../../assets/Group 3.png";
import orangeLogo from "../../assets/Small_Logo_RGB 1.svg";
import accueilIcon from "../../assets/accueil (6) 1.svg";
import campagnesIcon from "../../assets/affaires-et-commerce 1.svg";
import contactsIcon from "../../assets/appel 1.svg";
import reportingIcon from "../../assets/rapport-de-donnees 1.svg";
import faqIcon from "../../assets/faq (1) 1.svg";
import actifIcon from "../../assets/actif 1.svg";
import livreIcon from "../../assets/livre-de-contact 1.svg";


const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const [isOpen, setIsOpen] = useState(() => {
    const saved = localStorage.getItem("sidebar_open");
    if (saved !== null) return saved === "true";
    return window.innerWidth > 768;
  });

  useEffect(() => {
    localStorage.setItem("sidebar_open", String(isOpen));
  }, [isOpen]);

  const toggleSidebar = () => setIsOpen((v) => !v);

  // ✅ dropdown states
  const [isCampaignsOpen, setIsCampaignsOpen] = useState(false);

  // ✅ NEW: users dropdown
  const [isUsersOpen, setIsUsersOpen] = useState(false);

  const [activeItem, setActiveItem] = useState("accueil");
  const [activeSubItem, setActiveSubItem] = useState(null);

  const goTo = (path) => {
    navigate(path);
    if (isMobile) setIsOpen(false);
  };

  useEffect(() => {
    const path = location.pathname;

    if (path === "/" || path === "/accueil") {
      setActiveItem("accueil");
      setActiveSubItem(null);
      setIsCampaignsOpen(false);
      setIsUsersOpen(false);
    }

    // ✅ campagnes
    else if (path === "/stop-sms") {
      setActiveItem("campagnes");
      setActiveSubItem("stop-sms");
      setIsCampaignsOpen(true);
      setIsUsersOpen(false);
    } else if (path === "/liste-campagnes") {
      setActiveItem("campagnes");
      setActiveSubItem("liste-campagnes");
      setIsCampaignsOpen(true);
      setIsUsersOpen(false);
    }

    // ✅ contacts
    else if (path === "/contacts") {
      setActiveItem("contacts");
      setActiveSubItem(null);
      setIsCampaignsOpen(false);
      setIsUsersOpen(false);
    }

    // ✅ utilisateurs + roles (NEW)
    else if (path === "/utilisateurs") {
      setActiveItem("utilisateurs");
      setActiveSubItem("liste-utilisateurs");
      setIsUsersOpen(true);
      setIsCampaignsOpen(false);
    } else if (path === "/roles") {
      setActiveItem("utilisateurs");
      setActiveSubItem("roles");
      setIsUsersOpen(true);
      setIsCampaignsOpen(false);
    }

    // ✅ others
    else if (path === "/alertes-services") {
      setActiveItem("alertes-services");
      setActiveSubItem(null);
      setIsCampaignsOpen(false);
      setIsUsersOpen(false);
    } else if (path === "/reporting") {
      setActiveItem("reporting");
      setActiveSubItem(null);
      setIsCampaignsOpen(false);
      setIsUsersOpen(false);
    } else if (path === "/faq") {
      setActiveItem("faq");
      setActiveSubItem(null);
      setIsCampaignsOpen(false);
      setIsUsersOpen(false);
    }
  }, [location.pathname]);

  return (
    <>
      {isMobile && isOpen && (
        <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />
      )}

      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
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
              setIsUsersOpen(false);
              goTo("/accueil");
            }}
          >
            <span className="icon"><img src={accueilIcon} alt="Accueil" /></span>
            <span className="menu-label">Accueil</span>
          </li>

          {/* Campagnes */}
          <li
            className={activeItem === "campagnes" ? "active" : ""}
            onClick={() => {
              setActiveItem("campagnes");
              setIsCampaignsOpen((v) => !v);
              setIsUsersOpen(false); // ✅ close users dropdown
            }}
          >
            <span className="icon"><img src={campagnesIcon} alt="Campagnes" /></span>
            <span className="menu-label">Gestion des campagnes</span>
          </li>

          {isCampaignsOpen && (
            <ul className={`submenu ${isOpen ? "submenu-open" : "submenu-float"}`}>
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
              setIsUsersOpen(false);
              goTo("/contacts");
            }}
          >
            <span className="icon"><img src={contactsIcon} alt="Contacts" /></span>
            <span className="menu-label">Gestion des contacts</span>
          </li>

          {/* ✅ Utilisateurs (NEW submenu like campagnes) */}
          <li
            className={activeItem === "utilisateurs" ? "active" : ""}
            onClick={() => {
              setActiveItem("utilisateurs");
              setIsUsersOpen((v) => !v);
              setIsCampaignsOpen(false); // ✅ close campagnes dropdown
            }}
          >
            <span className="icon"><img src={livreIcon} alt="Utilisateurs" /></span>
            <span className="menu-label">Gestion des utilisateurs</span>
          </li>

          {isUsersOpen && (
            <ul
              className={`submenu submenu-users ${
                isOpen ? "submenu-open" : "submenu-float"
              }`}
            >
              <li
                className={activeSubItem === "liste-utilisateurs" ? "active-sub" : ""}
                onClick={() => {
                  setActiveItem("utilisateurs");
                  setActiveSubItem("liste-utilisateurs");
                  goTo("/utilisateurs");
                  setIsUsersOpen(false);
                }}
              >
                <span className="menu-label">👤 Liste des utilisateurs</span>
              </li>

              <li
                className={activeSubItem === "roles" ? "active-sub" : ""}
                onClick={() => {
                  setActiveItem("utilisateurs");
                  setActiveSubItem("roles");
                  goTo("/roles");
                  setIsUsersOpen(false);
                }}
              >
                <span className="menu-label">⚙️ Gestion des rôles</span>
              </li>
            </ul>
          )}

          {/* Alertes */}
          <li
            className={activeItem === "alertes-services" ? "active" : ""}
            onClick={() => {
              setActiveItem("alertes-services");
              setActiveSubItem(null);
              setIsCampaignsOpen(false);
              setIsUsersOpen(false);
              goTo("/alertes-services");
            }}
          >
            <span className="icon"><img src={actifIcon} alt="Alertes" /></span>
            <span className="menu-label">Gestion des alertes et services</span>
          </li>

          {/* Reporting */}
          <li
            className={activeItem === "reporting" ? "active" : ""}
            onClick={() => {
              setActiveItem("reporting");
              setActiveSubItem(null);
              setIsCampaignsOpen(false);
              setIsUsersOpen(false);
              goTo("/reporting");
            }}
          >
            <span className="icon"><img src={reportingIcon} alt="Reporting" /></span>
            <span className="menu-label">Reporting</span>
          </li>

          {/* FAQ */}
          <li
            className={activeItem === "faq" ? "active" : ""}
            onClick={() => {
              setActiveItem("faq");
              setActiveSubItem(null);
              setIsCampaignsOpen(false);
              setIsUsersOpen(false);
              goTo("/faq");
            }}
          >
            <span className="icon"><img src={faqIcon} alt="FAQ" /></span>
            <span className="menu-label">liste des FAQ</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
