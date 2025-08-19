import React, { Component } from 'react'
import './Dashboard.css'
import { callApi , getSession, setSession } from './api';
import MenuBar from './MenuBar';
import JobPostings from './JobPostings';
import JobSearch from './JobSearch';
import MyProfile from './MyProfile';
class Dashboard extends Component {
  constructor(props)
  {
    super(props);
    this.state = {fullname:'',activeComponent:''};
    this.showFullname=this.showFullname.bind(this);
    this.loadComponent=this.loadComponent.bind(this);
  }
  componentDidMount()
  {
    let csr = getSession("csrid");
    if(csr === "")
      this.logout();

    let data = JSON.stringify({csrid: csr});
    callApi("POST", "http://localhost:8080/users/getfullname", data, this.showFullname);
  }
  showFullname(response)
  {
    this.setState({fullname: response});
  }
  logout()
  {
    setSession("csrid", "", -1);
    window.location.replace("/");
  }
  loadComponent(mid){
    let components = {
      "1":<JobPostings/>,
      "2":<JobSearch/>,
      "3":<MyProfile/>

    };
    this.setState({activeComponent: components[mid]});
  }
  render() {
    const {fullname,activeComponent} = this.state;
    return (
      <div className='dashboard'>
        <div className='header'>
          <img className='logo' src='/logo.png' alt='' />
          <div className='logoText'>Job <span>Portal</span></div>
          <img className='logout' onClick={()=>this.logout()} src='/logout.png' alt='' />
          <label>{fullname}</label>
        </div>
        <div className='menu'><MenuBar onMenuClick={this.loadComponent} /></div>
        <div className='outlet'>{activeComponent}</div>
      </div>
    );
  }
}

export default Dashboard;