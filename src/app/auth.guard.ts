import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

export const authGuard: CanActivate = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
 // Check if the user is authenticated
 const isAuthenticated = localStorage.getItem('userToken') !== null;

 if (isAuthenticated) {
    // If authenticated, allow access
    return true;
 } else {
    // If not authenticated, redirect to login page
    // Note: You need to inject Router to use it here
    // This example assumes you have a Router instance available
    // If not, you might need to adjust the implementation to fit your setup
    const router = new Router(); // This line might need adjustment based on your setup
    router.navigate(['/auth']);
    return false;
 }
};