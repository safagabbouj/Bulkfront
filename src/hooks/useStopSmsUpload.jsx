import { useMutation, useQueryClient } from "@tanstack/react-query";
import { StopSmsService } from "../services/stopsmsService";
import { useState } from "react";

// Hook pour uploader un fichier Stop SMS avec React Query
export const useUploadStopSms = () => {
  const queryClient = useQueryClient();
  const [progress, setProgress] = useState(0);

  return useMutation({
    mutationFn: ({ file, owner }) => {
      setProgress(0);
      return StopSmsService.uploadStopSms(file, owner, (event) => {
        const percent = Math.round((event.loaded * 100) / event.total);
        setProgress(percent);
      });
    },
    onSuccess: (data, variables) => {
      // Ajouter le fichier uploadé au cache local
      queryClient.setQueryData(['stop-sms-files'], (old = []) => [
        ...old,
        {
          id: Date.now(),
          fileName: variables.file.name,
          uploadDate: new Date().toISOString(),
          owner: variables.owner,
        }
      ]);
      setProgress(0);
    },
    onError: (error) => {
      console.error("Erreur lors de l'upload du fichier Stop SMS:", error);
      setProgress(0);
    },
  });
};

// Hook combiné pour faciliter l'utilisation
export const useStopSmsUpload = () => {
  const queryClient = useQueryClient();
  const uploadMutation = useUploadStopSms();
  const [progress, setProgress] = useState(0);
  
  // Récupérer la liste des fichiers depuis le cache React Query
  const uploadedFiles = queryClient.getQueryData(['stop-sms-files']) || [];

  const uploadFile = async (file, owner) => {
    setProgress(0);
    await uploadMutation.mutateAsync({ file, owner });
    setProgress(0);
  };

  return {
    progress,
    uploadedFiles,
    uploadFile,
    loading: uploadMutation.isPending,
    error: uploadMutation.error,
  };
};