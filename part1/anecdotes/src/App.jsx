import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(8).fill(0))


  const nextAnecdote = () => {
    const num = Math.floor(Math.random()*anecdotes.length)
    setSelected(num)
  }

  const handleLike = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const mostVotes = () => {
    let top = 0
    let n = 0
    for(let i=0; i<anecdotes.length; ++i){
	if(points[i] > top){
	   top = points[i]
	   n = i
	}
    }
   console.log(n)
    return n

  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
	<br />
	<p>has {points[selected]} likes</p>
	<button onClick={handleLike}>vote</button>
	<button onClick={nextAnecdote}>next anecdote</button>
	<h2>Anecdote with most votes</h2>
	<p>{anecdotes[mostVotes()]}</p>
    </div>
  )
}

export default App
