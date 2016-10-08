import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Goals } from '../../api/goals.js';
 
import Goal from './Goal.jsx';
 
// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      goal: null,
    }
  }
  
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.goalName).value.trim();

    Goals.insert({
      text,
      steps: [{},{},{}],
      dueDate: null,
      createdAt: new Date(), // current time
      root: true,
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.goalName).value = '';
  }

  changeGoal(goal) {
    this.setState({goal: goal});
  }

  renderGoal() {
    let goal;
    if (this.state.goal) {
      goal = Goals.findOne(this.state.goal);
    } else {
      goal = this.props.goals[0];
    }
    return <Goal key={goal._id} goal={goal} />;
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
      stuff = this.renderGoal();
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
