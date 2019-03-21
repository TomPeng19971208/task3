defmodule Task3Web.Router do
  use Task3Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Task3Web do
    pipe_through :api
    resources "/users", UserController, except: [:new, :edit]
    resources "/task", TaskController, except: [:new, :edit]
    post "/auth", AuthController, :authenticate
  end

  scope "/", Task3Web do
    pipe_through :browser

    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", Task3Web do
  #   pipe_through :api
  # end
end
