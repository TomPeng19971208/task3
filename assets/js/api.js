import store from './store';

//adapted from https://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

class TheServer {

  send_get(path, callback) {
    $.ajax(path, {
      method: "get",
      headers: {"x-auth": getCookie("token")},
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: callback,
    });
  }

  send_post(path, data, callback) {
    $.ajax(path, {
      headers: {"x-auth": getCookie("token")},
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: callback,
    });
  }

  list_tasks() {
    //this.create_session("peng", "P@ssw0rd");
    this.send_get(
      "/task",
      (resp) => {
        window.token = resp.data.token;
        store.dispatch({
          type: 'TASK_LIST',
          data: resp.data,
        });
      }
    );
  }

  list_users() {
    this.send_get(
      "/users",
      (resp) => {
        store.dispatch({
          type: 'USER_LIST',
          data: resp.data,
        });
      }
    );
  }

  create_session(name, password) {
    this.send_post(
      "/auth", {"name": name, "password": password},
      (resp) => {
        let temp = "token="+resp.data.token;
        document.cookie=temp;
        store.dispatch({
          type: 'NEW_SESSION',
          data: resp.data,
        });
      }
    );
  }

  delete_session() {
    store.dispatch({
      type: 'DELETE_SESSION',
    });
  }

  create_user() {
    let name = $("#create-user-name").val();
    let password = $("#create-user-password").val();
    let text =  {
        user: {
          name: name,
          password: password,
        },
      };
    this.send_post("/users", text, resp=>{
      store.dispatch({
        type: 'USER_CREATE',
        data: resp.data,
      });
      this.create_session(name, password)
    });
  }

  create_task() {
    let title = $("#create-task-title").val();
    console.log("title", title)
    let description = $("#create-task-description").val();
    let user_id = $("#create-task-user").val();
    let time = $("#create-task-time").val();
    let finished = document.getElementById('create-task-finished').checked;
    if (title=="") {alert("plz enter a title"); return;}
    if (description=="") {alert("plz enter a description"); return;}
    if (time=="") {time="0";}
    if (parseInt(time) % 15 != 0) {alert("time has to be a multiple of 15"); return;}
    let text =  {
        "task": {
          title: title,
          description: description,
          user_id: user_id,
          time: time,
          finished: finished,
        },
      };
    this.send_post("/task", text, (resp) => {
      store.dispatch({
        type: 'TASK_CREATE',
        data: resp.data,
      });
    });
  }

  delete_task(task_id) {
    $.ajax('/task/' + task_id, {
      method: "delete",
      headers: {"x-auth": getCookie("token")},
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: () => {
        store.dispatch({
          type: 'TASK_DELETE',
          task_id: task_id,
        });
      }
    });
  }

  update_task(task) {
    let title = $("#edit-task-title").val();
    let description = $("#edit-task-description").val();
    let user_id = $("#edit-task-user").val();
    let finished = document.getElementById('edit-task-finished').checked;
    console.log(finished);
    let time = $("#edit-task-time").val();
    if (title=="") {alert("plz enter a title"); return;}
    if (description=="") {alert("plz enter a description"); return;}
    if (time=="") {time="0";}
    let text =  JSON.stringify({
      task: {
        title: title,
        description: description,
        user_id: user_id,
        finished: finished,
        time: time,
      },
    });
    console.log("update", text);
    $.ajax('/task/' + task.id, {
      method: "put",
      headers: {"x-auth": getCookie("token")},
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: text,
      success: (resp) => {
        this.list_tasks();
        store.dispatch({
          type: 'TASK_UPDATE',
          task_id: task_id,
        });
      }
    });
  }

  get_task(task_id) {
    this.send_get("/tasks/" + task_id,
      (resp) => {
        store.dispatch({
          type: 'TASK_GET',
          data: resp.data,
        });
      }
    );
  }
}


export default new TheServer();
