import { ActionsPayload } from "../../../../../../interfaces/shared/actions.interface";
import { ApiResponse } from "../../../../../../interfaces/shared/api-response.interface";
import { IndexQueryParams } from "../../../../../../interfaces/shared/index-params.interface";
import httpRequestService from "../../../../../../shared/services/api/httpRequestService";
import { DependentDetailResponse, DependentsResponse } from "../interfaces/dependent.interface";

class DependentService {
    private url: string;
    private resource: string = 'admin/socios';

    constructor(
        private socioUid: string,
    ) {
        this.url = `${import.meta.env.VITE_APP_API_URL}${this.resource}/${this.socioUid}/dependents`;
    }

    async index(params: IndexQueryParams = {}): Promise<DependentsResponse> {
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

        const response = await httpRequestService.get<DependentsResponse>(endpoint);

        if (!response.data) {
            throw new Error('Rsponse missing data');
        }
        return response.data;
    }

    async store(payload: object): Promise<ApiResponse> {
        const response = await httpRequestService.post<ApiResponse>(
            this.url,
            payload
        );

        if (!response.data) {
            throw new Error('Response missing data');
        }
        return response.data;
    }

    async edit(dependentId: number): Promise<DependentDetailResponse> {
        const endpoint = `${this.url}/${dependentId}`;

        const response = await httpRequestService.get<DependentDetailResponse>(endpoint);

        if (!response.data) {
            throw new Error('Response missing data');
        }

        return response.data;
    }

    async update(payload: any): Promise<ApiResponse> {

        const endpoint = `${this.url}/${payload.dependentId}`;

        const response = await httpRequestService.patch<ApiResponse>(
            endpoint,
            payload
        );

        if (!response.data) {
            throw new Error('Response missing data');
        }

        return response.data;
    }

    async delete(payload: ActionsPayload): Promise<boolean> {

        const endpoint = `${this.url}/${payload.dataId}`;

        const response = await httpRequestService.delete<void>(endpoint);

        return response.status === 204;
    }
}

export const createDependentService = (socioUid: string) =>
    new DependentService(socioUid);