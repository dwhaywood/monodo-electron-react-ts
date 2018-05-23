import * as React from 'react';
import TaskList from '../components/TaskList/TaskList';
import { TaskManager } from '../actions/TaskManager';
import Task from '../components/Task/Task';
import Timer from '../components/Timer/Timer';
import Grid from '@material-ui/core/Grid';
import MenuAppBar from '../components/MenuAppBar';

export interface AppState {
  tasks: Array<Task>;
}

export class App extends React.Component<any, AppState> {
  /**
   *
   */
  taskManager: TaskManager;
  constructor(props: any) {
    super(props);
    this.taskManager = new TaskManager();
    this.state = {tasks: this.taskManager.AllUserTasks};
  }
  appTickCallBack(timeremaining: number): void {
    console.log(timeremaining);
  }

  render() {
    return (
      <Grid container alignContent='center'>
        <Grid item xs={12}>
          <MenuAppBar/>
          <Timer tickCallback= {this.appTickCallBack.bind(this)} />
          <TaskList Tasks={this.state.tasks}/>
        </Grid>
      </Grid>

    );
  }
}
