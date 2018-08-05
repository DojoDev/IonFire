import { map } from 'rxjs/operators';
import { Observable } from 'rxjs'; 
import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { TaskProvider } from '../../providers/task/task';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 tasks: Observable<any[]>;

  constructor(
    public navCtrl: NavController, 
    private provider: TaskProvider, 
    private toast: ToastController) {
    this.tasks = this.provider.getAll();
    console.log(this.tasks);
  }

  taskOpen(){
    this.navCtrl.push('TaskPage');
  }

  editTask(task: any){
    this.navCtrl.push('TaskPage', {task: task});
  }

  removeTask(key: string){
    this.provider.remove(key)
    .then(() => {
      this.toast.create({ message: 'Tarefa removido com sucesso', duration: 3000 }).present();
    })
    .catch(() => {
      this.toast.create({ message: 'Erro ao Deletar sua tarefa', duration: 3000 }).present();

    });
  }

}
