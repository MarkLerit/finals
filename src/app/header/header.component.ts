import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

constructor(private router: Router) {}

logout(): void {
    // Remove the authentication token from local storage
    localStorage.removeItem('userToken');
    // Navigate to the login page
    this.router.navigate(['/auth']);
 }

}