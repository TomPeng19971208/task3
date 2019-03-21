defmodule Task3Web.TaskView do
  use Task3Web, :view
  alias Task3Web.TaskView

  def render("index.json", %{task: task}) do
    %{data: render_many(task, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      title: task.title,
      description: task.description,
      time: task.time,
      finished: task.finished,
      user_id: task.user_id
    }
  end
end
