import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth-service';
import { SinupPage } from '../sinup/sinup';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-singin',
  templateUrl: 'singin.html',
})

export class SinginPage {
  loginForm: FormGroup;
  loginError: string;

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private toastCtrl: ToastController,
    fb: FormBuilder
  ) {
    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  login() {
    let data = this.loginForm.value;

    if (!data.email) {
      return;
    }

    let credentials = {
      email: data.email,
      password: data.password
    };
    let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });


    this.authService.signInWithEmail(credentials)
      .then(() => {
        toast.setMessage('Usuário logado com sucesso.');
        toast.present();
        this.navCtrl.setRoot(HomePage);
      })
      .catch((error: any) => {
         if (error.code == 'auth/user-not-found') {
          toast.setMessage('O e-mail digitado não é valido.');
        } else if (error.code == 'auth/wrong-password') {
          toast.setMessage('A senha digitada não é válida.');
        }
        toast.present();
      });
  }
  signup() {
    this.navCtrl.push(SinupPage);
  }

  forgot() {
    this.navCtrl.push(SinupPage);
  }


}
