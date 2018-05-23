import React from 'react';
import timer from 'react-timer-hoc';

function myComponent({ timer }) {
    return <div>Started { timer.tick * timer.delay }ms ago.</div>
}

export default Class extends

const Timer1 = timer(1000)(myComponent);
const Timer2 = timer(2000)(myComponent);
