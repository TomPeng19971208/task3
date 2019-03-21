import _ from 'lodash';
import { connect } from 'react-redux';
import React from 'react';
import api from '../api';
import jQuery from 'jquery';
window.jQuery = window.$ = jQuery;
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
function EditTaskForm(props) {
  console.log("edit");
  let users = props.users;
  let task = props.task.find(function(t){return t.id==window.task_id;});
  console.log(task);
  return <div>
  <h1>Edit</h1>
  <p>title:      <input id="edit-task-title" type="text" defaultValue={task.title} /></p>
  <p>description:<input id="edit-task-description" type="text" defaultValue={task.description} /></p>
  <p>time:       <input id="edit-task-time" type="number" defaultValue={task.time} /></p>
  <p>finished:   <input type="checkbox" id="edit-task-finished" /></p>
  <p>user:       <select id="edit-task-user">
        {users.map(uu => <option key={uu.id} value={uu.id}> {uu.name}</option>)}
     </select>
  </p>
  <p><Link to="/tasks"><button onClick={() => api.update_task(task)}>submit</button></Link>
  <Link to="/tasks"><button>cancel</button></Link>
  </p>
  </div>
}


function state2props(state) {
  console.log("rerender edit", state);
  return {
    users: state.users,
    task: state.task
  };
}

// Export result of curried function call.
export default connect(state2props)(EditTaskForm);
