import MainLayout from "../../../layout/MainLayout";
import StopSMSHeader from "./components/StopSMSHeader";
import UploadBox from "./components/UploadBox";
import FileItem from "./components/FileItem";
import { useStopSmsUpload } from "../../../hooks/useStopSmsUpload";
import "./StopSMS.css";

const StopSMS = () => {

    const {
        uploadedFiles,
        uploadFile,
        deleteFile,
        downloadFile,
        progress,
        loading,
        error,
    } = useStopSmsUpload();

    return (
        <MainLayout pageTitle="Gestion des campagnes" pageSubtitle="Stop SMS">

            <div className="stop-sms-container">

                <StopSMSHeader />

                <UploadBox
                    uploadFile={uploadFile}
                    progress={progress}
                    loading={loading}
                />

                {error && (
                    <div className="alert alert-danger">
                        {error?.message || "Erreur lors de l'upload du fichier"}
                    </div>
                )}

                {uploadedFiles.length > 0 && (
                    <div className="uploaded-files-list">

                        {uploadedFiles.map((file) => (
                            <FileItem
                                key={file.id}
                                file={file}
                                progress={100}
                                onDelete={deleteFile}
                                onDownload={downloadFile}
                            />
                        ))}

                    </div>
                )}

            </div>

        </MainLayout>
    );
};

export default StopSMS;