import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class Tokeninterceptorservice implements HttpInterceptor {

  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      const modifiedRequest = request.clone({
        setHeaders: {
          Authorization: token
        }
      });

      return next.handle(modifiedRequest);
    } else {
      return next.handle(request);
    }
  }

}
