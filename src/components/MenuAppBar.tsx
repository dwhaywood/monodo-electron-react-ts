import * as React from 'react';
import { withStyles, WithStyles, StyledComponentProps } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import AuthWindow from './AuthWindow';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};
export interface MenuAppBarProps {
  classes: any;
}
export interface MenuAppBarState {
  auth: boolean;
  anchorEl?: any;
  authOpen: boolean;
  username?: string;
}
class MenuAppBar extends React.Component<MenuAppBarProps & WithStyles, MenuAppBarState> {
  constructor(props: MenuAppBarProps) {
    super(props);
    this.state = {
      auth: false,
      anchorEl: null,
      authOpen: false,
      username: ''
    };
  }

  handleChange = (_event: any, checked: boolean) => {
    this.setState({ auth: checked });
  }

  handleMenu = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  handleLoginClick = () => {
    this.setState({authOpen: true});
  }

  handleAuthClose = () => {
    this.setState({ authOpen: false });
  }
  handleAuthSubmit = (login: {username: string, password: string}) => {
    this.setState({ authOpen: false });
    if (login.username != undefined && login.password != undefined) {
      this.setState({
        auth: true,
        username: login.username
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { auth, anchorEl, authOpen } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AuthWindow cancelCallback={this.handleAuthClose.bind(this)} submitCallback={this.handleAuthSubmit.bind(this)} open={authOpen}/>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Tasks
            </Typography>
            {auth ? (
              <div>
                <IconButton
                  onClick={this.handleMenu}
                  color='inherit'
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                </Menu>
              </div>
            ) : (
              <Button variant='outlined'  onClick={this.handleLoginClick}>Login</Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(MenuAppBar);