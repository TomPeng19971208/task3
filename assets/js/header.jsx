//adapted from Nat Tuck's lecture note
import React from 'react';
import _ from 'lodash';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import api from './api'

function Header(props) {
  let {session} = props;
  let session_info;
  if (session == null) {
    session_info =
    <div>
      <p>name:     <input type="name" className="form-control" id="user-name" placeholder="name" /></p>
      <p>password: <input type="password" className="form-control" id="password" placeholder="password" /></p>
      <p><button className="btn btn-secondary" onClick={()=>login()}>Login</button>
      <Link className="btn btn-secondary" to={"/create_user_form"}> register </Link></p>
    </div>;
  }
  else {
    let user = props.users.find(function(ee){return ee.id == props.session.user_id;}).name
    session_info =
    <div className="container">
      <div className="row ">
      <span className="col align-self-start">Logged in as {user}</span>
      <span className="col-md-3 offset-md-3"><Link to={"/"} onClick={() => api.delete_session()}>logout</Link></span>
      </div>
      <div>
        <p><Link to={"/tasks"} onClick={() => api.list_tasks()}>tasks</Link></p>
      </div>
    </div>;
  }

  return <div>
    <div  className="text-center">
      <h1>Task Tracker</h1>
    </div>
      {session_info}
  </div>;
}

function login() {
  let name = $("#user-name").val();
  let password = $("#password").val();
  api.create_session(name, password);
}

function state2props(state) {
  return { session: state.session,
    users: state.users
  };
}

export default connect(state2props)(Header);
