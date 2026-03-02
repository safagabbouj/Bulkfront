import { useState } from "react";
// import {StopSmsService} from "../services/StopSmsService";
import { StopSmsService } from "../services/stopsmsService";
export const useStopSmsUpload = () => {
    const [progress, setProgress] = useState(0);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const uploadFile = async (file, owner) => {
        try {
            setLoading(true);
            setError(null);

            const data = await StopSmsService.uploadStopSms(
                file,
                owner,
                (event) => {
                    const percent = Math.round(
                        (event.loaded * 100) / event.total
                    );
                    setProgress(percent);
                }
            );

            setUploadedFiles((prev) => [
                ...prev,
                { name: file.name, progress: 100 }
            ]);

            return data;
        } catch (err) {
            setError("Erreur lors de l'upload du fichier.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        progress,
        uploadedFiles,
        uploadFile,
        loading,
        error,
    };
};