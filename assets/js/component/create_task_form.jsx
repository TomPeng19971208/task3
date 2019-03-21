import _ from 'lodash';
import { connect } from 'react-redux';
import React from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
function CreateTaskForm(props) {
  console.log(props)
  let users = props.users
  return <div>
  <h1>create a new task</h1>
  <p>title:      <input id="create-task-title" type="text" placeholder="title" /></p>
  <p>description:<input id="create-task-description" type="text" placeholder="desription"/></p>
  <p>time:       <input id="create-task-time" type="number" placeholder="0" /></p>
  <p>finished:   <input type="checkbox" id="create-task-finished" /></p>
  <p>user:       <select id="create-task-user">
        {users.map(uu => <option key={uu.id} value={uu.id}> {uu.name}</option>)}
     </select>
  </p>
  <p><Link to='/tasks'><button onClick={() => {api.create_task();}}>submit</button></Link>
  <Link to="/tasks"><button>cancel</button></Link>
  </p>
  </div>
}


function state2props(state) {
  console.log("rerender", state);
  return {
    session: state.session,
    users: state.users
  };
}

// Export result of curried function call.
export default connect(state2props)(CreateTaskForm);
