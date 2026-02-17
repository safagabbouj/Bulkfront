import jwtDecode from "jwt-decode";

export const isAccessTokenValid = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000; // divide by 1000 to get seconds
        return decoded.exp && decoded.exp > now;
    } catch {
        return false;
    }
};
