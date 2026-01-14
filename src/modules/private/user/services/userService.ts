
import httpRequestService from "../../../../shared/services/api/httpRequestService";
import { Root } from "../interfaces/user.interface";

export default class UserService {
    private url: string;
    private resource: string = 'admin/user/';

    constructor() {
        this.url = `${import.meta.env.VITE_APP_API_URL}${this.resource}`;
    }
    async index(params: any) {
        const { limit, page, sort, direction, withTrashed, search=null } = params;
        const scope = `${this.url}${limit}/${page}/${sort}/${direction}/${withTrashed}/${search}`;
        console.log(scope)
        return httpRequestService.get<Root>(scope, null);
    }
};