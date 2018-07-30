import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

/*
  Generated class for the TaskProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TaskProvider {
  private PATH = 'tasks/';

  constructor(private db: AngularFireDatabase) {}

  
  getAll() {
    return this.db.list(this.PATH)
      .snapshotChanges()
      .map(changes => {
        return changes.map(t => ({key: t.payload.key, ...t.payload.val() }));
      })
  }

  get(key: string) {
    return this.db.object(this.PATH + key)
      .snapshotChanges()
      .map(t => {
        return { key: t.key, ...t.payload.val() };
      })
  }
  save(task: any) {
    return new Promise((resolve, reject) => {
      if (task.key) {
        this.db.list(this.PATH)
          .update(task.key,
            { title: task.title, description: task.description })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({
            title: task.title, 
            description: task.description
          }).then(() => resolve());
      }
    })
  }

  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }



  ionViewDidLoad() {
    console.log('Providers TaskPage Working');
  }


}
