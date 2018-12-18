// App.jsx
import React from "react";


class TodoBody extends React.Component {

    addStick(stick, stick_id) {
        return (
            <li style={{textDecoration: (stick.isFinished ? 'line-through' : 'none')}}>
                {stick.content}
                <button
                    key={stick_id}
                    onClick={() => this.props.onClick(stick_id)}
                >
                    {stick.isFinished ? 'unDelete' : 'Delete'}
                </button>
            </li>        
        );
    }

    render() {

        let sticks = this.props.sticks;
        let stickList = [];
        for(let i=0; i<sticks.length; i++) {
            stickList.push(this.addStick(sticks[i], i));
        }
        return (
            <ol>
                {stickList}
            </ol>        
        );
    }
}


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            sticks: [],
        };        
    }

    countFinished(sticks) {
        let counter = 0;
        for(let i=0; i<sticks.length; i++) {
            if(sticks[i].isFinished === true)   counter++;
        }
        return counter;
    }

    insertStick() {
        this.setState({
            sticks: this.state.sticks.concat([{
                content: this.input.value,
                isFinished: false,
            }]), 
        });
        this.input.value = '';
    }

    deleteStick(i) {
        let sticks = this.state.sticks.slice();
        sticks[i].isFinished = !sticks[i].isFinished;
        this.setState({
            sticks: sticks,
        }); 
    }

    clearStick() {
        let sticks = this.state.sticks.slice();
        let i = 0;
        while(i < sticks.length) {
            if(sticks[i].isFinished) {
                sticks.splice(i, 1);
                i--;
            }
            i++;
        }
        this.setState({
            sticks: sticks,
        }); 
    }

    render () {
        let total = this.state.sticks.length;
        let finished = this.countFinished(this.state.sticks);

        return (
            <div classname='to-do'>
                <h1 classname='to-do-head'> To-do-list </h1>
                <TodoBody
                    sticks={this.state.sticks} 
                    onClick={(i) => this.deleteStick(i)}
                />

                <div classname='to-do-board'>
                    {finished} finished / {total} total
                </div>

                <div classname='to-do-input'>
                    <input 
                        ref={input => this.input=input} 
                        type='text' 
                    />
                    <button onClick={() => this.insertStick()}>
                        save mission
                    </button>
                    <button onClick={() => this.clearStick()}>
                       clear deleted 
                    </button>
                </div>
            </div>
        );
    }
}
