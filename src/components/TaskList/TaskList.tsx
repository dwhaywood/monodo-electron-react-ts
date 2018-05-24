import * as React from 'react';
import { Component } from 'react';
//import Task from '../Task/Task';
import TaskModel from '../../actions/TaskModel';
import { withStyles, WithStyles, StyledComponentProps, StyleRules } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { ListSubheader, Paper, Grid } from '@material-ui/core';

const styles: StyleRules = (theme: any) => ({
    'root': {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
    },
  });

export interface TaskListProps  {
    Tasks?: Array<TaskModel>;
    smcols?: boolean | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined;
    ListName?: string;
    Incomplete?: boolean;
    completedTaskCallback?(index: number): void;
  }
  
export interface TaskListState {
    checked: Array<any>;
}
  
export class TaskList extends Component<TaskListProps & WithStyles<string> & WithStyles<"root"> & StyledComponentProps, TaskListState> {
    static defaultProps: Object = {
        smcols: 6
    };
    /**
     * Constructor
     */
    constructor(props: TaskListProps & WithStyles<string> & WithStyles<"root"> & StyledComponentProps) {

        super(props);
        this.state = {checked: []};
    }

    handleToggle = (value: any) => () => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        this.setState({
          checked: newChecked,
        });

        this.props.completedTaskCallback!(value);
    }

    render() {
        const { classes } = this.props;
    return (
        <Grid item xs={12} sm={this.props.smcols!}>
        <Paper className={classes.root} elevation={8}>
        <List
            subheader={<ListSubheader component="div">{this.props.ListName!}</ListSubheader>}
        >
            {(this.props.Tasks == undefined) ?
            <ListItem
                role={undefined}
                dense
                button
                className={this.props.classes.listItem}
            >
                <ListItemText primary="No tasks yet" />
            </ListItem>
            : this.props.Tasks!.map((task: TaskModel, ix) => (
            <ListItem
                key={ix}
                role={undefined}
                dense
                button
                
                className={this.props.classes.listItem}
                disableRipple
            >
                { this.props.Incomplete! && (
                    <Checkbox
                    onClick={this.handleToggle(ix)}
                    checked={this.state.checked.indexOf(ix) !== -1}
                    tabIndex={-1}
                    disableRipple
                    />
                )}

                <ListItemText primary={task.Name} />
                <ListItemSecondaryAction>
                <IconButton aria-label="Edit">
                    <EditIcon />
                </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            ))}
        </List>
        </Paper>
        </Grid>

        );
    }
}

export default withStyles(styles)(TaskList);