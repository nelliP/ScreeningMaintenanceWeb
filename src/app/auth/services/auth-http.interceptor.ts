import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { take, switchMap } from 'rxjs/operators';

import { AuthService } from './../services/auth.service';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
    constructor (private authService: AuthService) { }

    intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this.getToken();

        if (token != null) {
            const authReq = req.clone({
                headers: req.headers.set('Authorization', token)
            });
        
            return next.handle(authReq);
        }

        return next.handle(req);
    }

    private getToken(): string {
        let token: string;

        this.authService
            .getUserFromStore()
            .pipe(take(1))
            .subscribe((u) => { 
                if (u != null) {
                    token = u.token_type + " " + u.access_token
                }
            });

        return token;
    }
}
