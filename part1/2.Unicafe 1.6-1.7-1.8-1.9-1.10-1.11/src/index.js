import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const textFeedback = 'Give Feedback'
  const textStatistics = 'Statistics'
  const textGood = 'Good'
  const textNeutral = 'Neutral'
  const textBad = 'Bad'

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const statistics = {
    textGood: textGood,
    textNeutral: textNeutral,
    textBad: textBad,
    good: good,
    neutral: neutral,
    bad: bad
  }

  return (
    <div>
      <TextH1 text={textFeedback} />
      <Button handleClick={() => setGood(good + 1)} text={textGood} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={textNeutral} />
      <Button handleClick={() => setBad(bad + 1)} text={textBad} />
      <TextH1 text={textStatistics} />
      <Statistics statistics={statistics} />
    </div>
  )
}

const Statistics = ({ statistics }) => {
  const textNoneStatistics = 'No Feedback Given'
  const textAll = 'All'
  const textAverage = 'Average'
  const textPositive = 'Positive'
  const textGood = statistics.textGood;
  const textNeutral = statistics.textNeutral;
  const textBad = statistics.textBad;

  const good = statistics.good;
  const neutral = statistics.neutral;
  const bad = statistics.bad;

  const total = good + neutral + bad;
  const averageNan = (good * 1 + neutral * 0 + bad * -1) / total;
  const average = isNaN(averageNan) ? '0' : averageNan;
  const positiveNaN = (good / total) * 100;
  const positive = isNaN(positiveNaN) ? '0' : positiveNaN;

  if (total === 0) {
    return <>
      <TextP text={textNoneStatistics} />
    </>
  }

  return <>
    <table>
      <tbody>
        <StatisticLine text={textGood} value={good} />
        <StatisticLine text={textNeutral} value={neutral} />
        <StatisticLine text={textBad} value={bad} />
        <StatisticLine text={textAll} value={total} />
        <StatisticLine text={textAverage} value={average} />
        <StatisticLine text={textPositive} value={positive} />
      </tbody>
    </table>
  </>
}

const TextH1 = ({ text }) => (
  <h1>
    {text}
  </h1>
)

const TextP = ({ text }) => (
  <p>
    {text}
  </p>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>
      {text}
    </td>
    <td>
      {value}
    </td>
  </tr>
)

ReactDOM.render(<App />,
  document.getElementById('root')
)