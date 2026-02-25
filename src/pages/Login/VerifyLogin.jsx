import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
// import { AuthenticationService } from "../../services/AuthenticationService.ts";
import { AuthenticationService } from "../../services/AuthentificationService.jsx";
import "./Login.css";
import { useNavigate, useLocation } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { useAuth } from "../../services/AuthContext.jsx";
import { useTranslation } from "react-i18next";

const VerifyLogin = () => {

    const navigate = useNavigate();
    const { state } = useLocation();
    const { login } = useAuth();
    const { t } = useTranslation();

    const email = state?.email || localStorage.getItem("otp_email");
    // const [otpCode, setOtpCode] = useState("");
    const [otpCodeUser, setOtpCodeUser] = useState("");

    const verifyOtpMutation = useMutation({
        mutationFn: (data) => AuthenticationService.verifyCode(data),
        onSuccess: (response) => {
            if (response.data?.accessToken) {
                login(response.data.accessToken);
                
                localStorage.getItem('accessToken');
                
                localStorage.setItem("user", JSON.stringify(response.data.user));

                localStorage.removeItem("verifyLogin");
                localStorage.removeItem("otp");
                localStorage.removeItem("otp_email");

                navigate("/accueil");
            }
        }
    });

    const onVerifyOtp = () => {
        const otpVerify = JSON.parse(localStorage.getItem("otp"))
        const otpCode = otpVerify.code.toString()
        verifyOtpMutation.mutate({ email, otpCode, otpCodeUser });
    };

    return (
        <div className="login-bg">
            <div className="login-interface">
                <div className="login-title">
                    <div>
                        <div className="orange-logo-login" style={{ width: "75px" }}></div>
                    </div>
                    <div className="title-layout">
                        <label style={{ fontWeight: "700", fontSize: "35px" }}>Messaging</label>&nbsp;
                        <label style={{ fontWeight: "400", fontSize: "35px" }}>Pro</label>
                    </div>
                </div>
                <div className="login-form">
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: "10%" }}>
                        <label style={{ fontWeight: "bold", fontSize: "35px" }}>{t('connexion')}</label>
                        <label style={{ fontWeight: "300", fontSize: "25px" }}>{t('identifier-sur-mon-espace')}</label>
                    </div>
                    <div>
                        <div style={{ width: "100%" }}>
                            <div className="mb-3">
                                <label className="form-label">{t('verification-code')}</label>
                                <InputText className="form-control" placeholder={t('code-otp')} value={otpCodeUser} onChange={(e) => setOtpCodeUser(e.target.value)} />
                            </div>
                            <button type="button" className="btn btn-dark" onClick={onVerifyOtp} disabled={verifyOtpMutation.isPending} style={{ marginTop: "15%", width: "100%", marginBottom: "7%" }}>
                                {verifyOtpMutation.isPending ? t('verification') : t("verifier")}
                            </button>
                            {verifyOtpMutation.isError && (
                                <p className="text-danger">{t('login-failed-otp')}</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default VerifyLogin