import React from 'react';

export const ScoreScreen = (props) => {
  const scoreHeader = <thead>
    <tr>
      <th>#</th>
      <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
      <th colSpan="4">Question</th>
      <th>&nbsp;</th>
      <th colSpan="2">Answer</th>
    </tr>
  </thead>

  const scoreBody = props.scoreBoard.map((question, i) => {
    return <tbody key={'score'+i} id="scoreBox">
      <tr></tr>
      <tr>
        <td>{i+1}</td>
        <td>&nbsp;</td>
        <td>{question[0]}</td>
        <td>{question[1]}</td>
        <td>{question[2]}</td>
        <td>=</td>
        <td>&nbsp;</td>
        <td>{question[3]}</td>
        {question[3] === parseInt(question[4])? '' : <td style={{color: '#f00'}}>{question[4] === ''? '-' : question[4]}</td>}
      </tr>
    </tbody>
  });

  const score = <table align="center">{scoreHeader}{scoreBody}</table>;
  return (
    <div>
      <p>YOU SCORED {props.score} / {props.questions}</p>
      {props.showScore? score : <button onClick={() => {
        props.scoreSwitch()
        }}
        onKeyPress={e => {
          e.preventDefault()
        }}
      >
        Quiz Review
      </button>}
      <br />
      <br />
      <button onClick={() => {props.newQuiz()}} onKeyPress={e => {e.preventDefault()}}>New Quiz</button>
    </div>
  )
}
