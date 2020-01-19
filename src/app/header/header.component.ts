import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  public getTodoLength = (): number => this.todoService.todoList.reduce((ac: any, list) => ac + (list.isDone ? 0 : 1), 0);
}
