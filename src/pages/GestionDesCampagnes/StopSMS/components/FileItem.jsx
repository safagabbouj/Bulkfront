import deleteIcon from '../../../../assets/supprimer (3) 1 (1).svg';
import csvIcon from '../../../../assets/fichier-csv 1.svg';

const FileItem = ({ fileName, progress }) => {
    const handleDelete = () => {
        console.log('Suppression du fichier');
    };

    return (
        <div className="card p-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="d-flex align-items-center gap-2">
                    <img
                        src={csvIcon}
                        alt="CSV"
                        style={{ width: '20px', height: '20px' }}
                    />
                    <span className="fw-semibold">{fileName}</span>
                </div>

                <div className="d-flex align-items-center gap-3">
                    <span className="text-muted">{progress}%</span>
                    <img
                        src={deleteIcon}
                        alt="Supprimer"
                        onClick={handleDelete}
                        style={{ cursor: 'pointer', width: '20px', height: '20px' }}
                    />
                </div>
            </div>

            <div className="progress mt-2">
                <div
                    className="progress-bar bg-warning"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};

export default FileItem;