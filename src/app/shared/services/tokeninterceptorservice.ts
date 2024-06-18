import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class Tokeninterceptorservice implements HttpInterceptor {

  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string | null = localStorage.getItem('token');

    let tokenWithoutQuotes: string | null = null;
    if (token !== null) {
      tokenWithoutQuotes = `Bearer ${token.replace(/"/g, '')}`;
    }

    if (tokenWithoutQuotes) {
      const modifiedRequest = request.clone({
        setHeaders: {
          Authorization: tokenWithoutQuotes
        }
      });

      return next.handle(modifiedRequest);
    } else {
      return next.handle(request);
    }
  }

}
