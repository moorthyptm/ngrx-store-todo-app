import { Injectable } from '@angular/core';
import { TodoList } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todoList: Array<TodoList> = [];

  constructor() { }
}
