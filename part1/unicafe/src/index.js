import React, { useState } from 'react'
import ReactDOM from 'react-dom'

//const handleLeftClick = () => {    setAll(allClicks.concat('L'))    setLeft(left + 1)  };

const Statistics = ({good, bad, neutral}) => {
    if (good+bad+neutral === 0) {
        return (
          <div>
            <h3>No feedback given yet</h3>
          </div>
        )
      }  

    return (
    <div>
        <table>
            <tbody>
                <Statistic name="good" value={good} /> 
                <Statistic name="bad" value={bad} /> 
                <Statistic name="neutral" value={neutral} /> 
                <Statistic name="average" value={good+neutral+bad / 3} /> 
                <Statistic name="positive" value={good / (good+neutral+bad) * 100} />  
            </tbody>
        </table>     
       
    </div>
)
}

const Statistic = (props) => {    

    return (
          
        <tr>     
            <td> {props.name}</td>
            <td>{props.value}</td>
        </tr> 
        
    )
}

const Button = ({onClick, text}) => {
    return (
        <button onClick={onClick}>  {text}  </button>
    )
}



const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(2)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
      setGood(good+ 1);
  }

  const handleNeutralClick = () => {
    setNeutral(neutral+ 1);
}

const handleBadClick = () => {
    setBad(neutral+ 1);
}

  return (
    <div>
        <h1>Give feedback</h1>
     <Button onClick={handleGoodClick} text='good' />
     <Button onClick={handleNeutralClick} text='neutral' />
     <Button onClick={handleBadClick} text='bad' />    

     <h1>Statistics</h1>

     <Statistics 
        good = {good}
        neutral = {neutral}
        bad= {bad}
     />
     
    
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)