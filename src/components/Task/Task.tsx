import * as React from 'react';
import { Component } from 'react';
import TaskModel from '../../actions/TaskModel';


export interface TaskProps {
  checked: boolean;
  Task: TaskModel;
}

export interface TaskState {
  Complete?: boolean;
}

export default class Task extends Component<TaskProps, TaskState> {
    /**
     * Constructor
     */
    constructor(props: TaskProps) {

        super(props);
        this.state = {};
    }

    render() {

        return (
          <li >
            {/* 
            <button className='delete' onClick={this.deleteThisTask.bind(this)}>
              &times;
            </button>
    
                        <input
              type='checkbox'
              readOnly
              checked={!!this.props.task.checked}
              onClick={this.toggleChecked.bind(this)}
            /> 
    
            { this.props.showPrivateButton ? (
              <button className='toggle-private' onClick={this.togglePrivate.bind(this)}>
                { this.props.task.private ? 'Private' : 'Public' }
              </button>
            ) : ''}
            */}
            <span className='text'>
              <strong>{this.props.Task.Name}</strong>: {this.props.Task.DueDate!.toDateString()}
            </span>
          </li>
        );
      }
}