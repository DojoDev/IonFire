import { AngularFireDatabase} from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { resolveDefinition } from '../../../node_modules/@angular/core/src/view/util';

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
private PATH ='tasks/';
  constructor(private db: AngularFireDatabase) {}
  getAll(){
    return this.db.list(this.PATH)
    .snapshotChanges()
    .map(changes =>{
      return changes.map(t =>({
        key: t.payload.key,...t.payload.val()
      }));
    })
  }

  get(key: string){
  return this.db.object(this.PATH+key)
  .snapshotChanges()
  .map(t =>{
    return{ key: t.payload.key,...t.payload.val() };
  })
  }
  save(task:any){
    return new Promise((resolve, reject)=>{
      if(task.key){
        this.db.list(this.PATH)
        .update(task.key,
        {title: task.title, description: task.description})
        .then(()=> resolve())
        .catch((e)=> reject(e));
      }else{
        this.db.list(this.PATH)
        .push({title: task.title, description: task.description
        }).then(()=> resolve());
      }
    })
  }

  remove(key:string){

  }
  
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskPage');
  }

}
