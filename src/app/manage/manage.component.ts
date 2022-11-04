import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { TodoService } from '../todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TodoList } from '../todo.model';
import { Store } from '@ngrx/store';
import { ITodoListModel } from '../store/todo.reducer';
import { Observable, Subscription } from 'rxjs';
import {
  AddTodo,
  EditTodo,
  DeleteTodo,
  StartEditTodo,
  IToDo,
} from '../store/todo.actions';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit, OnDestroy {
  isEdit = false;
  // editIndex: number = null;
  todoList$: Observable<ITodoListModel>;
  listSubscription: Subscription;

  todoForm = new FormGroup({
    title: new FormControl<string | null>(null, Validators.required),
    comment: new FormControl<string | null>(null, Validators.required),
  });

  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;

  constructor(
    private todoService: TodoService,
    private snackBar: MatSnackBar,
    private store: Store<{ TodoList: ITodoListModel }>
  ) {}

  ngOnInit(): void {
    this.todoList$ = this.store.select('TodoList');

    this.listSubscription = this.store.select('TodoList').subscribe((data) => {
      if (data.editState) {
        const { title, comment } = data.data[data.editIndex];
        this.onEdit({ title, comment });
      }
    });
  }

  onSubmit(): void {
    if (this.todoForm.valid) {
      const { title, comment } = this.todoForm.value;
      if (this.isEdit) {
        // this.todoService.todoList[this.editIndex].title = title;
        // this.todoService.todoList[this.editIndex].comment = comment;
        this.store.dispatch(new EditTodo({ title, comment }));
      } else {
        // this.todoService.todoList.push(new TodoList(title, comment));
        this.store.dispatch(new AddTodo({ title, comment }));
      }
      this.snackBar.open(
        `${this.isEdit ? 'Edited' : 'Added'} successfully`,
        '',
        { duration: 2000 }
      );
      this.isEdit = false;
      // this.editIndex = null;
      this.todoForm.reset();
      this.formDirective.resetForm();
    }
  }

  onEdit(payload: IToDo): void {
    this.isEdit = true;
    const { title, comment } = payload;
    this.todoForm.setValue({
      title,
      comment,
    });
  }

  doEdit(index: number): void {
    // this.isEdit = true;
    // this.editIndex = index;
    // const { title, comment } = this.todoService.todoList[index];
    // this.todoForm.setValue({
    //   title,
    //   comment
    // });
    this.store.dispatch(new StartEditTodo(index));
  }

  doDelete(index: number): void {
    // this.todoService.todoList.splice(index, 1);
    this.store.dispatch(new DeleteTodo(index));
    this.snackBar.open(`Deleted successfully`, '', { duration: 2000 });
  }

  ngOnDestroy(): void {
    this.listSubscription.unsubscribe();
  }
}
