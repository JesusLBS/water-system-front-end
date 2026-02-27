import httpRequestService from "../../../../shared/services/api/httpRequestService";

interface AssignWaterTakePayload {
    uid: string;
    waterLineId: number;
}

class WaterTakeService {
    private url: string;
    private resource: string = "admin/water-takes";

    constructor() {
        this.url = `${import.meta.env.VITE_APP_API_URL}${this.resource}`;
    }

    async assign(payload: AssignWaterTakePayload): Promise<void> {
        const endpoint = `${this.url}`;

        await httpRequestService.post(endpoint, payload);
    }

    async deactivate(id: number): Promise<void> {
        const endpoint = `${this.url}/${id}/deactivate`;

        await httpRequestService.patch(endpoint);
    }

    async restore(id: number): Promise<void> {
        const endpoint = `${this.url}/${id}/restore`;

        await httpRequestService.patch(endpoint);
    }
}

export const waterTakeService = new WaterTakeService();
export default waterTakeService;