import { useRef } from "react";
import cloudUploadIcon from '../../../../assets/cloud-upload.PNG';

const UploadBox = ({ uploadFile, progress, loading }) => {
    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const owner = "admin"; // Replace with logged user

        await uploadFile(file, owner);
    };

    return (
        <>
            <div className="text-center mb-4">
                <h5 className="fw-bold mb-2" style={{ color: '#f16e00' }}>
                    Stop SMS
                </h5>
                <p className="text-muted small">
                    Il est impératif de consulter la dernière liste des utilisateurs qui ont exprimé leur refus de recevoir de nouveaux SMS publicitaires de votre marque, La liste est disponible en téléchargement gratuitement ici : https://www.sms-stop.tn
                </p>
            </div>

            <div
                className="upload-box text-center p-5 mb-4"
                onClick={handleClick}
                style={{
                    cursor: 'pointer',
                    borderColor: '#d3d3d3',
                    borderWidth: '2px',
                    borderStyle: 'dashed'
                }}
            >
                <img
                    src={cloudUploadIcon}
                    alt="cloud upload"
                    style={{ width: '80px', height: '80px', marginBottom: '1rem' }}
                />
                <p className="fw-semibold mb-1">
                    Quand vous uploader la liste STOP SMS,
                </p>
                <small className="text-muted">
                    les numéros seront systématiquement éliminés de la liste de vos contacts lors de l'envoi d'une campagne
                </small>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
            </div>
        </>
    );
};

export default UploadBox;