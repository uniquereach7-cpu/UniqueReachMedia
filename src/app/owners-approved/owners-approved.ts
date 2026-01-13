import { Component } from '@angular/core';
import emailjs from '@emailjs/browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-owners-approved',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './owners-approved.html',
  styleUrls: ['./owners-approved.css']
})
export class OwnersApprovedComponent {

  sendEmail(form: any): void {
    if (form.valid) {
      emailjs.send(
        'service_5b9byal',       // replace with your EmailJS service ID
        'template_xondr1u',      // replace with your EmailJS template ID
        form.value,
        'QOWpYleieUrNbDK7I'        // replace with your EmailJS public key
      ).then(() => {
        alert('Message sent successfully!');
        form.resetForm();
      }, (error) => {
        console.error('Email send error:', error);
        alert('Failed to send message. Please try again.');
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
