import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  onDone(index: number): void {
    this.todoService.todoList[index].isDone = true;
  }

}
