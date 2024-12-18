import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage = '';



  constructor(private http: HttpClient, private router: Router) {}

  

  login() {
    this.http.post<any>('http://localhost:5000/login', this.credentials)
      .subscribe(
        response => {
          console.log(response.message);
          this.router.navigate(['/home']);
        },
        error => {
          this.errorMessage = error.error.error;
        }
      );
  }
}
