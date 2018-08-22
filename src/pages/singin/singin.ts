import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SinupPage } from '../sinup/sinup';
/**
 * Generated class for the SinginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-singin',
  templateUrl: 'singin.html',
})
export class SinginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goSingup(){
     this.navCtrl.push(SinupPage);
  }


}
