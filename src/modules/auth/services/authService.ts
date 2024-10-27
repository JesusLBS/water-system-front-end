import { Root } from "../../../interfaces/auth/auth.interface";
import httpRequestService from "../../../shared/services/api/httpRequestService";

export default class AuthService {
    private url: string;
    private resource: string = 'auth/';

    constructor() {
        this.url = `${import.meta.env.VITE_APP_API_URL}${this.resource}`;
    }
    async login(uid: string) {
        const scope = `${this.url}login`
        return httpRequestService.post<Root>(scope, { uid }, {}, 'axios');
    }
};