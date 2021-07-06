defmodule Gbalbeat.Repo do
  use Ecto.Repo,
    otp_app: :gbalbeat,
    adapter: Ecto.Adapters.Postgres
end
