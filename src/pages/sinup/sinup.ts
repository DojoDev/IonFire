import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user.model';
import { AuthService } from '../../providers/auth/auth-service';
import { HomePage } from '../home/home';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-sinup',
  templateUrl: 'sinup.html',
})
export class SinupPage {
  user: User = new User();
  @ViewChild('form') form: NgForm;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private authService: AuthService) {
  }

  createAccount() {
    console.log("Entrei")
    if (this.form.form.valid) {
      console.log("Entrei 2")
    
      let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });

       this.authService.createUser(this.user)
        .then(() => {
          console.log("Cheguei aqui 0");
          var user = firebase.auth().currentUser;
          user.sendEmailVerification();
          console.log("Cheguei aqui 1");
          toast.setMessage('Usuário criado com sucesso.');
          toast.present();
          console.log("Cheguei aqui 3");
          this.navCtrl.setRoot(HomePage);
        })
        .catch((error: any) => {
          if (error.code  == 'auth/email-already-in-use') {
            toast.setMessage('O e-mail digitado já está em uso.');
          } else if (error.code  == 'auth/invalid-email') {
            toast.setMessage('O e-mail digitado não é valido.');
          } else if (error.code  == 'auth/operation-not-allowed') {
            toast.setMessage('Não está habilitado criar usuários.');
          } else if (error.code  == 'auth/weak-password') {
            toast.setMessage('A senha digitada é muito fraca.');
          }
          toast.present();
        });
    }
  }

}