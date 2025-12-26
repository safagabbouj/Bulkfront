import deleteIcon from '../../../../assets/supprimer (3) 1 (1).svg'
import csvIcon from '../../../../assets/fichier-csv 1.svg';


const FileItem = () => {
  const handleDelete = () => {
    // Logique de suppression à implémenter
    console.log('Suppression du fichier');
  };

  return (
    <div className="card p-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="d-flex align-items-center gap-2">
          <img src={csvIcon} alt="CSV" style={{ width: '20px', height: '20px' }} />
          <span className="fw-semibold">LIST_001.csv</span>
        </div>
        <div className="d-flex align-items-center gap-3">
          <span className="text-muted">60%</span>
          <img 
            src={deleteIcon} 
            alt="Supprimer"
            title="Supprimer"
            onClick={handleDelete}
            style={{ cursor: 'pointer', width: '20px', height: '20px' }}
          />
        </div>
      </div>

      <div className="progress mt-2">
        <div
          className="progress-bar bg-warning"
          style={{ width: "60%" }}
        />
      </div>
    </div>
  );
};

export default FileItem;
