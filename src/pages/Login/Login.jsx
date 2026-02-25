import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {AuthenticationService} from "../../services/AuthentificationService";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { useTranslation } from "react-i18next";

const Login = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    /* -------------------- LOGIN MUTATION -------------------- */
    const loginMutation = useMutation({
        mutationFn: (data) => AuthenticationService.login(data),

        onSuccess: (response) => {
            const responseData = response?.data;

            if (!responseData) return;

            // Store OTP & verification flag
            localStorage.setItem(
                "otp",
                JSON.stringify(responseData?.otpGenerationDto || {})
            );
            localStorage.setItem(
                "verifyLogin",
                JSON.stringify(responseData?.verifyLogin || false)
            );

            if (responseData?.verifyLogin === true) {
                localStorage.setItem("otp_email", email);
                navigate("/verify", { state: { email } });
            }
        }
    });

    const onLogin = () => {
        if (!email || !password) return;
        loginMutation.mutate({ email, password });
    };

    return (
        <div className="login-bg">
            <div className="login-interface">
                <div className="login-title">
                    <div>
                        <div
                            className="orange-logo-login"
                            style={{ width: "75px" }}
                        ></div>
                    </div>

                    <div className="title-layout">
                        <label style={{ fontWeight: 700, fontSize: "35px" }}>
                            Messaging
                        </label>
                        &nbsp;
                        <label style={{ fontWeight: 400, fontSize: "35px" }}>
                            Pro
                        </label>
                    </div>
                </div>

                <div className="login-form">
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            paddingBottom: "10%",
                        }}
                    >
                        <label style={{ fontWeight: "bold", fontSize: "35px" }}>
                            {t("connexion")}
                        </label>
                        <label style={{ fontWeight: 300, fontSize: "25px" }}>
                            {t("identifier-sur-mon-espace")}
                        </label>
                    </div>

                    <div style={{ width: "70%" }}>
                        <div className="mb-3">
                            <label className="form-label">
                                {t("Email")}:
                            </label>
                            <InputText
                                type="email"
                                className="form-control"
                                placeholder={t("entrer-email")}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                {t("Password")}:
                            </label>
                            <InputText
                                type="password"
                                className="form-control"
                                placeholder={t("entrer-password")}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <Link
                                to="/reset-password"
                                style={{ color: "rgba(255, 121, 0, 1)" }}
                            >
                                {t("forgot-password")}
                            </Link>
                        </div>

                        <button
                            type="button"
                            className="btn btn-dark"
                            onClick={onLogin}
                            disabled={loginMutation.isPending}
                            style={{
                                marginTop: "18%",
                                width: "100%",
                                marginBottom: "5%",
                            }}
                        >
                            {loginMutation.isPending
                                ? t("logging-in")
                                : t("se-connecter")}
                        </button>

                        {loginMutation.isError && (
                            <p className="text-danger">
                                {t("login-failed")}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
