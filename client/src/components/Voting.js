import React from 'react';

export class VoteUpDown extends React.Component {
    constructor() {
        super();

        this.state = {
            score: 0,
        };

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }

    render() {
        return (
            <div>
                <div>{this.state.score}</div>
                <button className="countUp" onClick={this.increment}><span role="img">😍</span></button>
                <button className="countDown" onClick={this.decrement}><span role="img">😡</span></button>
                <hr />
            </div>
        );
    }

    increment() {
        this.setState({
            score: this.state.score + 1,
        });
    }

    decrement() {
        this.setState({
            score: this.state.score - 1 && Math.max(0, this.state.score - 1),

        });
    }
}