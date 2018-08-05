import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


/*
  Generated class for the TaskProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TaskProvider {
  private PATH = 'tasks/';

  constructor(private db: AngularFireDatabase) { }


  getAll() {
    return this.db.list(this.PATH)
      .snapshotChanges()
    .pipe(map(changes => changes
      .map(c => ({ key: c.payload.key, ...c.payload.val() }))));
  }


  get(key: string) {
    return this.db.list(this.PATH + key)
    .snapshotChanges()
    .pipe(map(changes => changes
      .map(c => ({ key: c.payload.key, ...c.payload.val() }))));
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
