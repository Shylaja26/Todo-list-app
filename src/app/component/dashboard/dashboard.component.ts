import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  Taskobj : Task = new Task();
  Taskarr : Task[] = [];
addTaskvalue : string  = '';
editTaskvalue : string = '';

constructor(private crudService : CrudService){}

ngOnInit(): void {
  this.Taskobj = new Task();
   this.Taskarr = [];
   this.getAlltask();
   this.editTaskvalue = '';
   this.addTaskvalue = '';
}

 getAlltask(){
  this.crudService.getAllTask().subscribe(res =>{
      this.Taskarr = res;
  })
 }


 addtask(){
   this.Taskobj.taskName = this.addTaskvalue;
  this.crudService.addTask(this.Taskobj).subscribe(res =>{
   console.log(res);
    this.ngOnInit();
    this.addTaskvalue = '';
  })

}

editTask(){
  this.Taskobj.taskName = this.editTaskvalue;
  this.crudService.editTask(this.Taskobj).subscribe(res =>{
    this.ngOnInit()
  })
}

  deletetask(etask:Task){
    this.crudService.deleteTask(etask).subscribe(res =>{
      this.ngOnInit()
    }) 
  }

  call(etask : Task){
   this.Taskobj = etask;
   this.editTaskvalue = etask.taskName;

  }


}


