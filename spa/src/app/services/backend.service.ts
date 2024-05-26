import { HttpClient, HttpResponse } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { environment } from '../../environments/environment';
import { CookieService } from "ngx-cookie-service";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

interface HttpBody<T> {
    success: boolean;
    message: string;
    data: T;
}

@Injectable()
export class BackendService {

    private baseUrl: string;

    private headers: { [header: string]: string } = {
        'Authorization': `Bearer ${this.cookieService.get('token')}`
    };

    constructor(@Inject(PLATFORM_ID) private platformId: Object, protected httpClient: HttpClient, protected cookieService: CookieService) {
        this.baseUrl = this.resolveOrigin(environment.apiBaseurl);
        if (!this.baseUrl.endsWith('/')) {
            this.baseUrl = this.baseUrl + '/';
        }
    }

    public async post<ReturnType>(relativeUrl: string, body: any, callback: (response: HttpResponse<HttpBody<ReturnType>>) => void = () => {}): Promise<HttpResponse<HttpBody<ReturnType>>> {
        if (relativeUrl.startsWith('/')) {
            relativeUrl = relativeUrl.slice(1);
        }
        let response = await firstValueFrom(
            this.httpClient.post<HttpBody<ReturnType>>(this.baseUrl + relativeUrl, body,
                { observe: 'response', headers: this.headers })
        );
        callback(response);
        return response;
    }

    public async get<ReturnType>(relativeUrl: string, callback: (response: HttpResponse<HttpBody<ReturnType>>) => void = () => {}): Promise<HttpResponse<HttpBody<ReturnType>>> {
        if (relativeUrl.startsWith('/')) {
            relativeUrl = relativeUrl.slice(1);
        }
        if (!relativeUrl.endsWith('/')) {
            relativeUrl = relativeUrl + '/';
        }
        let response = await firstValueFrom(
            this.httpClient.get<HttpBody<ReturnType>>(this.baseUrl + relativeUrl,
                { observe: 'response', headers: this.headers })
        );
        callback(response);
        return response;
    }

    private resolveOrigin(baseUrl: string): string {
        return baseUrl.replaceAll("{origin}", isPlatformBrowser(this.platformId) ? location?.origin : '');
    }
}
