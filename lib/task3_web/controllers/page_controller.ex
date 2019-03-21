defmodule Task3Web.PageController do
  use Task3Web, :controller

  def index(conn, _params) do
      tasks = Task3.Tasks.list_task()
      |> Enum.map(&(Map.take(&1, [:id, :title, :desc, :user])))
      render conn, "index.html", tasks: tasks
  end

end
