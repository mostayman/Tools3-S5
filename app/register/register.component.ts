import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = { name: '', email: '', phone: '', password: '' };
  errorMessage = '';

  

  constructor(private http: HttpClient, private router: Router) {}
  
  register() {
    this.http.post<any>('http://localhost:5000/register', this.user)
      .subscribe(
        response => {
          console.log(response.message);
          this.router.navigate(['/login']);
        },
        error => {
          this.errorMessage = error.error.error;
        }
      );
  }
}
