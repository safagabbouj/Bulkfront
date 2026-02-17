import { Navigate } from "react-router-dom";

const OtpRoute = ({ children }) => {
  const otpVerif = JSON.parse(localStorage.getItem("verifyLogin") || "false");
  if (!otpVerif) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default OtpRoute;
