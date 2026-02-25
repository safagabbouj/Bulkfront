import axios from 'axios';

export const ApiCall = axios.create({
    baseURL: process.env.REACT_APP_ENV_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

ApiCall.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

ApiCall.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('accessToken');
        }
        
        return Promise.reject(error);
    }
);
