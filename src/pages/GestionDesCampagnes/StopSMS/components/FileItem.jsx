import deleteIcon from "../../../../assets/supprimer (3) 1 (1).svg";
import csvIcon from "../../../../assets/fichier-csv 1.svg";

/* Download icon */
const DownloadIcon = ({ size = 20, color = "#6c757d" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ cursor: "pointer" }}
    >
        <path d="M12 5v14" />
        <polyline points="19 12 12 19 5 12" />
        <path d="M5 19h14" />
    </svg>
);

const FileItem = ({
                      file,
                      progress,
                      onDelete,
                      onDownload,
                  }) => {

    const handleDelete = () => {
        onDelete(file.fileName);
    };

    const handleDownload = () => {
        onDownload(file);
    };

    return (
        <div className="card p-3">

            <div className="d-flex justify-content-between align-items-center mb-2">

                <div className="d-flex align-items-center gap-2">
                    <img
                        src={csvIcon}
                        alt="CSV"
                        style={{ width: "20px", height: "20px" }}
                    />
                    <span className="fw-semibold">{file.fileName}</span>
                </div>

                <div className="d-flex align-items-center gap-3">

                    <span className="text-muted">{progress}%</span>

                    <span title="Download file" onClick={handleDownload}>
            <DownloadIcon />
          </span>

                    <img
                        src={deleteIcon}
                        alt="Supprimer"
                        onClick={handleDelete}
                        style={{ cursor: "pointer", width: "20px", height: "20px" }}
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