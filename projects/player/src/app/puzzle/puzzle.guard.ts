import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {LoadStateService} from 'cr-lib';

@Injectable({
  providedIn: 'root'
})
export class PuzzleGuard implements CanActivate {

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
