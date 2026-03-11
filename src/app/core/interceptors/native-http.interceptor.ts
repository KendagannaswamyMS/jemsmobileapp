import { Injectable } from '@angular/core';
import {
  HttpRequest, HttpHandler, HttpEvent, HttpInterceptor,
  HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Capacitor, CapacitorHttp } from '@capacitor/core';

@Injectable()
export class NativeHttpInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!Capacitor.isNativePlatform()) {
      return next.handle(request);
    }
    return from(this.doNativeRequest(request)).pipe(
      catchError(err => throwError(() => err))
    );
  }

  private async doNativeRequest(request: HttpRequest<any>): Promise<HttpResponse<any>> {
    const method = request.method.toUpperCase();
    const url    = request.urlWithParams;

    // Build headers
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    request.headers.keys().forEach(key => {
      const val = request.headers.get(key);
      if (val != null) headers[key] = val;
    });

    const options: any = { url, headers, responseType: 'json' };

    if (method !== 'GET' && request.body != null) {
      options.data = request.body;
    }

    let response: any;
    try {
      switch (method) {
        case 'POST':   response = await CapacitorHttp.post(options);   break;
        case 'PUT':    response = await CapacitorHttp.put(options);    break;
        case 'PATCH':  response = await CapacitorHttp.patch(options);  break;
        case 'DELETE': response = await CapacitorHttp.delete(options); break;
        default:       response = await CapacitorHttp.get(options);    break;
      }
    } catch (err: any) {
      throw new HttpErrorResponse({
        error: err?.message ?? err,
        status: 0,
        statusText: 'Native HTTP Error',
        url
      });
    }

    let body = response?.data ?? null;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch { /* leave as string */ }
    }

    const status: number = response?.status ?? 0;

    if (status >= 200 && status < 300) {
      return new HttpResponse({ body, status, url });
    }

    throw new HttpErrorResponse({ error: body, status, url });
  }
}
