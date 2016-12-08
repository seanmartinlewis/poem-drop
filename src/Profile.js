import React, {Component} from 'react';
import './App.css';
// import {Link} from 'react-router';
import axios from 'axios';


class Profile extends Component {
  constructor(props){
    super(props)

    this.state = {
      followers: [],
      following: [],
      profile: {},
      googleProfile: this.props.auth.getProfile()
    }
      this._loadProfile = this._loadProfile.bind(this)
  }

  componentDidMount(){
    this._loadProfile();
  }

  _loadProfile(){
    console.log('loading PROFILE');
    console.log(this.state.googleProfile);
    axios.get('http://localhost:3000/users/', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${this.props.auth.getToken()}`
      }
    }).then(data => {
      let newProfile = data.data;
      console.log(newProfile);
      this.setState({
        profile: newProfile
      })
    })
  }

  render(){
    return(
      <div className="profile">

      </div>
    )
  }
}

export default Profile;
