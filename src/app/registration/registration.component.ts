import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html', // Path to the HTML template
  styleUrls: ['./registration.component.css'] // Path to the CSS styles
})
export class RegistrationComponent {
  onSubmit() {
    // Handle the registration logic here
    console.log('Form submitted');
  }
}