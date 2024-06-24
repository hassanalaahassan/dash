import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.includes('authorities')||request.url.includes('admin')||request.url.includes('user')||request.url.includes('emergency/getAll')){
      const newRequest=request.clone({
        headers:request.headers.append('Authorization','Bearer'+" "+localStorage.getItem('token')!)
      })

      return next.handle(newRequest);

    }
    else
    {
      return next.handle(request)
    }

  }
}
