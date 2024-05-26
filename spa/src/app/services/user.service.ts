import { Injectable } from "@angular/core";
import { BackendService } from "./backend.service";

interface RegisterModelPost {
    username: string;
    password: string;
    email: string;
    name: string;
    surname: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService extends BackendService {

    async RegisterUser(userInfo: RegisterModelPost): Promise<boolean> {
        let res = await this.post('/user/register', userInfo);
        console.log(res)
        if (res.status === 201) {
            return await this.LoginUser(userInfo.username, userInfo.password);
        }
        return false;
    }

    userLogged(): boolean {
        return this.cookieService.get("token") != '';
    }

    async LoginUser(username: string, password: string) {
        let res = await this.post<{ access_token: string }>('/user/login', {
            'username': username,
            'password': password,
        });
        if (res.status != 200) {
            return false;
        }
        this.cookieService.set("token", res.body!.data.access_token);
        return true;
    }
}
