import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model'
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit{
 todos: Todo[] = [];
 newTodo: Todo = {
  id:'',
  description:'',
  createdDate: new Date(),
  isCompleted: false,
  completedDate: new Date(),
  isDeleted: false,
  deletedDate: new Date()
 };

 constructor(private todoService: TodoService){}

 ngOnInit(): void {
    this.getAllTodos();
  }

    getAllTodos(){
      this.todoService.getAllTodos()
    .subscribe({
      next: (todos) => {
        this.todos = todos;
      }
    });
    }

    addTodo(){
      console.log(this.newTodo)
      this.todoService.addTodo(this.newTodo)
       .subscribe({
        next: (todo) => {
          this.getAllTodos();
        }
       });
    }

    onCompletedChange(id: string, todo: Todo){
      todo.isCompleted = !todo.isCompleted;
      this.todoService.updateTodo(id, todo)
       .subscribe({
        next: (response) => {
          this.getAllTodos();
        }
       })
    }

    deleteTodo(id: string){
      this.todoService.deleteTodo(id)
      .subscribe({
        next: (response) => {
          this.getAllTodos();
        }
      })
    }
    filterOptions = 'all'; // Default filter option

    filterTodos() {
      if (this.filterOptions === 'all') {
        this.getAllTodos();
      } else if(this.filterOptions === 'notcompleted'){
        const isNotCompleted = this.filterOptions === 'notcompleted';
        this.todos =  this.todos.filter(todo => todo.isCompleted === isNotCompleted);
      } 
      else {
        const isCompleted = this.filterOptions === 'completed';
        // Filter the todos array based on the selected filter option
        this.todos = this.todos.filter(todo => todo.isCompleted === isCompleted);
      }
 }
}