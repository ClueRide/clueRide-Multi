import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {AwaitRegistrationService} from '../../auth/client-api/await-registration.service';

@Injectable({
  providedIn: 'root'
})
export class RangerSessionGuard implements CanActivate {

  constructor(
    private awaitRegistrationService: AwaitRegistrationService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.awaitRegistrationService.getRegistrationActiveObservable('com.clueride.ranger');
  }

}
