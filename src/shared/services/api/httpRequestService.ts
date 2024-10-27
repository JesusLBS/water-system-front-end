import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestOptions {
    url: string;
    method?: HttpMethod;
    data?: any;
    headers?: any;
    client?: 'axios' | 'fetch';
}

const apiKey = import.meta.env.VITE_APP_API_KEY;

const httpRequestService = {
    async request<T>({ url, method = 'GET', data, headers, client = 'axios' }: RequestOptions): Promise<T> {
        const updatedHeaders = {
            'x-api-key': apiKey,
            ...headers
        };
        if (client === 'axios') {
            return this.axiosRequest<T>({ url, method, data, headers: updatedHeaders });
        } else {
            return this.fetchRequest<T>({ url, method, data, headers: updatedHeaders });
        }
    },

    async axiosRequest<T>({ url, method, data, headers }: RequestOptions): Promise<T> {
        try {
            const config: AxiosRequestConfig = {
                url,
                method,
                headers,
                data,
            };
            const response: AxiosResponse<T> = await axios(config);
            return response.data;
        } catch (error) {
            console.error('Axios Request Error:', error);
            throw error;
        }
    },

    async fetchRequest<T>({ url, method, data, headers }: RequestOptions): Promise<T> {
        try {
            const options: RequestInit = {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers,
                },
                body: method !== 'GET' ? JSON.stringify(data) : null,
            };

            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Fetch error: ${response.statusText}`);
            }

            const result = await response.json();
            return result as T;
        } catch (error) {
            console.error('Fetch Request Error:', error);
            throw error;
        }
    },

    get<T>(url: string, headers?: any, client: 'axios' | 'fetch' = 'axios'): Promise<T> {
        return this.request<T>({ url, method: 'GET', headers, client });
    },

    post<T>(url: string, data: any, headers?: any, client: 'axios' | 'fetch' = 'axios'): Promise<T> {
        return this.request<T>({ url, method: 'POST', data, headers, client });
    },

    put<T>(url: string, data: any, headers?: any, client: 'axios' | 'fetch' = 'axios'): Promise<T> {
        return this.request<T>({ url, method: 'PUT', data, headers, client });
    },

    delete<T>(url: string, headers?: any, client: 'axios' | 'fetch' = 'axios'): Promise<T> {
        return this.request<T>({ url, method: 'DELETE', headers, client });
    },
};

export default httpRequestService;
