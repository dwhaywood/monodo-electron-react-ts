import * as React from 'react';
import { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles, WithStyles, StyledComponentProps } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import { Paper } from '@material-ui/core';

const styles = (theme: any) => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        }),
  });

export interface TimerProps {
    initialTimeRemaining?: number;
    interval?: number;
    timerEndCallback?: Function;
    formatFunc?: Function;
    tickCallback?: Function;
    completeCallback?: Function;
    skipCallback?: Function;
}

export interface TimerState {
    stopped?: boolean;
    timeRemaining?: number;
    timeoutId?: NodeJS.Timer;
    prevTime?: number;
    totalDuration?: number;
    timerExpired?: boolean;
}

class Timer extends Component<TimerProps & WithStyles<"root" | "button" | "input">, TimerState> {
    _isMounted: boolean;
    constructor(props: TimerProps & WithStyles<"root" | "button" | "input">) {
        super(props);
        this.state =  {timeRemaining: this.props.initialTimeRemaining!};
    }

    static defaultProps: Object = {
        interval: 1000,
        initialTimeRemaining: 30000
    };

    componentDidMount(): void {
        this._isMounted = true;
        this.start();
    }

    componentWillReceiveProps(newProps: TimerProps): void {
        if (this.state.timeoutId) { clearTimeout(this.state.timeoutId); }
        this.setState({prevTime: undefined, timeRemaining: newProps.initialTimeRemaining});
    }

    componentDidUpdate(): void {
        if ((!this.state.prevTime) && this.state.timeRemaining! > 0 && this._isMounted) {
          this.tick();
        }
    }
    
    componentWillUnmount(): void {
        this._isMounted = false;
        if (this.state.timeoutId) { clearTimeout(this.state.timeoutId); }
    }
    
    start(): void {
        this.setState({
            stopped: false,
            prevTime: undefined
        }, this.tick);
    }

    stop(): void {
        this.setState({
            stopped: true,
            prevTime: undefined,
        }, () => {
            if (this.state.timeoutId) { 
                clearTimeout(this.state.timeoutId); 
            }
        });

    }

    skip(): void {
        this.stop();
        this.setState({timeRemaining: this.props.initialTimeRemaining});
    }

    complete(): void {
        this.stop();
        if (this.props.completeCallback) {
            this.props.completeCallback(this.state.totalDuration! - this.state.timeRemaining!);
        }
    }

    addTime(amount: number = 30000): void {
        let newTimeRemaining = this.state.timeRemaining! > 0 ? this.state.timeRemaining! + amount : amount;
        this.setState({
            timerExpired: (newTimeRemaining > 0),
            totalDuration: this.state.totalDuration! + amount,
            timeRemaining: newTimeRemaining
        });
    }

    tick(): void {
        if (!this.state.stopped) { 
        let currentTime = Date.now();
        let dt = (typeof this.state.prevTime != 'undefined') ? (currentTime - this.state.prevTime) : 0;
        let interval = this.props.interval!;
    
        // correct for small variations in actual timeout time
        let timeRemainingInInterval = (interval - (dt % interval));
        let timeout = timeRemainingInInterval;
    
        if (timeRemainingInInterval < (interval / 2.0)) {
          timeout += interval;
        }
    
        let timeRemaining = this.state.timeRemaining! - dt;
        if (timeRemaining <= 0 && !this.state.timerExpired) {
            this.setState({
                timerExpired: true
            });
            if (this.props.timerEndCallback) { this.props.timerEndCallback(); }
        }
    
        if (this._isMounted) {
          if (this.state.timeoutId) { clearTimeout(this.state.timeoutId); }
          this.setState({
            timeoutId: setTimeout(() => {this.tick(); }, timeout),
            prevTime: currentTime,
            timeRemaining: timeRemaining
          });
        } else {
            this.setState({prevTime: undefined});
        }
    
    
        if (this.props.tickCallback) {
          this.props.tickCallback(timeRemaining);
        }
        }
    }

    getFormattedTime(milliseconds: number): string {
        if (this.props.formatFunc) {
          return this.props.formatFunc(milliseconds);
        }

        let minus = milliseconds < 0 ? '-' : '';
        milliseconds = Math.abs(milliseconds);
        let totalSeconds: number = Math.round(milliseconds / 1000);
    
        let seconds = parseInt((totalSeconds % 60).toString(), 10);
        let minutes = parseInt((totalSeconds / 60).toString(), 10) % 60;
        let hours = parseInt((totalSeconds / 3600).toString(), 10);
    
        let s_seconds = seconds < 10 ? '0' + seconds : seconds;
        let s_minutes = minutes < 10 ? '0' + minutes : minutes;
        let s_hours = hours < 10 ? '0' + hours : hours;
    
        return minus + s_hours + ':' + s_minutes + ':' + s_seconds;
    }
    render() {
        let timeLeft: number = this.state.timeRemaining!;
        const { classes } = this.props;
        return (
            <Grid item xs={12} >
                <Paper className={classes.root} elevation={8}>
                <Grid container spacing={8} justify="center">
                    <Grid item xs={12}>
                            <Typography variant="display4" align='center' color={ this.state.timerExpired ? 'secondary' : 'primary'}>
                            {this.getFormattedTime(timeLeft)}
                            </Typography>
                            <Typography variant="display1" align='center' gutterBottom>
                                Find the project for the thing then send all the emails etc long task name
                            </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={8} justify="center">
                        <Button className={classes.button} variant='raised' size='small'   onClick={this.start.bind(this)}>
                            Start
                        </Button>
                        <Button className={classes.button} variant='raised' size='small' onClick={this.stop.bind(this)}>
                            Pause
                        </Button>
                        <Button className={classes.button} variant='raised' size='small' onClick={this.complete.bind(this)}>
                            Complete
                        </Button>
                        <Button className={classes.button} variant='raised' size='small' onClick={this.skip.bind(this)}>
                            Skip
                        </Button>
                        <Button className={classes.button} color='default' variant='raised' size='small' onClick={this.addTime.bind(this, (1000 * 60 * 5))}>
                            +5:00
                        </Button>
                </Grid>
                </Paper>
            </Grid>
        );
    }
}

export default withStyles(styles)(Timer);