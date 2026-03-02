import { ApiCall } from "./ApiCall";
const API_URL="/stop-sms"
export const StopSmsService = {
    uploadStopSms: async (file, owner, onUploadProgress) => {
        const formData = new FormData();
        formData.append("file", file);
        console.log("file",file);
        formData.append("owner", owner || "FAKE_CONTACT_ID");

        const response = await ApiCall.post(
            `${API_URL}/upload`,
            formData,

            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress,
            }
        );

        return response.data;
    },
};