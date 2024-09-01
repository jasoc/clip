import { CookieService } from 'ngx-cookie-service';
import { firstValueFrom } from 'rxjs';

import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { environment } from '../../environments/environment';

interface HttpBody<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable()
export class BackendService {
  private baseUrl: string;

  private headers: {
    [header: string]: string;
  } = {
    Authorization: `Bearer ${this.cookieService.get('token')}`,
  };

  constructor(
    @Inject(PLATFORM_ID)
    private platformId: object,
    protected httpClient: HttpClient,
    protected cookieService: CookieService
  ) {
    this.baseUrl = this.resolveOrigin(environment.apiBaseurl);
    if (!this.baseUrl.endsWith('/')) {
      this.baseUrl = this.baseUrl + '/';
    }
  }

  private async sendRequest<ReturnType>(
    method: string,
    relativeUrl: string,
    body: any = null,
    params?: any,
    callback: (response: HttpResponse<HttpBody<ReturnType>>) => void = () => {}
  ): Promise<HttpResponse<HttpBody<ReturnType>>> {
    if (relativeUrl.startsWith('/')) {
      relativeUrl = relativeUrl.slice(1);
    }
    if (['GET', 'DELETE'].indexOf(method) >= 0 && !relativeUrl.endsWith('/')) {
      relativeUrl += '/';
    }

    let httpPar = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        httpPar = httpPar.append(key, params[key]);
      });
    }

    const response = await firstValueFrom(
      this.httpClient.request<HttpBody<ReturnType>>(method, this.baseUrl + relativeUrl, {
        body,
        params: httpPar,
        observe: 'response',
        headers: this.headers,
      })
    );
    callback(response);
    return response;
  }

  public async post<ReturnType>(
    relativeUrl: string,
    body: any,
    callback?: (response: HttpResponse<HttpBody<ReturnType>>) => void
  ): Promise<HttpResponse<HttpBody<ReturnType>>> {
    return this.sendRequest('POST', relativeUrl, body, null, callback);
  }

  public async get<ReturnType>(
    relativeUrl: string,
    params?: any,
    callback?: (response: HttpResponse<HttpBody<ReturnType>>) => void
  ): Promise<HttpResponse<HttpBody<ReturnType>>> {
    return this.sendRequest('GET', relativeUrl, null, params, callback);
  }

  public async put<ReturnType>(
    relativeUrl: string,
    body: any,
    callback?: (response: HttpResponse<HttpBody<ReturnType>>) => void
  ): Promise<HttpResponse<HttpBody<ReturnType>>> {
    return this.sendRequest('PUT', relativeUrl, body, null, callback);
  }

  public async delete<ReturnType>(
    relativeUrl: string,
    callback?: (response: HttpResponse<HttpBody<ReturnType>>) => void
  ): Promise<HttpResponse<HttpBody<ReturnType>>> {
    return this.sendRequest('DELETE', relativeUrl, null, null, callback);
  }

  public async patch<ReturnType>(
    relativeUrl: string,
    body: any,
    callback?: (response: HttpResponse<HttpBody<ReturnType>>) => void
  ): Promise<HttpResponse<HttpBody<ReturnType>>> {
    return this.sendRequest('PATCH', relativeUrl, body, null, callback);
  }

  private resolveOrigin(baseUrl: string): string {
    return baseUrl.replaceAll('{origin}', isPlatformBrowser(this.platformId) ? location?.origin : '');
  }
}
