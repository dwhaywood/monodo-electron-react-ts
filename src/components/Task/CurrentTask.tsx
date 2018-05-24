import * as React from 'react';
import { Component } from 'react';
import { withStyles, WithStyles, StyledComponentProps } from '@material-ui/core/styles';
import Task from './Task';
import { Typography, Paper, Grid } from '@material-ui/core';


const styles = (theme: any) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  });
  

export interface CurrentTaskProps  {
    CurrentTask: Task;
  }
  
export interface CurrentTaskState {
    
}
  
export class CurrentTask extends Component<CurrentTaskProps & WithStyles<"root">, CurrentTaskState> {
    static defaultProps: Object = {
    };
    /**
     * Constructor
     */
    constructor(props: CurrentTaskProps  & WithStyles<"root">) {
        super(props);
    }

    render() {
    return (
        <Grid item xs={8}>
            <Paper>
                <Typography>Send the emails to all those folks</Typography>
            </Paper>
        </Grid>
        );
    }
}

export default withStyles(styles)(CurrentTask);