import { Component } from "react";
import { Grid, Divider, withStyles, WithStyles, StyledComponentProps } from '@material-ui/core';
import * as React from 'react';
import Timer from '../Timer/Timer';
import { TaskManager } from '../../actions/TaskManager';
import TaskList from '../TaskList/TaskList';
import TaskModel from '../../actions/TaskModel';

const styles = (theme: any) => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        }),
  });

export interface TaskMoverProps {
    authed?: boolean;
}

export interface TaskMoverState {
    tasks?: Array<TaskModel>;
    completedTasks?: Array<TaskModel>;
}

class TaskMover extends Component<TaskMoverProps & WithStyles<"root"> & StyledComponentProps, TaskMoverState> {

    taskManager: TaskManager;

    constructor(props: TaskMoverProps & WithStyles<"root"> & StyledComponentProps) {
        super(props);
        this.taskManager = new TaskManager();
        this.state = {tasks: this.taskManager.AllUserTasks, completedTasks: []};
    }

    loggedIn(_login: {username: string, password: string}) {
        //
    }

    appTickCallBack(timeremaining: number): void {
        console.log(timeremaining);
    }

    completedTask(index: number): void {
        const task: TaskModel = this.state.tasks![index];
        this.setState((prevState: Partial<TaskMoverState>) => ({
            completedTasks: [...prevState.completedTasks!, task],
            tasks: prevState.tasks!.filter(
                (_task, ix) => {return ix != index; } )}));

    }

    render() { 
        const {classes} = this.props;

        return (
            <div className="wrapClass">
            <Grid container spacing={8} justify="center" className={classes.root}>
                <Timer tickCallback= {this.appTickCallBack.bind(this)} />
                <Divider/>
                <Grid item xs={12}>
                    <Grid container spacing={8} justify="center" >
                        <TaskList Tasks={this.state.tasks} smcols={8} Incomplete={true} ListName="Upcoming Tasks" completedTaskCallback={this.completedTask.bind(this)}/>
                        <TaskList Tasks={this.state.completedTasks} smcols={4} Incomplete={false} ListName="Completed Tasks"/>
                    </Grid>
                </Grid>
            </Grid>
            </div>

        );
    }
}

export default withStyles(styles)(TaskMover);