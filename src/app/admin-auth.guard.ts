import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private localStorageService: LocalStorageService, private router: Router) {}
  canActivate(): boolean {
    console.log(this.localStorageService.isAdmin())
    if (this.localStorageService.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['/logout']);
      return false;
    }
  }
  
}
