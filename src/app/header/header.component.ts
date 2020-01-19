import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoService } from '../todo.service';
import { ITodoListModel } from '../store/todo.reducer';
import { Store } from '@ngrx/store';
import { TodoList } from '../todo.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  todoList: ITodoListModel;
  listSubscription: Subscription;


  constructor(private todoService: TodoService, private store: Store<{ TodoList: ITodoListModel }>) { }
  ngOnInit() {
    this.listSubscription = this.store.select('TodoList').subscribe(data => this.todoList = data);
  }

  public getTodoLength = (): number => this.todoList.data.reduce((ac: any, list) => ac + (list.isDone ? 0 : 1), 0);

  ngOnDestroy() {
    this.listSubscription.unsubscribe();
  }
}
