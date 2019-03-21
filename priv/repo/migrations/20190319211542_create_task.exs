defmodule Task3.Repo.Migrations.CreateTask do
  use Ecto.Migration

  def change do
    create table(:task) do
      add :title, :string, null: false
      add :description, :string, null: false
      add :time, :integer, default: 0
      add :finished, :boolean, default: false, null: false
      add :user_id, references(:users, on_delete: :delete_all)

      timestamps()
    end

    create index(:task, [:user_id])
  end
end
