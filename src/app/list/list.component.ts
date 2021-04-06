import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Store } from '@ngrx/store';
import { ITodoListModel } from '../store/todo.reducer';
import { DoneTodo } from '../store/todo.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  todoList$: Observable<ITodoListModel>;

  constructor(
    private todoService: TodoService,
    private store: Store<{ TodoList: ITodoListModel }>
  ) {}

  ngOnInit(): void {
    this.todoList$ = this.store.select('TodoList');
  }

  onDone(index: number): void {
    this.store.dispatch(new DoneTodo(index));
    // this.todoService.todoList[index].isDone = true;
  }
}
