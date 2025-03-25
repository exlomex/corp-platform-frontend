import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LOCAL_STORAGE_USER_TOKEN } from '@/shared/const/localstorage';

export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem(LOCAL_STORAGE_USER_TOKEN) || '';
            if (token) {
                headers.set('Auth', token);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({}),
});
