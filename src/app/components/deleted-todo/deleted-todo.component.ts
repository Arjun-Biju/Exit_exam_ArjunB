import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-deleted-todo',
  templateUrl: './deleted-todo.component.html',
  styleUrls: ['./deleted-todo.component.scss']
})
export class DeletedTodoComponent implements OnInit{
 todos: Todo[] = [];

 constructor(private todoServices: TodoService){}

 ngOnInit(): void {
   this.getAllDeletedTodos();
 }

 getAllDeletedTodos(){
  this.todoServices.getAllDeletedTodos()
  .subscribe({
   next: (res) => {
     this.todos = res;
   } 
  });
 }

 undoDeleteTodo(id: string, todo: Todo){
  this.todoServices.undoDeleteTodo(id, todo)
  .subscribe({
    next: (res) => {
      this.getAllDeletedTodos()
    }
  })
 }
}
