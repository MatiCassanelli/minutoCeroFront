import 'rxjs/add/operator/do';
import { Injectable} from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse} from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthService} from "./auth.service";
import { Observable} from "rxjs/Observable";


@Injectable()
export class RequestInterceptor implements HttpInterceptor{

  constructor(private router: Router, private authService: AuthService){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    return next.handle(request).do((event: HttpEvent<any>) => {
      if(event instanceof HttpResponse){}
    }, (err: any) => {
      debugger;
      if(err instanceof HttpErrorResponse){
        if(err.status === 401){
          if(this.authService.isLoggedIn())
            this.authService.logOut();
          this.router.navigate(['login']);
        }
      }
    })
  }
}
