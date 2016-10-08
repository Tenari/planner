import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { Goals } from '../../api/goals.js';

// App component - represents the whole app
export default class Step extends Component {
  killStep(event) {
    // update the parent
    let oldSteps = Goals.findOne(this.props.goalId).steps;
    oldSteps[this.props.index] = null;
    Goals.update(this.props.goalId, {$set: {steps: oldSteps}});

    // remove the step object
    Goals.remove(this.props.step);
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.stepName).value.trim();
    
    // create new goal
    let newGoal = {
      text,
      steps: [{},{},{}],
      dueDate: null,
      createdAt: new Date(), // current time
    }
    const newId = Goals.insert(newGoal);

    // update old goal
    let oldSteps = Goals.findOne(this.props.goalId).steps;
    oldSteps[this.props.index] = newId;
    Goals.update(this.props.goalId, {$set: {steps: oldSteps}});
  }

  render() {
    let inner;
    if (_.isString(this.props.step)) {
      const step = Goals.findOne(this.props.step);
      inner = <span><span className="delete" onClick={this.killStep.bind(this)}>x</span> {step.text}, then</span>;
    } else {
      inner = <form className="new-step" onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" ref="stepName" placeholder="verbing an object"/>, then
      </form>;
    }
    return (
      <li className="step">
        {inner}
      </li>
    );
  }
}
