import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { StopSmsService } from "../services/stopsmsService";

const STORAGE_KEY = "stop_sms_files";

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (files) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
};

const removeFromStorage = (fileName) => {
  const files = loadFromStorage().filter((f) => f.fileName !== fileName);
  saveToStorage(files);
  return files;
};

/* Convert file to base64 */
const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

export const useStopSmsUpload = () => {
  const queryClient = useQueryClient();
  const [progress, setProgress] = useState(0);

  const { data: uploadedFiles = [] } = useQuery({
    queryKey: ["stop-sms-files"],
    queryFn: loadFromStorage,
  });

  const uploadMutation = useMutation({
    mutationFn: ({ file, owner }) => {
      setProgress(0);

      return StopSmsService.uploadStopSms(file, owner, (event) => {
        const percent = Math.round((event.loaded * 100) / event.total);
        setProgress(percent);
      });
    },

    onSuccess: async (data, variables) => {
      const base64 = await fileToBase64(variables.file);

      const newEntry = {
        id: Date.now(),
        fileName: variables.file.name,
        fileData: base64,
        uploadDate: new Date().toISOString(),
        owner: variables.owner,
      };

      queryClient.setQueryData(["stop-sms-files"], (old = []) => {
        const filtered = old.filter((f) => f.fileName !== newEntry.fileName);
        const updated = [...filtered, newEntry];

        saveToStorage(updated);

        return updated;
      });

      setProgress(0);
    },

    onError: (error) => {
      console.error("Upload error:", error);
      setProgress(0);
    },
  });

  const uploadFile = async (file, owner) => {
    await uploadMutation.mutateAsync({ file, owner });
  };

  const deleteFile = (fileName) => {
    const updated = removeFromStorage(fileName);
    queryClient.setQueryData(["stop-sms-files"], updated);
  };

  const downloadFile = (file) => {
    const link = document.createElement("a");
    link.href = file.fileData;
    link.download = file.fileName;
    link.click();
  };

  return {
    progress,
    uploadedFiles,
    uploadFile,
    deleteFile,
    downloadFile,
    loading: uploadMutation.isPending,
    error: uploadMutation.error,
  };
};