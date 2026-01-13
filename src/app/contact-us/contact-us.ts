import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './contact-us.html',
  styleUrls: ['./contact-us.css']
})
export class ContactUsComponent {
  name = '';
  email = '';
  phone = '';
  message = '';

  successMessageShown = false;
  errorMessageShown = false;

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.errorMessageShown = true;
      this.successMessageShown = false;
      setTimeout(() => {
        this.errorMessageShown = false;
      }, 2000);
      return;
    }

    const templateParams = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      message: this.message
    };

    emailjs
      .send(
        'service_5b9byal',
        'template_xondr1u',
        templateParams,
        'QOWpYleieUrNbDK7I'
      )
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);

          this.successMessageShown = true;
          this.errorMessageShown = false;

          this.name = '';
          this.email = '';
          this.phone = '';
          this.message = '';

          form.resetForm();

          setTimeout(() => {
            this.successMessageShown = false;
          }, 15000);
        },
        (error) => {
          console.error('FAILED...', error);
          this.successMessageShown = false;
          this.errorMessageShown = true;

          setTimeout(() => {
            this.errorMessageShown = false;
          }, 15000);
        }
      );
  }
}
