import React from 'react'
import ReactDOM from 'react-dom'

const Total = ({parts}) => {
   
   

   const total = parts.reduce( (prev, cur) => {
        

        return prev + cur.exercises; 
      },0)

      

    return (
        <div>
            <p>Number of exercises <b>{total}</b></p>
        </div>
    )
}

export default Total;