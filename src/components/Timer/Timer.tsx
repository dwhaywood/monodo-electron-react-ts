import * as React from 'react';
import { Component } from 'react';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography/Typography';

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
}

export default class Timer extends Component<TimerProps, TimerState> {
    _isMounted: boolean;
    constructor(props: TimerProps) {
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
        this.setState({
            totalDuration: this.state.totalDuration! + amount,
            timeRemaining: this.state.timeRemaining! + amount
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
    
        let timeRemaining = Math.max(this.state.timeRemaining! - dt, 0);
        let countdownComplete = (this.state.prevTime && timeRemaining <= 0);
    
        if (countdownComplete) {this.stop(); }
        if (this._isMounted) {
          if (this.state.timeoutId) { clearTimeout(this.state.timeoutId); }
          this.setState({
            timeoutId: countdownComplete ? undefined : setTimeout(() => {this.tick(); }, timeout),
            prevTime: currentTime,
            timeRemaining: timeRemaining
          });
        }
    
        if (countdownComplete) {
          if (this.props.timerEndCallback) { this.props.timerEndCallback(); }
          return;
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
    
        let totalSeconds: number = Math.round(milliseconds / 1000);
    
        let seconds = parseInt((totalSeconds % 60).toString(), 10);
        let minutes = parseInt((totalSeconds / 60).toString(), 10) % 60;
        let hours = parseInt((totalSeconds / 3600).toString(), 10);
    
        let s_seconds = seconds < 10 ? '0' + seconds : seconds;
        let s_minutes = minutes < 10 ? '0' + minutes : minutes;
        let s_hours = hours < 10 ? '0' + hours : hours;
    
        return s_hours + ':' + s_minutes + ':' + s_seconds;
    }
    render() {
        let timeLeft: number = this.state.timeRemaining!;
        return (
            <div className='timer'>
            <Grid container spacing={0} direction='column' justify="center">
                <Grid container spacing={0} justify="center">
                    <Grid item xs={4}>
                            <Typography variant="display4" gutterBottom>
                            {this.getFormattedTime(timeLeft)}
                            </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={16} justify="center">
                    <Grid item xs={1}>
                        <Button className='start' variant='raised' size='small' onClick={this.start.bind(this)}>
                            Start
                        </Button>
                    </Grid>
                    <Grid item xs={1}>
                        <Button className='pause' variant='raised' size='small' onClick={this.stop.bind(this)}>
                            Pause
                        </Button>
                    </Grid>
                    <Grid item xs={1}>
                        <Button className='complete' variant='raised' size='small' onClick={this.complete.bind(this)}>
                            Complete
                        </Button>
                    </Grid>
                    <Grid item xs={1}>
                        <Button className='skip' variant='raised' size='small' onClick={this.skip.bind(this)}>
                            Skip
                        </Button>
                    </Grid>
                    <Grid item xs={1}>
                        <Button color='default' variant='raised' size='small' onClick={this.addTime.bind(this, (1000 * 60 * 5))}>
                            +5:00
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            </div>
        );
    }
}