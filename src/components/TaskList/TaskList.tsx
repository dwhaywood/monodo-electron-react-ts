import * as React from 'react';
import { Component } from 'react';
//import Task from '../Task/Task';
import TaskModel from '../../actions/TaskModel';
import { withStyles, WithStyles, StyledComponentProps } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';


const styles = (theme: any) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  });
  

export interface TaskListProps  {
    Tasks: Array<TaskModel>;
  }
  
export interface TaskListState {
    checked: Array<any>;
}
  
export class TaskList extends Component<TaskListProps & WithStyles<string> & WithStyles<"root">, TaskListState> {
    static defaultProps: Object = {
    };
    /**
     * Constructor
     */
    constructor(props: TaskListProps & WithStyles<string> & WithStyles<"root">) {

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
    }

    render() {
    return (
        <List>
            {this.props.Tasks.map((task, ix) => (
            <ListItem
                key={ix}
                role={undefined}
                dense
                button
                onClick={this.handleToggle(ix)}
                className={this.props.classes.listItem}
            >
                <Checkbox
                checked={this.state.checked.indexOf(task) !== -1}
                tabIndex={-1}
                disableRipple
                />
                <ListItemText primary={task.Name!} />
                <ListItemSecondaryAction>
                <IconButton aria-label="Edit">
                    <EditIcon />
                </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            ))}
        </List>
        );
    }
}

export default withStyles(styles)(TaskList);