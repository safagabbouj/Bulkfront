import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ResetPassword.css";
import { useMutation } from "@tanstack/react-query";
import { InputText } from "primereact/inputtext";
import { AuthenticationService } from "../../../services/AuthenticationService";
import { ConfirmResetPasswordRequestDto } from "../../../models/user/ConfirmResetPasswordRequestDto";
import { useTranslation } from "react-i18next";

const ResetPassword = () => {
    const [isResetPassword, setIsResetPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [correctPassword, setCorrectPassword] = useState(false);

    const navigate = useNavigate();
    const { t } = useTranslation();

    /* -------------------- SEND OTP -------------------- */
    const resetPasswordMutation = useMutation({
        mutationFn: (data) =>
            AuthenticationService.sendResetPasswordOtp(data),

        onSuccess: (response) => {
            localStorage.setItem("otpUser", JSON.stringify(response?.data));
            setIsResetPassword(true);
        },

        onError: (error) => {
            console.error(
                "sendResetPasswordOtp error:",
                error?.response?.data || error.message
            );
        },
    });

    const onResetPassword = () => {
        if (!email) return;
        resetPasswordMutation.mutate(email);
    };

    /* -------------------- CONFIRM RESET -------------------- */
    const confirmResetMutation = useMutation({
        mutationFn: (payload) =>
            AuthenticationService.confirmResetPasswordAuth(payload),

        onSuccess: () => {
            localStorage.removeItem("otpUser");
            setCorrectPassword(true);

            setTimeout(() => {
                navigate("/login");
            }, 3000);
        },

        onError: (error) => {
            console.error(
                "Confirm reset error:",
                error?.response?.data || error.message
            );
        },
    });

    const onConfirmResetMutation = () => {
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const storedOtp = localStorage.getItem("otpUser");
        if (!storedOtp) return;

        const otpUserCode = JSON.parse(storedOtp);
        const otpUser = otpUserCode?.code?.toString() || "";

        const payload = new ConfirmResetPasswordRequestDto({
            email,
            otp,
            newPassword,
            confirmPassword,
            otpUser,
        });

        confirmResetMutation.mutate(payload);
    };

    const returnButton = (e) => {
        e.preventDefault();
        window.history.back();
    };

    return (
        <div className="reset-password-bg">
            <div className="reset-password-interface">
                <div className="reset-password-title">
                    <div>
                        <div className="orange-logo"></div>
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

                {/* -------------------- STEP 1 : EMAIL -------------------- */}
                {!isResetPassword && (
                    <div className="reset-password-form">
                        <div style={{ width: "70%" }}>
                            <div className="mb-3">
                                <label className="form-label">
                                    {t("saisir-id-reset-pwd")}
                                </label>
                                <InputText
                                    className="form-control"
                                    required
                                    type="text"
                                    placeholder={t("Identifiant")}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "70%",
                                paddingTop: "2%",
                                paddingBottom: "5%",
                            }}
                        >
                            <Link
                                className="link-opacity-50-hover"
                                to="#"
                                onClick={returnButton}
                                style={{ color: "rgba(255, 121, 0, 1)" }}
                            >
                                {t("precedent")}
                            </Link>

                            <button
                                type="button"
                                className="btn btn-dark"
                                onClick={onResetPassword}
                                disabled={resetPasswordMutation.isPending}
                            >
                                {resetPasswordMutation.isPending
                                    ? "Loading..."
                                    : t("Continuer")}
                            </button>
                        </div>

                        {resetPasswordMutation.isError && (
                            <p className="text-danger">{t("Email-not-found")}</p>
                        )}
                    </div>
                )}

                {/* -------------------- STEP 2 : OTP + PASSWORD -------------------- */}
                {isResetPassword && (
                    <div className="reset-password-form">
                        <div
                            style={{
                                width: "70%",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <div className="mb-3">
                                <label className="form-label">
                                    {t("saisir-code-securite")}
                                </label>
                                <InputText
                                    type="text"
                                    className="form-control"
                                    required
                                    placeholder={t("code-otp")}
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    {t("saisir-nouveau-mdp")}
                                </label>
                                <InputText
                                    type="password"
                                    className="form-control"
                                    required
                                    placeholder={t("mdp")}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    {t("confirmer-nouveau-mdp")}
                                </label>
                                <InputText
                                    type="password"
                                    className="form-control"
                                    required
                                    placeholder={t("confirmer-mdp")}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "70%",
                                paddingTop: "2%",
                                paddingBottom: "5%",
                            }}
                        >
                            <Link
                                className="link-opacity-50-hover"
                                onClick={() => setIsResetPassword(false)}
                                style={{ color: "rgba(255, 121, 0, 1)" }}
                            >
                                {t("precedent")}
                            </Link>

                            <button
                                type="button"
                                className="btn btn-dark"
                                onClick={onConfirmResetMutation}
                                disabled={confirmResetMutation.isPending}
                            >
                                {confirmResetMutation.isPending
                                    ? "Loading..."
                                    : t("Valider")}
                            </button>
                        </div>

                        {confirmResetMutation.isError && (
                            <p className="text-danger">
                                {t("verif-credentials")}
                            </p>
                        )}

                        {correctPassword && (
                            <p className="text-success">
                                {t("mdp-changé")}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;
