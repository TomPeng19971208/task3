defmodule Task3.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset

  schema "task" do
    field :description, :string
    field :finished, :boolean, default: false
    field :time, :integer
    field :title, :string
    belongs_to :user, Task3.Users.User


    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :description, :time, :finished, :user_id])
    |> validate_required([:title, :description, :time, :finished])
  end
end
