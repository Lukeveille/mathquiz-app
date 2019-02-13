import React from 'react';

export const DefaultScreen = (props) => {
  const radioBtns = [1,2,3].map(num => {
    return React.createElement('input',{
      type: 'radio',
      name: "mathType",
      checked: props.mathType === num? true : false,
      value: num,
      onChange: () => { props.changeMathType(num) }
    });
  });
  return (
    <div>
      Highest integer you'd like to see:
      <input id="range" value={props.range} type="text" size="5" autoComplete="off" onChange={e => props.updateInput(e)} />
      How many questions?
      <input id="questions" value={props.questions} type="text" size="5" autoComplete="off" onChange={e => props.updateInput(e)} />
      <div id="mathType">
        <p>Add/Subtract</p>
        <p>Multiplication</p>
        <p>Division</p>
        {radioBtns}
      </div>
      <button type="button" id="start" onClick={() => {props.initialize()}} onKeyPress={e => {e.preventDefault()}}>Let's do some math!</button>
    </div>
  )
}
