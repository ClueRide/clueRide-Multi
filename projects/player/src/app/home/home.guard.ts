import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {AwaitRegistrationService} from 'cr-lib';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements  CanActivate {

  constructor(
    private awaitRegistrationService: AwaitRegistrationService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.awaitRegistrationService.getRegistrationActiveObservable('com.clueride.player');
  }

}
