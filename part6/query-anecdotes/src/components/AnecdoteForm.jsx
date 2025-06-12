import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../requests.js";
import { useNotificationDispatch } from "../NotificationContext.jsx";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const notificationDispatch = useNotificationDispatch();

  const handleError = (error) => {
    console.log(error);
    notificationDispatch({ content: error.response.data.error });
  };

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 }, { onError: handleError });
    notificationDispatch({
      content: `anecdote '${content}' created`,
    });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
