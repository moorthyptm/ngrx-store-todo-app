

export class TodoList {
  isDone = false;
  constructor(
    public title: string,
    public comment: string,
    private addedOn: Date = new Date()
  ) { }

  get addedon(): Date {
    return this.addedOn;
  }

}
