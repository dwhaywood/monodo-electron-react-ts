import Task from '../components/Task/Task';

export enum OutlookIntegration {
    EWS,
    Outlook365
}

export default class OutlookTaskManager {
    private connection: OutlookIntegrationAbstract;


    /**
     *
     */
    constructor(integration: OutlookIntegration, username: string, password: string, ewsurl: string) {
        //super();
        if (integration == OutlookIntegration.EWS) {
            if (!ewsurl) {
                throw 'No URL defined';
            }
            this.connection = new EWSIntegration(username, password, ewsurl);
        }
    }

    getIncompleteTasks(): Array<Task> {
        return this.connection.getIncompleteTasks();
    }

    completeTask(taskId: string): void {
        this.connection.completeTask(taskId);
    }
}

export class OutlookTask extends Task {
    outlookId: string;
}

abstract class OutlookIntegrationAbstract {
    connection: any;
    abstract getIncompleteTasks(): Array<Task>;
    abstract completeTask(taskId: string): void;
}

class EWSIntegration extends OutlookIntegrationAbstract {

    constructor(username: string, password: string, ewsurl: string) {
        super();
        //TODO: Make connection
    }

    getIncompleteTasks(): Array<Task> {
        return [];
    }

    completeTask(taskId: string): void {
        //Complete task
    }

    exectuteCall(ewsArgs: string): string {
        return '';
    }
}