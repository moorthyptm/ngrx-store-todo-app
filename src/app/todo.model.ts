export class TodoList {
  isDone = false;
  constructor(
    public title: string,
    public comment: string,
    private _addedOn: Date = new Date()
  ) {}

  public get addedOn(): Date {
    return this._addedOn;
  }
}
