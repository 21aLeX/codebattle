defmodule Codebattle.UsersActivityServer do
  @moduledoc "Gen server for collect actions from users"

  use GenServer

  alias Codebattle.Analitics
  require Logger

  @max_size Application.get_env(:codebattle, Codebattle.AnaliticsServer)[
              :max_size_activity_server
            ]

  # API
  def start_link() do
    GenServer.start_link(__MODULE__, [], name: __MODULE__)
  end

  def add_event(%{user_id: user_id}) when user_id < 0, do: :ok

  def add_event(params) do
    event =
      params
      |> Map.put(:date, NaiveDateTime.utc_now())
      |> Map.update!(:user_id, fn
        "anonymous" -> nil
        name -> name
      end)

    GenServer.cast(__MODULE__, {:add_event, event})
  end

  def get_events(), do: GenServer.call(__MODULE__, :get_events)

  def reset(), do: GenServer.call(__MODULE__, :reset)

  # SERVER
  def init(state) do
    Logger.info("Start Events Server")
    {:ok, state}
  end

  def handle_cast({:add_event, event}, events)
      when length(events) >= @max_size do
    Analitics.store_user_events([event | events])
    {:noreply, []}
  end

  def handle_cast({:add_event, event}, events), do: {:noreply, [event | events]}

  def handle_call(:get_events, _from, events), do: {:reply, events, events}

  def handle_call(:reset, _from, _events), do: {:reply, [], []}
end
