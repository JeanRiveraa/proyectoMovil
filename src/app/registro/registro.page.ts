import { Component } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: 'registro.page.html',
  styleUrls: ['registro.page.scss'],
})
export class RegistroPage {
  nombre: string = '';
  apellido: string = '';
  rut: string = '';
  email: string = '';
  password: string = '';
  verificacion: string = '';
  errorMessage: string = ''; 

  constructor(private router: Router) {}

  async registrar() {
    try {
      if (this.password === this.verificacion) {
        const auth = getAuth();
        const resultado = await createUserWithEmailAndPassword(auth, this.email, this.password);
        console.log('Usuario registrado:', resultado);

        // Limpiar el mensaje de error si el registro es exitoso
        this.errorMessage = '';
      } else {
        console.log('Las contraseñas no coinciden');
        this.errorMessage = 'Las contraseñas no coinciden';
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      this.errorMessage = 'Error al registrar. Por favor, inténtalo de nuevo.';
    }
  }

  ngOnInit() {
  }
  ingresar(){
    if (this.password.length < 8) {
      alert('La contraseña debe tener al menos 8 caracteres');
      return;
    }    let navigationExtras: NavigationExtras = {
      
    };
    this.router.navigate(['/login'],navigationExtras);
  }
}
