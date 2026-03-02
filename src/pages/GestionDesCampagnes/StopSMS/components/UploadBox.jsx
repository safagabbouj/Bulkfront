import { useRef } from "react";
import cloudUploadIcon from '../../../../assets/cloud-upload.PNG';
import { useStopSmsUpload } from "../../../../hooks/useStopSmsUpload";

const UploadBox = () => {
    const fileInputRef = useRef(null);
    const { uploadFile } = useStopSmsUpload();

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
                    Uploader une liste CSV de numéros à exclure.
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
                    Select a CSV file to upload
                </p>
                <small className="text-muted">
                    Or drag and drop it here
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