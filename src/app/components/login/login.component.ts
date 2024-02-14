import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
email: string = '';
password: string = ''

login() {
  // Logik um mit Backend zu kommunizieren
}
}
