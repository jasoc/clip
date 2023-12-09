import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { catchError, firstValueFrom } from "rxjs";
import { environment } from '../../environments/environment';
import { Injectable } from "@angular/core";

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
export class UserService {

    constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

    async RegisterUser(userInfo: RegisterModelPost): Promise<boolean> {
        let res = await firstValueFrom(this.httpClient.post<HttpResponse<any>>(environment.apiBaseurl + '/user/register', userInfo));
        if (res.status === 201) {
            return await this.LoginUser(userInfo.username, userInfo.password);
        }
        return false;
    }
    
    userLogged(): boolean {
        return this.cookieService.get("token") != '';
    }

    async LoginUser(username: string, password: string) {
        let res: any = await firstValueFrom(
            this.httpClient.post(environment.apiBaseurl + '/user/login', {
                'username': username,
                'password': password,
            }, { observe: 'response' })
        );
        if (res.status != 200) {
            return false;
        }
        this.cookieService.set("token", res.body!.access_token);
        return true;
    }

    async ping() {
        let res = await firstValueFrom(this.httpClient.get<HttpResponse<{pong:String}>>(environment.apiBaseurl + '/user/ping'));
    }
}