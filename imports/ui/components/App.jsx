import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Goals } from '../../api/goals.js';
 
import Goal from './Goal.jsx';
 
// App component - represents the whole app
class App extends Component {
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.goalName).value.trim();

    Goals.insert({
      text,
      steps: [{},{},{}],
      dueDate: null,
      createdAt: new Date(), // current time
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.goalName).value = '';
  }

  renderGoals() {
    return this.props.goals.map((goal) => (
      <Goal key={goal._id} goal={goal} />
    ));
  }

  renderForm() {
    return <form className="new-goal" onSubmit={this.handleSubmit.bind(this)}>
      I plan to <input type="text" ref="goalName" placeholder="verb an object" />
    </form>;
  }
 
  render() {
    let stuff;
    if (this.props.goals.length == 0) {
      stuff = this.renderForm();
    } else {
      stuff = this.renderGoals();
    }
    return (
      <div className="container">
        {stuff}
      </div>
    );
  }
}

App.propTypes = {
  goals: PropTypes.array.isRequired,
};
 
export default createContainer(() => {
  return {
    goals: Goals.find({}).fetch(),
  };
}, App);
