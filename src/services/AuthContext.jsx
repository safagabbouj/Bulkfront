import { createContext, useContext, useState } from "react";

// Create a context with default value null
const AuthContext = createContext(null);

// Provider component that wraps your app
export const AuthProvider = ({ children }) => {
    // Initialize token from localStorage
    const [token, setToken] = useState(localStorage.getItem("accessToken"));

    // Login function: saves JWT and updates state
    const login = (jwt) => {
        localStorage.setItem("accessToken", jwt);
        setToken(jwt);
    };

    // Logout function: removes JWT and clears state
    const logout = () => {
        localStorage.removeItem("accessToken");
        setToken(null);
    };

    // Boolean to check if user is authenticated
    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to access AuthContext
export const useAuth = () => useContext(AuthContext);
