import React from 'react';

export const Question = (props) => {
  const question = (props.mathType === 3? props.rand1 * props.rand2 : props.rand1) + props.op + props.rand2 + ' = '
  const answerBox = <input id="answer" value={props.answer} size="5" className="qBox" onChange={e => props.updateInput(e)} />
  return (
    <div>
      <p>Question {props.qCount} / {props.questions}</p>
      {question}{answerBox}
      <p>
        <button id="submit" type="button" onClick={() => {props.button === 'Submit'? props.quizResult() : props.randomInt() }} onKeyPress={e => {e.preventDefault()}}>{props.button}</button>
      </p>
    </div>
  )
}
