import React from 'react';

export const DefaultScreen = (props) => {
  const addsub = React.createElement('input',{
    type: 'radio',
    name: "mathType",
    checked: props.mathType === 1? true : false,
    value: 1,
    onChange: () => { props.changeMathType(1) }
  });
  const multi = React.createElement('input',{
    type: 'radio',
    name: "mathType",
    checked: props.mathType === 2? true : false,
    value: 2,
    onChange: () => { props.changeMathType(2) }
  });
  const divide = React.createElement('input',{
    type: 'radio',
    name: "mathType",
    checked: props.mathType === 3? true : false,
    value: 3,
    onChange: () => { props.changeMathType(3) }
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
        {addsub}
        {multi}
        {divide}
      </div>
      <button type="button" id="start" onClick={() => {props.initialize()}} onKeyPress={e => {e.preventDefault()}}>Let's do some math!</button>
    </div>
  )
}
