import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {LoadStateService} from '../state/load/load-state-service.service';

@Injectable({
  providedIn: 'root'
})
export class RollingGuard implements CanActivate {

  constructor(
    private loadStateService: LoadStateService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.loadStateService.getLoadStateObservable();
  }

}
