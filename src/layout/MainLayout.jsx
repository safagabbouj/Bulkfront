import Sidebar from "../components/Sidebar/Sidebar";
import avatarImg from "../assets/Mask group.svg";
import "./MainLayout.css";

const MainLayout = ({ children, pageTitle, pageSubtitle }) => {
  return (
    <div
      className="d-flex"
      style={{ backgroundColor: "#f4f7f6", minHeight: "100vh" }}
    >
      <Sidebar />
      <div className="flex-grow-1">
        <div className="bg-white shadow-sm" style={{ minHeight: "100vh" }}>
          {/* Barre du haut (Rayan Hello) */}
          <div className="d-flex justify-content-between align-items-center p-4 topbar">

            <div>
              <h5 className="m-0">Rayan, Hello! 👋</h5>
              {pageTitle && (
                <div className="mt-2">
                  <h6
                    className="m-0 fw-bold text-uppercase"
                    style={{ fontSize: "0.9rem", color: "#333" }}
                  >
                    {pageTitle}
                  </h6>
                  {pageSubtitle && (
                    <small className="text-muted fw-bold">{pageSubtitle}</small>
                  )}
                </div>
              )}
            </div>
            <div className="profile-box">
              <img
                src={avatarImg}
                alt="Avatar"
                className="profile-avatar rounded-circle"
              />
              <div>
                <div className="profile-name">Rayan Ghith</div>
                <div className="profile-role">Admin</div>
              </div>
              <span className="profile-caret">▼</span>
            </div>
          
          </div>
          <div className="p-4 main-content">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;