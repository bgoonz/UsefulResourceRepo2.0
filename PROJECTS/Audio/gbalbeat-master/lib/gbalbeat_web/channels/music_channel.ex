defmodule GbalbeatWeb.MusicChannel do
    use Phoenix.Channel
    require Logger
    alias GbalbeatWeb.Presence
    
    

    def join("music:" <> _id, msg, socket) do
        
        send(self(), :after_join)
        # packets = redis.lrange("packets", -50000, -1)


        {:ok, socket}
    end

    def handle_in("new:msg", msg, socket) do
        Logger.info(msg)
        {:ok, result} = JSON.encode(msg)
        Redix.command!(:redix, ["RPUSH", msg["room"], result])
        broadcast!(socket, "new:msg", msg)
        {:noreply, socket}
    end

    def handle_info(:after_join, socket) do
        packets = Redix.command!(:redix, ["LRANGE", socket.assigns.room, 0, -1])
        broadcast!(socket, "new:msg", %{packets: packets})

        {:ok, _} = Presence.track(socket, socket.assigns.user_id, %{
          online_at: inspect(System.system_time(:second))
        })
    
        push(socket, "presence_state", Presence.list(socket))
        {:noreply, socket}
      end

  end