import { API_ENDPOINT } from "../utils/API_ENDPOINT";
import { ApiCall } from "./ApiCall";

export const AuthenticationService = {
    login: (authRequest) => {
        return ApiCall.post(
            API_ENDPOINT.LOGIN,
            authRequest
        );
    },

    verifyCode: (verificationRequest) => {
        return ApiCall.post(
            API_ENDPOINT.VERIFY,
            verificationRequest
        );
    },

    sendResetPasswordOtp: (userEmail) => {
        return ApiCall.post(
            API_ENDPOINT.RESET_PASSWORD,
            userEmail,
            { headers: { "Content-Type": "text/plain" } }
        );
    },

    confirmResetPasswordAuth: (confirmResetPasswordRequestDto) => {
        return ApiCall.post(
            API_ENDPOINT.CONFIRM_RESET_PASSWORD,
            confirmResetPasswordRequestDto
        );
    },
};
