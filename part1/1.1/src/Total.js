import React from 'react'
import ReactDOM from 'react-dom'

const Total = (props) => {

   // let [first, second, third] = props.parts;
    let first = props.parts[0];
    let second = props.parts[1];
    let third = props.parts[2];


    return (
        <div>
            <p>Number of exercises {first.exercises + second.exercises + third.exercises}</p>
        </div>
    )
}

export default Total;