import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { InputProps } from '@material-ui/core/Input';

export interface AuthWindowProps {
  cancelCallback(): void;
  submitCallback(login: {username: string, password: string}): void;
  open: boolean;
}

export interface AuthWindowState {
  username: string;
  password: string;
}

export default class AuthWindow extends React.Component<AuthWindowProps, AuthWindowState> {
  /**
   *
   */
  constructor(props: AuthWindowProps) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }
  
  private onKeyPress(e: KeyboardEvent ) {
      if (e.key === 'Enter') {
          if (this.readyToSumbit()) {
            this.props.submitCallback({username: this.state.username, password: this.state.password});
          }
      }
  }

  private readyToSumbit(): boolean {
    return (this.state.password != '') && (this.state.username != '' );
  }

  private handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      username: e.target.value
    });
  }
  private handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      password: e.target.value
    });
  }

  render() {
    const state = {...this.state};
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.cancelCallback}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please log in
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Username"
              type="text"
              fullWidth
              onChange={this.handleUsernameChange.bind(this)}
              onKeyUp={this.onKeyPress.bind(this)}
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              onChange={this.handlePasswordChange.bind(this)}
              onKeyUp={this.onKeyPress.bind(this)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.cancelCallback} color="secondary">
              Cancel
            </Button>
            <Button 
            onClick={this.props.submitCallback.bind(this,   {username: state.username, password: state.password})} 
            disabled= {!this.readyToSumbit()} 
            color="primary" 
            type="submit">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
