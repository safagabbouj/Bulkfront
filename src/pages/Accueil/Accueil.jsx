import MainLayout from "../../layout/MainLayout";
import "./Accueil.css";

const Accueil = () => {
  // Données de test pour les statistiques
  const stats = {
    totalCampagnes: 25,
    campagnesActives: 8,
    contactsTotal: 15420,
    tauxOuverture: 78.5
  };

  const dernieresCampagnes = [
    {
      nom: "Campagne Black Friday",
      statut: "Active",
      envois: 2300,
      ouvertures: 1820
    },
    {
      nom: "Campagne Noël", 
      statut: "Programmée",
      envois: 0,
      ouvertures: 0
    },
    {
      nom: "Promotion Janvier",
      statut: "Terminée",
      envois: 980,
      ouvertures: 756
    }
  ];

  return (
    <MainLayout pageTitle="Tableau de bord" pageSubtitle="Accueil">
      <div className="accueil-container">
        {/* Cartes de statistiques */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card text-center border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-center align-items-center mb-3">
                  <div className="stat-icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center">
                    <i className="fas fa-bullhorn"></i>
                  </div>
                </div>
                <h3 className="fw-bold text-primary">{stats.totalCampagnes}</h3>
                <p className="text-muted mb-0">Total Campagnes</p>
              </div>
            </div>
          </div>
          
          <div className="col-md-3">
            <div className="card text-center border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-center align-items-center mb-3">
                  <div className="stat-icon bg-success text-white rounded-circle d-flex align-items-center justify-content-center">
                    <i className="fas fa-play-circle"></i>
                  </div>
                </div>
                <h3 className="fw-bold text-success">{stats.campagnesActives}</h3>
                <p className="text-muted mb-0">Campagnes Actives</p>
              </div>
            </div>
          </div>
          
          <div className="col-md-3">
            <div className="card text-center border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-center align-items-center mb-3">
                  <div className="stat-icon bg-warning text-white rounded-circle d-flex align-items-center justify-content-center">
                    <i className="fas fa-users"></i>
                  </div>
                </div>
                <h3 className="fw-bold text-warning">{stats.contactsTotal.toLocaleString()}</h3>
                <p className="text-muted mb-0">Total Contacts</p>
              </div>
            </div>
          </div>
          
          <div className="col-md-3">
            <div className="card text-center border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-center align-items-center mb-3">
                  <div className="stat-icon bg-info text-white rounded-circle d-flex align-items-center justify-content-center">
                    <i className="fas fa-envelope-open"></i>
                  </div>
                </div>
                <h3 className="fw-bold text-info">{stats.tauxOuverture}%</h3>
                <p className="text-muted mb-0">Taux d'Ouverture</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section des dernières campagnes */}
        <div className="row">
          <div className="col-md-8">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-0 py-3">
                <h5 className="fw-bold mb-0" style={{ color: '#f16e00' }}>
                  <i className="fas fa-chart-line me-2"></i>
                  Dernières Campagnes
                </h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Campagne</th>
                        <th>Statut</th>
                        <th>Envois</th>
                        <th>Ouvertures</th>
                        <th>Taux</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dernieresCampagnes.map((campagne, index) => (
                        <tr key={index}>
                          <td className="fw-semibold">{campagne.nom}</td>
                          <td>
                            <span className={`badge ${
                              campagne.statut === 'Active' ? 'bg-success' :
                              campagne.statut === 'Programmée' ? 'bg-warning' :
                              'bg-secondary'
                            }`}>
                              {campagne.statut}
                            </span>
                          </td>
                          <td>{campagne.envois.toLocaleString()}</td>
                          <td>{campagne.ouvertures.toLocaleString()}</td>
                          <td>
                            {campagne.envois > 0 ? 
                              `${Math.round((campagne.ouvertures / campagne.envois) * 100)}%` : 
                              '-'
                            }
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-0 py-3">
                <h5 className="fw-bold mb-0" style={{ color: '#f16e00' }}>
                  <i className="fas fa-tasks me-2"></i>
                  Actions Rapides
                </h5>
              </div>
              <div className="card-body">
                <div className="d-grid gap-3">
                  <button className="btn btn-primary btn-lg">
                    <i className="fas fa-plus me-2"></i>
                    Nouvelle Campagne
                  </button>
                  <button className="btn btn-outline-primary">
                    <i className="fas fa-users me-2"></i>
                    Gérer Contacts
                  </button>
                  <button className="btn btn-outline-warning">
                    <i className="fas fa-stop-circle me-2"></i>
                    Stop SMS
                  </button>
                  <button className="btn btn-outline-info">
                    <i className="fas fa-chart-bar me-2"></i>
                    Voir Rapports
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Accueil;