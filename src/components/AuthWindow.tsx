import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export interface AuthWindowProps {
  cancelCallback(): void;
  submitCallback(): void;
  open: boolean;
}

export interface AuthWindowState {

}

export default class AuthWindow extends React.Component<AuthWindowProps, AuthWindowState> {
  /**
   *
   */
  constructor(props: AuthWindowProps) {
    super(props);

  }
  
  render() {
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
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.cancelCallback} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.props.submitCallback} color="primary" type="submit">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
