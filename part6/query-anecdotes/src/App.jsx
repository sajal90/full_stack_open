import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getAnecdotes } from "./requests.js";
import AnecdoteForm from "./components/AnecdoteForm.jsx";
import Notification from "./components/Notification.jsx";

const App = () => {
  const handleVote = (anecdote) => {
    console.log("vote");
  };

  const result = useQuery(
    {
      queryKey: ["anecdotes"],
      queryFn: getAnecdotes,
      retry: 1,
    },
  );

  if (result.isError) {
    return (
      <span>Anecdote service not available due to problems in the server</span>
    );
  }

  if (result.isLoading) {
    return <div>Loading....</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
