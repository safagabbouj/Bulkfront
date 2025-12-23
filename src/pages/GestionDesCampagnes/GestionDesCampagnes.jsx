import MainLayout from "../../layout/MainLayout";
import "./GestionDesCampagnes.css";

const GestionDesCampagnes = () => {
  // Données de test pour les campagnes
  const campagnes = [
    {
      id: 1,
      nom: "Campagne Black Friday",
      statut: "Active",
      dateCreation: "2024-12-20",
      nombreContacts: 1500
    },
    {
      id: 2,
      nom: "Campagne Noël",
      statut: "Programmée",
      dateCreation: "2024-12-18",
      nombreContacts: 2300
    },
    {
      id: 3,
      nom: "Promotion Janvier",
      statut: "Terminée",
      dateCreation: "2024-12-15",
      nombreContacts: 980
    }
  ];

  const getStatutBadge = (statut) => {
    const badgeClasses = {
      "Active": "bg-success",
      "Programmée": "bg-warning",
      "Terminée": "bg-secondary"
    };
    return `badge ${badgeClasses[statut] || 'bg-primary'}`;
  };

  return (
    <MainLayout pageTitle="Gestion des campagnes" pageSubtitle="Liste des campagnes">
      <div className="gestion-campagnes-container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold" style={{ color: '#f16e00' }}>Liste des Campagnes</h4>
          <button className="btn btn-primary">
            <i className="fas fa-plus me-2"></i>
            Nouvelle Campagne
          </button>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Nom de la campagne</th>
                    <th>Statut</th>
                    <th>Date de création</th>
                    <th>Nombre de contacts</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {campagnes.map((campagne) => (
                    <tr key={campagne.id}>
                      <td className="fw-semibold">{campagne.nom}</td>
                      <td>
                        <span className={getStatutBadge(campagne.statut)}>
                          {campagne.statut}
                        </span>
                      </td>
                      <td>{campagne.dateCreation}</td>
                      <td>{campagne.nombreContacts.toLocaleString()}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <button className="btn btn-sm btn-outline-primary">
                            <i className="fas fa-eye"></i>
                          </button>
                          <button className="btn btn-sm btn-outline-warning">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button className="btn btn-sm btn-outline-danger">
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default GestionDesCampagnes;