import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model'; // 
import { Router } from '@angular/router';

export interface LoginResponse {
  token: string;
 }


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent{
  isSigningUp: boolean = false; 
  email: string = '';
  password: string = '';
  

  constructor(private http: HttpClient, private router:Router) { }

  ngOnInit(): void {
  }

toggleSigningUp(): void {
  this.isSigningUp = !this.isSigningUp;
}


signUp(): void {
  const userData = {
    email: this.email,
    password: this.password
  };

  // Replace 'http://your-backend-url/signup' with your actual backend sign-up endpoint
  this.http.post('http://localhost:5000/api/signup',userData).subscribe(
    response => {
      console.log('User signed up successfully', response);
      this.isSigningUp = false;
      window.alert('Successfully Signed Up!')
      // Handle success, e.g., show a success message or navigate to another page
    },
    error => {
      console.error('Error signing up', error);
      // Handle error, e.g., show an error message
    }
  );
}

login(): void {
  const userData = {
     email: this.email,
     password: this.password
  };
 
  this.http.post<LoginResponse>('http://localhost:5000/api/login', userData).subscribe(
     (response: LoginResponse) => {
       console.log('User logged in successfully', response);
       localStorage.setItem('userToken', response.token);
       this.router.navigate(['/create'])
       // Log a message to the console after storing the token
       console.log('Token stored in local storage:', response.token);
       // Handle success, e.g., navigate to another page
     },
     error => {
       console.error('Error logging in', error);
       // Handle error, e.g., show an error message
     }
  );
 }


}

