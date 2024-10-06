import { useState } from 'react'

const Statistics = ({ good,neutral,bad }) => {
   const total = good + neutral + bad
    if( total == 0) {
	return (
	    <div>
		<p>No feedback given</p>
	    </div>
	)
    }
    return (
	<div>
	<table>
	<tbody>
	<StatisticsLine category="good" value={good} />
	<StatisticsLine category="neutral" value={neutral} />
	<StatisticsLine category="bad" value={bad} />
	<StatisticsLine category="all" value={total} />
	<StatisticsLine category="average" value={(good-bad)/total} />
	<StatisticsLine category="positive" value={(good/total)* 100} />
	</tbody>
	</table>
	</div>
    )
}



const StatisticsLine = ({ category,value }) => {
    if(category === "positive") {
	return (
	<tr>
		<td>{category}</td><td>{value} %</td>
	</tr>
	)
	}
    return (
	<tr>
	    <td>{category}</td><td>{value}</td>
	</tr>
    )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good+neutral+bad

  const handleGood = () => {
	setGood(good+1)
  }

  const handleNeutral = () => {
	setNeutral(neutral+1)
  }

  const handleBad= () => {
	setBad(bad+1)
  }

  return (
    <div>
	<h1>give feedback</h1>
	<button onClick={handleGood}>good</button>
	<button onClick={handleNeutral}>neutral</button>
	<button onClick={handleBad}>bad</button>
	<h2>statistics</h2>
	<Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App
