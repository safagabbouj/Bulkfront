import MainLayout from "../../../layout/MainLayout";
import StopSMSHeader from "./components/StopSMSHeader";
import UploadBox from "./components/UploadBox";
import FileItem from "./components/FileItem";
import { useStopSmsUpload } from "../../../hooks/useStopSmsUpload";
import "./StopSMS.css";

const StopSMS = () => {
  const { uploadedFiles, uploadFile, progress, loading, error } = useStopSmsUpload();

  return (
    <MainLayout pageTitle="Gestion des campagnes" pageSubtitle="Stop SMS">
      <div className="stop-sms-container">
        <StopSMSHeader />
        <UploadBox uploadFile={uploadFile} progress={progress} loading={loading} />
        
        {error && (
          <div className="alert alert-danger" role="alert">
            {error?.message || "Erreur lors de l'upload du fichier"}
          </div>
        )}
        
        {uploadedFiles.length > 0 && (
          <div className="uploaded-files-list">
            {uploadedFiles.map((file, index) => (
              <FileItem 
                key={file.id || index} 
                fileName={file.fileName || file.name || `Fichier ${index + 1}`} 
                progress={100} 
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default StopSMS;
