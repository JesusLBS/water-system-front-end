import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type HttpClient = 'axios' | 'fetch';

interface RequestOptions {
    url: string;
    method?: HttpMethod;
    data?: any;
    headers?: Record<string, string>;
    client?: HttpClient;
}

export interface HttpResponse<T = unknown> {
    data?: T;
    status: number;
}

const apiKey = import.meta.env.VITE_APP_API_KEY;

const httpRequestService = {
    async request<T>({
        url,
        method = 'GET',
        data,
        headers,
        client = 'axios',
    }: RequestOptions): Promise<HttpResponse<T>> {
        const token = localStorage.getItem('x-token');

        const updatedHeaders: Record<string, string> = {
            'x-api-key': apiKey ?? '',
            ...headers,
        };

        if (token) {
            updatedHeaders.Authorization = `Bearer ${token}`;
        }

        if (client === 'axios') {
            return this.axiosRequest<T>({ url, method, data, headers: updatedHeaders });
        }

        return this.fetchRequest<T>({ url, method, data, headers: updatedHeaders });
    },

    async axiosRequest<T>({
        url,
        method,
        data,
        headers,
    }: RequestOptions): Promise<HttpResponse<T>> {
        try {
            const config: AxiosRequestConfig = {
                url,
                method,
                headers,
                data,
            };

            const response: AxiosResponse<T> = await axios(config);

            return {
                status: response.status,
                ...(response.data !== undefined && { data: response.data }),
            };
        } catch (error) {
            console.error('Axios Request Error:', error);
            throw error;
        }
    },

    async fetchRequest<T>({
        url,
        method,
        data,
        headers,
    }: RequestOptions): Promise<HttpResponse<T>> {
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers,
                },
                body:
                    method !== 'GET' && data !== undefined
                        ? JSON.stringify(data)
                        : undefined,
            });

            if (!response.ok) {
                const text = await response.text().catch(() => '');
                throw new Error(
                    `Fetch error: ${response.status} ${response.statusText} ${text}`
                );
            }

            // 204 No Content → no data
            if (response.status === 204) {
                return {
                    status: 204,
                };
            }

            // Some APIs return 200 with empty body
            const text = await response.text();

            if (!text) {
                return {
                    status: response.status,
                };
            }

            const result = JSON.parse(text) as T;

            return {
                data: result,
                status: response.status,
            };
        } catch (error) {
            console.error('Fetch Request Error:', error);
            throw error;
        }
    },

    get<T>(
        url: string,
        headers?: Record<string, string>,
        client: HttpClient = 'axios'
    ): Promise<HttpResponse<T>> {
        return this.request<T>({ url, method: 'GET', headers, client });
    },

    post<T>(
        url: string,
        data: any,
        headers?: Record<string, string>,
        client: HttpClient = 'axios'
    ): Promise<HttpResponse<T>> {
        return this.request<T>({ url, method: 'POST', data, headers, client });
    },

    put<T>(
        url: string,
        data: any,
        headers?: Record<string, string>,
        client: HttpClient = 'axios'
    ): Promise<HttpResponse<T>> {
        return this.request<T>({ url, method: 'PUT', data, headers, client });
    },

    delete<T>(
        url: string,
        headers?: Record<string, string>,
        client: HttpClient = 'axios'
    ): Promise<HttpResponse<T>> {
        return this.request<T>({ url, method: 'DELETE', headers, client });
    },
};

export default httpRequestService;