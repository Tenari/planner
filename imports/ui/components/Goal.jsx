import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { Goals } from '../../api/goals.js';

import Step from './Step.jsx';

// App component - represents the whole app
export default class Goal extends Component {
  renderSteps() {
    const that = this;
    return <ul>
      {
        _.map(this.props.goal.steps, function(step, index){
          return <Step key={index} index={index} step={step} goalId={that.props.goal._id} changeStep={that.props.changeStep}/>
        })
      }
    </ul>;
  }

  stopPropagation(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  addStep(){
    let steps = this.props.goal.steps;
    steps.length += 1;
    Goals.update(this.props.goal._id, {$set: {steps: steps}});
  }

  render() {
    return (
      <div className="goal" onClick={this.stopPropagation}>
        <h1>I plan to {this.props.goal.text}</h1>
        <p>by following these steps:</p>
        
        {this.renderSteps()}

        <button onClick={this.addStep.bind(this)}>+ Add Step</button>
      </div>
    );
  }
}

Goal.propTypes = {
  goal: PropTypes.object.isRequired,
};
