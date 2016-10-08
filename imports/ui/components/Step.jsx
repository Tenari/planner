import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { Goals } from '../../api/goals.js';

import Goal from './Goal.jsx';

// App component - represents the whole app
export default class Step extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDetails: false,
    }
  }

  killStep(event) {
    // update the parent
    let oldSteps = Goals.findOne(this.props.goalId).steps;
    oldSteps.splice(this.props.index, 1);
    Goals.update(this.props.goalId, {$set: {steps: oldSteps}});

    // remove the step object
    this.deleteStep(this.props.step);
  }

  deleteStep(id){
    if (!_.isString(id)) return;
    const that = this;
    _.each(Goals.findOne(id).steps, function(step) {
      if (_.isString(step))
        that.deleteStep(step);
    })
    Goals.remove(id);
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

  toggleShowDetails() {
    this.setState({showDetails: !this.state.showDetails})
  }

  render() {
    let inner;
    if (_.isString(this.props.step)) {
      const step = Goals.findOne(this.props.step);
      let details = null;
      if (this.state.showDetails) {
        details = <Goal goal={step} />
      }

      inner = <span onClick={this.toggleShowDetails.bind(this)}>
        {step.text}
        {details}
      </span>;
    } else {
      inner = <form className="new-step" onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" ref="stepName" placeholder="verb an object"/>
      </form>;
    }
    return (
      <li className="step">
        {this.props.index + 1}. <span className="delete" onClick={this.killStep.bind(this)}>x</span> {inner}
      </li>
    );
  }
}
