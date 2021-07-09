defmodule Gbalbeat.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      Gbalbeat.Repo,
      # Start the Telemetry supervisor
      GbalbeatWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: Gbalbeat.PubSub},
      # Start the Endpoint (http/https)
      GbalbeatWeb.Endpoint,
      # Start a worker by calling: Gbalbeat.Worker.start_link(arg)
      # {Gbalbeat.Worker, arg}
      GbalbeatWeb.Presence,
      {Redix, name: :redix}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Gbalbeat.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    GbalbeatWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
