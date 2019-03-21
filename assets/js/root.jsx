import React from 'react';
import ReactDOM from 'react-dom';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Provider } from 'react-redux';

import api from './api';

import Header from './header';
import UserList from './component/user_list';
import TaskList from './component/task_list';
import CreateTaskForm from './component/create_task_form';
import EditTaskForm from './component/edit_task_form';
import CreateUserForm from './component/create_user_form';

export default function root_init(node, store) {
  //let tasks = window.tasks;
  ReactDOM.render(
    <Provider store={store}>
      <Root/>
    </Provider>, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    api.list_users();
    api.list_tasks();
  }

  render() {
    return <div>
      <Router>
        <div>
          <Header />
          <div className="row">
            <div className="col-8">
              <Route path="/tasks" exact={true} render={() =>
                <TaskList />
              } />
              <Route path="/create_user_form" exact={true} render={() =>
                <CreateUserForm />
              } />
              <Route path="/create_task_form" exact={true} render={() =>
                <CreateTaskForm />
              } />
              <Route path="/edit_task_form" exact={true} render={() =>
                <EditTaskForm />
              } />
              <Route path="/users" exact={true} render={() =>
                <UserList />
              } />
            </div>
          </div>
        </div>
      </Router>
    </div>;
  }
}
