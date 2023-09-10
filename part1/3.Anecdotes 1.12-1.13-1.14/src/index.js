import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const points = Array(6).fill(0);

const App = (props) => {
  const textVoteAnecdote = 'Vote'
  const textNextAnecdote = 'Next Anecdote'
  const textAnecdoteDay = 'Anecdote of the day'
  const textAnecdoteMost = 'Anecdote with most votes'
  const textVotingNotStarted = 'Voting not started'

  const [selected, setSelected] = useState(0)
  const [mostVoted, setMostVoted] = useState(-1)
  const [allPoints, setPoints] = useState(points)

  const voteSum = () => {
    const copy = [...allPoints]
    copy[selected] += 1
    setMostVoted(getMostVoted(copy));
    setPoints(copy);
  }

  const getRandom = (max) => Math.floor(Math.random() * max)

  const nextAnecdote = () => setSelected(getRandom(6))

  const getMostVoted = (array) => array.indexOf(Math.max(...array))
  
  return (
    <div>
      <TextH1 text={textAnecdoteDay} />
      <p>{props.anecdotes[selected]}</p>
      <p>{'Has ' + allPoints[selected] + ' Votes'}</p>
      <Button handleClick={() => voteSum()} text={textVoteAnecdote} />
      <Button handleClick={() => nextAnecdote()} text={textNextAnecdote} />
      <TextH1 text={textAnecdoteMost} />
      <p>{mostVoted === -1 ? textVotingNotStarted : props.anecdotes[mostVoted]}</p>
      <p>{mostVoted === -1 ? '' : 'Has ' + allPoints[mostVoted] + ' Votes'}</p>
    </div>
  )
}

const TextH1 = ({ text }) => (
  <h1>
    {text}
  </h1>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)