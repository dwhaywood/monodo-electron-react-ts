import TaskModel, { Priorities } from './TaskModel';

export class TaskManager {
    AllUserTasks: Array<TaskModel>;
    QueuedTasks: Array<TaskModel>;
    CompletedTasks: Array<TaskModel>;
    /**
     * Constructor
     */
    constructor() {
        //super();
        this.AllUserTasks = this.getAllTasks();
    }

    private getAllTasks(): Array<TaskModel> {
        let tasks: Array<TaskModel> = [];
        tasks = tasks.concat(this.testTasks());

        return tasks;
    }

    private testTasks(): Array<TaskModel> {
        let testtasklist: Array<TaskModel> = [];
        testtasklist.push(new TaskModel({Name: 'Task 1', Priority: Priorities.High});
        testtasklist.push(new TaskModel({Name: 'Task 2', DueDate: new Date('3/4/2018')}));
        testtasklist.push(new TaskModel({Name: 'Task 3', Priority: Priorities.High}));
        testtasklist.push(new TaskModel({Name: 'Task 4', DueDate: new Date('6/1/2018')}));
        testtasklist.push(new TaskModel({Name: 'Task 5', DueDate: new Date('6/1/2018')}));
        testtasklist.push(new TaskModel({Name: 'Task 6', DueDate: new Date('6/1/2018'), StartDate: new Date('5/22/2018')}));
        for (let index = 7; index < 25; index++) {
            testtasklist.push(new TaskModel({Name: 'Task ' + index, DueDate: new Date('6/1/2018'), StartDate: new Date('5/22/2018')}));
            
        }
        return testtasklist;
    }
}