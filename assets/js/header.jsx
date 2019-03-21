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
    session_info = <div className="form-inline my-2">
      <input type="name" id="user-name" placeholder="name" />
      <input type="password" id="password" placeholder="password" />
      <button className="btn btn-secondary" onClick={()=>login()}>Login</button>
      <Link to={"/create_user_form"}> register </Link>
    </div>;
  }
  else {
    let user = props.users.find(function(ee){return ee.id == props.session.user_id;}).name
    session_info = <div className="my-2">
      <p>Logged in as {user}</p>
      <p><Link to={"/"} onClick={() => api.delete_session()}>logout</Link></p>
    </div>;
  }

  return <div className="row my-2">
    <div className="col-4">
      <h1>Task Tracker</h1>
    </div>
    <div className="col-4">
      <p>
        <Link to={"/tasks"} onClick={() => api.list_tasks()}>tasks</Link>
      </p>
    </div>
    <div className="col-4">
      {session_info}
    </div>
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
