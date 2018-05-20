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
            this.connection = new EWSIntegration(username: string, password: string, ewsurl: string);
        }
    }

    getIncompleteTasks(): Array<Task> {
        return [];
    }

    completeTask(taskId: string): Array<Task> {
        return [];
    }
}

export class OutlookTask extends Task {
    outlookId: string;
}

abstract class OutlookIntegrationAbstract {

}

class EWSIntegration {
    constructor(username: string, password: string, ewsurl: string) {
        //TODO: 
    }
}