import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import api from '../api';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


function TaskList(props) {
  var display;
  if (props.session) {
    let task = _.map(props.tasks, (tt) => <Task key={tt.id} task={tt} users={props.users} session={props.session} />);
    display =
    <div className="col-12">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Finished</th>
            <th>Time</th>
            <th>User</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {task}
        </tbody>
      </table>
      <h4><Link to={"/create_task_form"}>Add</Link></h4>
    </div>
  }
  else {
    display = <div></div>
  }
  return <div className="row">
  <p>task_list</p>
      {display}
  </div>;
}

function get_user_name(users, id) {
  return users.find(function(ele){return ele.id==id}).name;
}

function Task(props) {
  console.log("task");
  console.log(props);
  //edit the task

  let task = props.task;
  let user_name = get_user_name(props.users, task.user_id);
  console.log(user_name);
  return <tr>
    <td>{task.title}</td>
    <td>{task.description}</td>
    <td>{task.finished.toString()}</td>
    <td>{task.time}</td>
    <td>{user_name}</td>
    <td>
      <button className="btn btn-danger" onClick={() => { api.delete_task(task.id)}}> Delete</button>
      <Link to={"/edit_task_form/"} onClick={()=>{window.task_id=task.id;}}><button className="btn btn-danger"> Edit</button></Link>
    </td>
  </tr>;
}


function state2props(state) {
  console.log("rerender task_list", state);
  return {
    tasks: state.task,
    users: state.users,
    session: state.session
  };
}

// Export result of curried function call.
export default connect(state2props)(TaskList);
