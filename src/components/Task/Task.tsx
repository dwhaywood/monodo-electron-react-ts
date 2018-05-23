import * as React from 'react';
import { Component } from 'react';


export enum Priorities {
    High,
    Normal,
    Low
}

export enum Sizes {
    Tiny,
    Quick,
    Small,
    Medium,
    Large,
    XtraLarge
}

export interface TaskProps {
  Name: string;
  Priority?: Priorities;
  Details?: string ;
  Size?: Sizes ;
  DueDate?: Date ;
  StartDate?: Date ;
}

export interface TaskState {
  Complete?: boolean;
}

export default class Task extends Component<TaskProps, TaskState> {
    static defaultProps: Object = {
        Priority: Priorities.Normal,
        Details: '',
        Size: Sizes.Medium,
        DueDate: new Date(),
        StartDate: new Date(),
    };
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
              <strong>{this.props.Name}</strong>: {this.props.DueDate!.toDateString()}
            </span>
          </li>
        );
      }
}