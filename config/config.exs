# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :task3,
  ecto_repos: [Task3.Repo]

# Configures the endpoint
config :task3, Task3Web.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "gH6kDGaATcazEsIG4rIytFqg67/puhtLizY5pdTALLh1m8pHylmSYkkK3d9+TOeV",
  render_errors: [view: Task3Web.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Task3.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
