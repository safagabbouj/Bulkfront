import axios from 'axios';

export const ApiCall = axios.create({
    baseURL: process.env.REACT_APP_ENV_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add Authorization token to every request if available
ApiCall.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        
        console.log('🔑 [ApiCall] Token dans localStorage:', token ? `${token.substring(0, 30)}...` : 'ABSENT ❌');
        console.log('🌐 [ApiCall] URL complète:', config.baseURL + config.url);
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('✅ [ApiCall] Header Authorization ajouté');
        } else {
            console.warn('⚠️ [ApiCall] Aucun token trouvé, requête envoyée sans authentification');
        }
        
        console.log('📤 [ApiCall] Headers:', config.headers);
        
        return config;
    },
    (error) => {
        console.error('❌ [ApiCall] Erreur intercepteur request:', error);
        return Promise.reject(error);
    }
);

// Handle 401 Unauthorized globally
ApiCall.interceptors.response.use(
    (response) => {
        console.log('✅ [ApiCall] Réponse reçue:', response.status, response.config.url);
        return response;
    },
    (error) => {
        console.error('❌ [ApiCall] Erreur réponse:', error.response?.status, error.response?.data);
        console.error('❌ [ApiCall] URL de la requête:', error.config?.url);
        
        if (error.response?.status === 401) {
            console.warn('🔒 [ApiCall] Token invalide ou expiré (401), nettoyage localStorage');
            localStorage.removeItem('accessToken');
            // Optionally redirect to login page
            // window.location.href = "/login";
        }
        
        if (error.response?.status === 500) {
            console.error('💥 [ApiCall] Erreur serveur 500:', error.response?.data);
        }
        
        return Promise.reject(error);
    }
);
