import { IndexQueryParams } from "../../../../interfaces/shared/index-params.interface";
import httpRequestService from "../../../../shared/services/api/httpRequestService";
import { ApiResponse } from "../../../../interfaces/shared/api-response.interface";
import { SociosResponse } from "../interfaces/socio.interface";
import { ActionsPayload } from "../../../../interfaces/shared/actions.interface";
import { PayloadRoot } from "../interfaces/payload.interface";

export default class SocioService {
    private url: string;
    private resource: string = 'admin/socios';

    constructor() {
        this.url = `${import.meta.env.VITE_APP_API_URL}${this.resource}`;
    }

    async index(params: IndexQueryParams = {}): Promise<SociosResponse> {
        const {
            limit = 10,
            page = 1,
            sort = 'updatedAt',
            direction = 'DESC',
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

        const response = await httpRequestService.get<SociosResponse>(endpoint);

        if (!response.data) {
            throw new Error('Login response missing data');
        }
        return response.data;
    }

    async store(payload: PayloadRoot): Promise<ApiResponse> {
        const response = await httpRequestService.post<ApiResponse>(
            this.url,
            payload
        );

        if (!response.data) {
            throw new Error('Response missing data');
        }
        return response.data;
    }

    async update(payload: PayloadRoot): Promise<ApiResponse> {
        const response = await httpRequestService.put<ApiResponse>(
            this.url,
            payload
        );

        if (!response.data) {
            throw new Error('Response missing data');
        }
        return response.data;
    }

    async deactivate(payload: ActionsPayload): Promise<boolean> {
        const endpoint = `${this.url}/deactivate`;

        const response = await httpRequestService.post<null>(
            endpoint,
            payload
        );

        return response.status === 200;
    }

    async activate(payload: ActionsPayload): Promise<boolean> {
        const endpoint = `${this.url}/restore`;

        const response = await httpRequestService.post<null>(
            endpoint,
            payload
        );

        return response.status === 200;
    }

    async delete(payload: ActionsPayload): Promise<boolean> {
        const endpoint = `${this.url}/${payload.dataId}`;

        const response = await httpRequestService.delete<void>(endpoint);

        return response.status === 204;
    }
}