import axios from 'axios';
import { LOCAL_STORAGE_USER_TOKEN } from '@/shared/const/localstorage';

export const $api = axios.create({
    baseURL: import.meta.env.VITE_API,
});

$api.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Auth =
            localStorage.getItem(LOCAL_STORAGE_USER_TOKEN) || '';
    }
    return config;
});
