
defmodule GbalbeatWeb.PageController do
  require Logger


  # def index(conn, %{"id" => prev_id}) do 
  #   room = prev_id
  #   render(conn, "index.html", id: room)

  # end


  use GbalbeatWeb, :controller

  def index(conn, params) do
      room = params["id"] || UUID.uuid1()
      Logger.info room
      render(conn, "index.html", id: room)
    
  end
end
