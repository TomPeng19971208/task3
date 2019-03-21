defmodule Task3.Repo do
  use Ecto.Repo,
    otp_app: :task3,
    adapter: Ecto.Adapters.Postgres
end
