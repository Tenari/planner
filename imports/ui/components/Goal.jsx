import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import Step from './Step.jsx';

// App component - represents the whole app
export default class Goal extends Component {
  renderSteps() {
    const that = this;
    return <ul>
      By: 
      {
        _.map(this.props.goal.steps, function(step, index){
          return <Step key={index} index={index} step={step} goalId={that.props.goal._id} />
        })
      }
    </ul>;
  }

  render() {
    return (
      <div className="goal">
        <p>I plan to {this.props.goal.text}</p>
        <button>Add due date</button>
        {this.renderSteps()}
      </div>
    );
  }
}

Goal.propTypes = {
  goal: PropTypes.object.isRequired,
};
