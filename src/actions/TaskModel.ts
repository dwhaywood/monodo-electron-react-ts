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
    Name: string;
    Priority?: Priorities;
    Details?: string ;
    Size?: Sizes ;
    DueDate?: Date ;
    StartDate?: Date ;

    constructor(initialValues: object) {
        //
        Object.keys(initialValues).forEach((prop) => {
            if (this.hasOwnProperty(prop)) {
                this[prop] = initialValues[prop];
            }
        });
    }

}