import React, { Component } from 'react';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import MentorCard from './MentorCard';

export default class MentorHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mentor: {}
    };
  }

  getMentor() {
    const { user } = this.props;

    fetch(`/api/v1/mentors/${user.ghId}`)
    .then(resp => resp.json())
    .then(mentors => {
      this.setState({ mentor: mentors[0] });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
  }

  componentWillMount() {
    this.getMentor();
  }

  render() {
    return (
      <div className='edit-wrapper'>
        <MentorCard mentor={this.state.mentor || this.props.currentMentor} />
        <Link className='mentor-edit-link' to='/edit-mentor'>EDIT PROFILE</Link>
      </div>
    )
  }
}
