import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth.interceptor';
import { LoaderInterceptor } from '../loader.interceptor';
import { ErrorInterceptor } from '../error.interceptor';
// import { ToastrModule, ToastrService } from 'ngx-toastr';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    // ToastrModule,
    // ToastrService
  ],
  providers:[{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  },
  {
    provide:HTTP_INTERCEPTORS,
    useClass:LoaderInterceptor,
    multi:true
  },
  {
    provide:HTTP_INTERCEPTORS,
    useClass:ErrorInterceptor,
    multi:true
  }
]
})
export class MyInterceptorsModule { }
