import React, { Component } from 'react';
import { Route } from 'react-router';

export class FindMentors extends Component {
  constructor(props) {
    super(props)
    this.allMentors = [];
    this.state = {
      searchParams: {
        location: '',
        preferred_contact: '',
        preferred_name: '',
        availability: '',
        company: '',
        devType: '',
        stack: '',
        pairing_location: '',
      },
      filteredMentors: []
    }
  }

  getAllMentors() {
    fetch('/api/v1/mentors')
    .then(response => response.json())
    .then(data => {
      this.allMentors = data;
    });
  }

  setSelectedKeys(searchParams) {
    return Object.keys(searchParams).filter( param => {
      return searchParams[param];
    });
  }

  filterMentors(selectedKeys, searchParams) {
    const matchingMentors = [];
    this.allMentors.forEach( mentor => {
      let pushing = true;
      selectedKeys.forEach( key => {
        if(!mentor[key].toLowerCase().includes(searchParams[key].toLowerCase())) {
          pushing = false;
        }
        if(pushing) {
          matchingMentors.push(mentor);
        }
      });
    });
    return matchingMentors;
  }

  getFilteredMentors(e) {
    e.preventDefault();
    const { searchParams } = this.state;

    let selectedKeys = this.setSelectedKeys(searchParams);
  
    const searchedMentors = this.filterMentors(selectedKeys, searchParams);
  
    this.setState({
      filteredMentors: searchedMentors
    });
  }

  componentDidMount() {
    this.getAllMentors();
  }

  updateProperty(e) {
    const { name, value } = e.target;
    this.setState({
      searchParams: Object.assign(this.state.searchParams, {
        [name]: value
      })
    });
  }

  render() {
    return(
      <div>
        <h2>Search for a Mentor</h2>
        <form 
          onSubmit={e => this.getFilteredMentors(e)}>
          <label> Name 
            <input
              type='text'
              name='preferred_name'
              placeholder='Jane Doe'
              value={this.state.searchParams.preferred_name}
              onChange={e => this.updateProperty(e)}
              />
          </label>
          <label> Location 
            <input
              type='text'
              name='location'
              placeholder='Denver, CO'
              value={this.state.searchParams.location}
              onChange={e => this.updateProperty(e)}
              />
          </label>
          <label> Preferred Form of Contact 
            <input
              type='text'
              name='preferred_contact'
              placeholder='Slack'
              value={this.state.searchParams.preferred_contact}
              onChange={e => this.updateProperty(e)}
              />
          </label>
          <label> Company
            <input
              type='text'
              name='company'
              placeholder='SendGrid'
              value={this.state.searchParams.company}
              onChange={e => this.updateProperty(e)}
              />
          </label>
          <label> Dev Type 
            <input
              type='text'
              name='dev_type'
              placeholder='Frontend, backend, or full stack'
              value={this.state.searchParams.dev_type}
              onChange={e => this.updateProperty(e)}
              />
          </label>
          <label> Stack 
            <input
              type='text'
              name='stack'
              placeholder='Ruby'
              value={this.state.searchParams.stack}
              onChange={e => this.updateProperty(e)}
              />
          </label>
          <label> Pairing Location 
            <input
              type='text'
              name='pairing_location'
              placeholder='Turing'
              value={this.state.searchParams.pairing_location}
              onChange={e => this.updateProperty(e)}
              />
          </label>
          <input
            type="submit"
            value="Search for Mentors"
          />
        </form>

      </div>
    )
  }
}
