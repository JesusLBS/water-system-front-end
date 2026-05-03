import { IndexQueryParams } from "../../../../interfaces/shared/index-params.interface";
import httpRequestService from "../../../../shared/services/api/httpRequestService";
import { ApiResponse } from "../../../../interfaces/shared/api-response.interface";
import { WaterLineResponse, WaterTakeByLineResponse } from "../interfaces/water-line";
import { ActionsPayload } from "../../../../interfaces/shared/actions.interface";
import { assertResponseData } from "../../../../utils/assertResponseData";
import { WaterLinePayload } from "../interfaces/payload.interface";

class WaterLineService {
    private url: string;
    private resource: string = 'admin/water-lines';

    constructor() {
        this.url = `${import.meta.env.VITE_APP_API_URL}${this.resource}`;
    }

    async index(params: IndexQueryParams = {}): Promise<WaterLineResponse> {
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

        const response = await httpRequestService.get<WaterLineResponse>(endpoint);

        return assertResponseData(response.data, 'WaterLine.index');
    }

    async store(payload: WaterLinePayload): Promise<ApiResponse> {
        const response = await httpRequestService.post<ApiResponse>(
            this.url,
            payload
        );

        return assertResponseData(response.data, 'WaterLine.store');
    }

    async update(payload: WaterLinePayload): Promise<ApiResponse> {
        const response = await httpRequestService.put<ApiResponse>(
            this.url,
            payload
        );

        return assertResponseData(response.data, 'WaterLine.update');
    }

    async deactivate(payload: ActionsPayload): Promise<boolean> {
        const endpoint = `${this.url}/${payload.dataId}/deactivate`;

        const response = await httpRequestService.post<null>(
            endpoint,
            payload
        );

        return response.status === 200;
    }

    async activate(payload: ActionsPayload): Promise<boolean> {
        const endpoint = `${this.url}/${payload.dataId}/activate`;

        const response = await httpRequestService.post<null>(
            endpoint,
            payload
        );

        return response.status === 200;
    }

    async waterTakeByLine(id: number): Promise<WaterTakeByLineResponse> {
        const endpoint = `${this.url}/${id}/water-takes`;

        const response = await httpRequestService.get<WaterTakeByLineResponse>(endpoint);

        return assertResponseData(response.data, 'WaterLine.waterTakeByLine');
    }
}

export const waterLineService = new WaterLineService();
export default waterLineService;