import { useState } from "react";

const Button = ({ onClick, text }) => {
  return (
    <button type="button" onClick={onClick}>
      {text}
    </button>
  );
};

const Stat = ({ name, value }) => {
  return (
    <div>
      <p>{name} {value}</p>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Stat name="good" value={good} />
      <Stat name="neutral" value={neutral} />
      <Stat name="bad" value={bad} />
    </div>
  );
};

export default App;
