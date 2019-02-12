import React, { Component } from 'react';
import '../styles/App.css';
import { DefaultScreen } from './DefaultScreen';
import { Question } from './Question';
import { ScoreScreen } from './ScoreScreen';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {
          msg: '',
          color: ''
        },
      mathType: 1,
      range: 12,
      questions: '',
      qCount: 0,
      score: 0,
      scoreBoard: [],
      display: 'params',
      button: 'Submit',
      select: false,
    }
  }

  updateInput(e) {
    const input = e.target.id === 'range'? { range: e.target.value } : e.target.id === 'questions'? { questions: e.target.value } : { answer: e.target.value }
    this.setState(input)
  }
  // toggleMathType(right) {
  //   const mathType = this.state.mathType === 1? right? 2 : 3 : this.state.mathType === 2? right? 3 : 1 : right? 1 : 2;
  //   this.setState({mathType: mathType})
  // }
  changeMathType(option) {
    this.setState({mathType: option})
  }
  clearError() {
    this.setState({
      error: {
        msg: '',
        color: ''
      }
    })
  }
  scoreSwitch() {
    this.clearError();
    this.setState({
      showScore: true,
      // focus: 'new',
    })
  }
  newQuiz() {
    this.clearError();
    this.setState({
      display: 'params',
      // focus: 'questions',
      score: 0,
      qCount: 0,
      scoreBoard: [],
    })
  }

  initialize() {
    if (isNaN(this.state.range) || this.state.range < 1 || this.state.range === '' ||
      isNaN(this.state.questions) || this.state.questions < 1 || this.state.questions === ''
    ) {
      this.setState({error: {
        msg: 'INPUT ERROR! Must enter positive integer',
        color: '#f00'
      }})
    } else {
      this.randomInt();
      this.setState({
        display: 'question',
        // focus: 'answer',
        showScore: false,
      });
    }
  }
  randomInt() {
    this.clearError();
    let op;
    switch (this.state.mathType) {
      case 1:
        op = Math.random() < 0.5? '  +  ' : '  -  ';
        break;
      case 2:
        op = '  x  ';
        break;
      case 3:
        op = '  /  ';
        break;
        default: break;
    }
    var base = this.state.mathType === 1? 1 : 2;
    var sub = this.state.mathType === 1? 0 : 1;
    this.setState(prevState => {
      return {
        rand1: Math.floor((Math.random() * (this.state.range - sub)) + base),
        rand2: Math.floor((Math.random() * (this.state.range - sub)) + base),
        op: op,
        qCount: prevState.qCount + 1,
        button: 'Submit',
        answer: '',
      }
    })
  }
  quizResult() {
    let result = false;
    switch (this.state.op) {
      case '  +  ':
        result = this.state.rand1 + this.state.rand2;
        break;
      case '  -  ':
        result = this.state.rand1 - this.state.rand2;
        break;
      case '  x  ':
        result = this.state.rand1 * this.state.rand2;
        break;
      case '  /  ':
        result = this.state.rand1;
        break;
      default: break;
    }
    this.setState(prevState => {
      prevState.scoreBoard.push([
        this.mathType === 3? this.state.rand1 * this.state.rand2 : this.state.rand1,
        this.state.op, this.state.rand2, result, this.state.answer])
      return {
      error: result === parseInt(this.state.answer)? {
        msg: 'CORRECT',
        color: '#0a0',
      } : {
        msg: 'INCORRECT! The answer is ' + result,
        color: '#f00',
      },
      score: result === parseInt(this.state.answer)? prevState.score + 1 : prevState.score,
      button: 'Next Question',
      display: this.state.qCount < this.state.questions? 'question' : 'score',
      // focus: this.state.qCount < this.state.questions? 'answer' : 'score',
      }
    });
  }

  display() {
    if (this.state.display === 'params') {
      return <DefaultScreen
        mathType={this.state.mathType}
        range={this.state.range}
        questions={this.state.questions}
        updateInput={this.updateInput.bind(this)}
        initialize={this.initialize.bind(this)}
        changeMathType={this.changeMathType.bind(this)}
        // focus={this.state.focus}
        // toggleMathType={this.toggleMathType.bind(this)}
        select={this.state.select}
      />
    } else if (this.state.display === 'question') {
      return <Question
        qCount={this.state.qCount}
        range={this.state.range}
        questions={this.state.questions}
        mathType={this.state.mathType}
        updateInput={this.updateInput.bind(this)}
        quizResult={this.quizResult.bind(this)}
        button={this.state.button}
        rand1={this.state.rand1}
        rand2={this.state.rand2}
        op={this.state.op}
        randomInt={this.randomInt.bind(this)}
        answer={this.state.answer}
        // focus={this.state.focus}
      />
    } else if (this.state.display === 'score') {
      return <ScoreScreen
        score={this.state.score}
        questions={this.state.questions}
        newQuiz={this.newQuiz.bind(this)}
        op={this.state.op}
        scoreSwitch={this.scoreSwitch.bind(this)}
        showScore={this.state.showScore}
        scoreBoard={this.state.scoreBoard}
        // focus={this.state.focus}
      />
    }
  }

  componentDidMount() {
    this.nameInput.focus();
  }

  render() {
    return (
      <div>
        <div className="game-box react">
          {this.display()}
        </div>
        <p id="msgBox" className="messages" style={{
          color: this.state.error.color,
          textShadow: '.3px .3px .7px #aaa'
        }}>{this.state.error.msg}</p>
        <input ref={(input) => { this.nameInput = input }}></input>
      </div>
    )
  }
}

export default App;
