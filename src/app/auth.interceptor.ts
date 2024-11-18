import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, finalize, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  message : string = ""
  constructor(
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('interceptor called')
    const modifiedReq = request.clone();
    return next.handle(modifiedReq).pipe(
      catchError((err: any) =>  {
        if (err instanceof HttpErrorResponse) {

          if (err.status === 401 ) {
              // Invalidate user session and redirect to login/home
              //this.router.navigateByUrl('/logout');
            this.message= "Session expired! Please log in again!"
            this.openSnackBar()
          }
          else if (err.status===413)
          {
            this.message = "File limit exceeded. Size must be maximum 1mb"
            this.openSnackBar()
          }

        }
        return throwError(err.statusText);

      }),
      finalize(() => {
      })
    )
  }

  
  openSnackBar() {
    this._snackBar.open(this.message, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000,

    });
  }
}
