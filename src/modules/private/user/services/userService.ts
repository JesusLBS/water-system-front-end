import { IndexQueryParams } from "../../../../interfaces/shared/index-params.interface";
import httpRequestService from "../../../../shared/services/api/httpRequestService";
import { UsersResponse } from "../interfaces/user.interface";

export default class UserService {
    private url: string;
    private resource: string = 'admin/users';

    constructor() {
        this.url = `${import.meta.env.VITE_APP_API_URL}${this.resource}`;
    }

    async index(params: IndexQueryParams = {}) {
        const {
            limit = 10,
            page = 1,
            sort = 'id',
            direction = 'asc',
            withTrashed = "active",
            search = ''
        } = params;

        const query = new URLSearchParams({
            limit: limit.toString(),
            page: page.toString(),
            sort,
            direction,
            withTrashed,
            search: search || ''
        }).toString();

        const endpoint = `${this.url}?${query}`;

        return httpRequestService.get<UsersResponse>(endpoint, null);
    }
}
