import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoService } from '../todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TodoList } from '../todo.model';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  isEdit = false;
  editIndex: number = null;

  todoForm: FormGroup = new FormGroup(
    {
      title: new FormControl(null, Validators.required),
      comment: new FormControl(null, Validators.required)
    }
  );

  constructor(private todoService: TodoService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onSubmit(): void {
    if (this.todoForm.valid) {
      const { title, comment } = this.todoForm.value;
      if (this.isEdit) {
        this.todoService.todoList[this.editIndex].title = title;
        this.todoService.todoList[this.editIndex].comment = comment;
      } else {
        this.todoService.todoList.push(new TodoList(title, comment));
      }
      this.snackBar.open(`${this.isEdit ? 'Edited' : 'Added'} successfully`, '', { duration: 2000 });
      this.isEdit = false;
      this.editIndex = null;
      this.todoForm.reset();
    }
  }

  doEdit(index: number): void {
    this.isEdit = true;
    this.editIndex = index;
    const { title, comment } = this.todoService.todoList[index];
    this.todoForm.setValue({
      title,
      comment
    });
  }

  doDelete(index: number): void {
    this.todoService.todoList.splice(index, 1);
    this.snackBar.open(`Deleted successfully`, '', { duration: 2000 });
  }

}
