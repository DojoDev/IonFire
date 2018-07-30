import { TaskProvider } from './../../providers/task/task';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the TaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage {
  headerTitle: string;
  form: FormGroup;
  task: any;


  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private provider: TaskProvider,
    private toast: ToastController) {

    this.task = this.navParams.data.task || {};
    this.setupPageTitle();
    this.createForm();

  }
  ionViewDidLoad() {
    console.log('Task Page Working');
  }

  private setupPageTitle() {
    this.headerTitle = this.navParams.data.task ? 'Alterando contato' : 'Nova Tarefa';
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.task.key],
      title: [this.task.title, Validators.required],
      description: [this.task.description, Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.provider.save(this.form.value)
        .then(() => {
          console.error('Pop Aqui');
          this.toast.create({ message: 'Contato salvo com sucesso', duration: 3000 }).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao registrar sua tarefa', duration: 3000 }).present();
          console.error('Erro');
          console.error(e);
        });
    }
  }

}
