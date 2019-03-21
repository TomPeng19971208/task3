import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

/*
  Application state layout
  {
    // Session
    session: null, // { token, user_id }
    // DB Caches
    users: [], // List of User
    tasks: []
    // Forms
    login_form: { email: "", password, "" },
    register_form
    add_task_form: new Map()
    edit_task_form
  }
*/

// For each component of the state:
//  * Function with the same name
//  * Default is the default value of that component

function tasks(state=[], action) {
  switch (action.type) {
  case 'TASK_LIST':
    //console.log(action.data);
    return action.data;
  case 'TASK_CREATE':
    console.log("create", [...state, action.data])
    return [...state, action.data]
  case 'TASK_UPDATE':
    return state;
  case 'TASK_DELETE':
    console.log(action.data)
    return state.filter(t => t.id != action.task_id);
  default:
    return state;
  }
}

function users(state=[], action) {
  switch (action.type) {
  case 'USER_LIST':
    return action.data;
  case 'USER_CREATE':
    return [...state, action.data];
  default:
    return state;
  }
}


function session(state = null, action) {
  switch (action.type) {
  case 'NEW_SESSION':
    return action.data;
  case 'DELETE_SESSION':
    return null;
  default:
    return state;
  }
}

let login_form0 = {name: "", password: ""};
function login_form(state = login_form0, action) {
  return state;
}


function root_reducer(state0, action) {
  //console.log("reducer", state0, action);

  let reducer = combineReducers({task: tasks,users: users,session: session});
  let state1 = reducer(state0, action);

  console.log("reducer1", state1);

  return deepFreeze(state1);
}

let store = createStore(root_reducer);
export default store;
