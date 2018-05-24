export enum Priorities {
    High,
    Normal,
    Low
}

export enum Sizes {
    Tiny,
    Quick,
    Small,
    Medium,
    Large,
    XtraLarge
}


export default class TaskModel  {
    Name?: string = '';
    Priority?: Priorities = Priorities.Normal;
    Details?: string = '';
    Size?: Sizes = Sizes.Small;
    DueDate?: Date = new Date();
    StartDate?: Date = new Date();

    constructor(init?: Partial<TaskModel>) {
        //
        Object.assign(this, init);
    }

}