import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/views/pages/auth/services/auth.service';
import { NOTEFICATIONService } from 'src/app/note/service/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private _Router:Router,
    private _AuthService:AuthService,
    private _note:NOTEFICATIONService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler):Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error:HttpErrorResponse)=>{
        if(error.status === 401||error.status===403){
          this._note.show()
          this._AuthService.refreshToken().subscribe({
            next:(response)=>{
              this._note.hide()
              localStorage.removeItem('token')
              localStorage.setItem('token',response.id_token)
            }
          })
        }
        throw error
      })
    );
  }
}
