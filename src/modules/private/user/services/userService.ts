import { IndexQueryParams } from "../../../../interfaces/shared/index-params.interface";
import httpRequestService from "../../../../shared/services/api/httpRequestService";
import { UsersResponse } from "../interfaces/user.interface";
import { ApiResponse } from "../../../../interfaces/shared/api-response.interface";
import { ActionsUerPayload, CreateUserPayload } from "../interfaces/create-user.interface";

export default class UserService {
    private url: string;
    private resource: string = 'admin/users';

    constructor() {
        this.url = `${import.meta.env.VITE_APP_API_URL}${this.resource}`;
    }

    async index(params: IndexQueryParams = {}): Promise<UsersResponse> {
        const {
            limit = 10,
            page = 1,
            sort = 'id',
            direction = 'asc',
            withTrashed = 'active',
            search,
        } = params;

        const queryParams: Record<string, string> = {
            limit: limit.toString(),
            page: page.toString(),
            sort,
            direction,
            withTrashed,
        };

        if (search) {
            queryParams.search = search;
        }

        const query = new URLSearchParams(queryParams).toString();
        const endpoint = `${this.url}?${query}`;

        const response = await httpRequestService.get<UsersResponse>(endpoint);

         if (!response.data) {
            throw new Error('Login response missing data');
        }
        return response.data;
    }

    async store(payload: CreateUserPayload): Promise<ApiResponse> {
        const response = await httpRequestService.post<ApiResponse>(
            this.url,
            payload
        );

        if (!response.data) {
            throw new Error('Login response missing data');
        }
        return response.data;
    }

    async update(payload: CreateUserPayload): Promise<ApiResponse> {
        const response = await httpRequestService.put<ApiResponse>(
            this.url,
            payload
        );

         if (!response.data) {
            throw new Error('Login response missing data');
        }
        return response.data;
    }

    async deactivate(payload: ActionsUerPayload): Promise<boolean> {
        const endpoint = `${this.url}/deactivate`;

        const response = await httpRequestService.post<null>(
            endpoint,
            payload
        );

        return response.status === 200 || response.status === 201;
    }

    async activate(payload: ActionsUerPayload): Promise<boolean> {
        const endpoint = `${this.url}/activate`;

        const response = await httpRequestService.post<null>(
            endpoint,
            payload
        );

        return response.status === 200 || response.status === 201;
    }

    async delete(payload: ActionsUerPayload): Promise<boolean> {
        const endpoint = `${this.url}/${payload.dataId}`;

        const response = await httpRequestService.delete<void>(endpoint);

        return response.status === 204;
    }
}