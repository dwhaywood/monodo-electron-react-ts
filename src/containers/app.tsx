import * as React from 'react';
import TaskList from '../components/TaskList/TaskList';
import { TaskManager } from '../actions/TaskManager';
import Timer from '../components/Timer/Timer';
import Grid from '@material-ui/core/Grid';
import MenuAppBar from '../components/MenuAppBar';
import Divider from '@material-ui/core/Divider/Divider';
import TaskModel from '../actions/TaskModel';
import TaskMover from '../components/Task/TaskMover';

export interface AppState {
  
}

export class App extends React.Component<any, AppState> {
  /**
   *
   */
  
  constructor(props: any) {
    super(props);

  }

  render() {
    return (

      <Grid container alignContent='center'>
        <Grid item xs={12} className="appContainer">
          <MenuAppBar/>
          <TaskMover/>
        </Grid>
      </Grid>

    );
  }
}
