/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';


@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log(request);
    // const auth0 = ;
    // console.log();
    // console.log(request.url.substring(24, 33)); // Auth0
    switch (request.method) {
      case 'GET': {
        if (request.url.indexOf('coexpancl.us.auth0.com') !== -1) {
          // this.authService.
          this.authService.idTokenClaims$.subscribe((data) => {
            // eslint-disable-next-line no-underscore-dangle
            // console.log(data);
            request = request.clone({
              setHeaders: {
                'Content-Type': 'application/json; charset=UTF-8',
                // Accept: 'application/json',
                // eslint-disable-next-line no-underscore-dangle
                // Authorization: ``
              }
            });
          });
        } else {
          request = request.clone({
            setHeaders: {
              'Content-Type': 'application/json; charset=UTF-8',
              Accept: '*/*',
            },
          });
        }
        break;
      }

      case 'POST': {
        request = request.clone({
          setHeaders: {
            'Content-Type': 'application/json; charset=UTF-8',
            Accept: '*/*',
          },
        });
        break;
      }
    }
    return next.handle(request);
  }


}
