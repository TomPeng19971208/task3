#from Nat Tuck's lecture note
defmodule Task3Web.AuthController do
  use Task3Web, :controller

  alias Task3.Users
  alias Task3.Users.User

  action_fallback Task3Web.FallbackController

  def authenticate(conn, %{"name" => name, "password" => password}) do
    with {:ok, %User{} = user} <- Users.authenticate_user(name, password) do
      resp = %{
        data: %{
          token: Phoenix.Token.sign(Task3Web.Endpoint, "user_id", user.id),
          user_id: user.id,
        }
      }
      IO.inspect(resp.data.token)
      conn
      |> put_resp_header("content-type", "application/json; charset=UTF-8")
      |> send_resp(:created, Jason.encode!(resp))
    end
  end
end
