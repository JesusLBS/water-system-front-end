import { OptionsResponse } from "../../../interfaces/shared/options.interface";
import httpRequestService from "../api/httpRequestService";

class OptionsService {
    private url: string;
    private resource: string = 'admin/';

    constructor() {
        this.url = `${import.meta.env.VITE_APP_API_URL}${this.resource}`;
    }

    async waterLines(): Promise<OptionsResponse> {
        const endpoint = `${this.url}water-lines/options`;

        const response = await httpRequestService.get<OptionsResponse>(endpoint);

        if (!response.data) {
            throw new Error('Response missing data');
        }
        return response.data;
    }
}

export const optionsService = new OptionsService();