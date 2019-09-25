import React from 'react'
import ReactDOM from 'react-dom'

import Header from './Header'
import Content from './Content'
import Total from './Total'

const course = 'Half Stack application development'

const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

const App = () => {
    // const-definitions
  
    return (
      <div>
        <Header course={course} />
        <Content parts={parts}  />
        <Total  parts={parts}  />   

       
      </div>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'))