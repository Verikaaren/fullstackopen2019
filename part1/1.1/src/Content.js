import React from 'react'

import Part from './Part'


const Content = (props) => {
    let first = props.parts[0];
    let second = props.parts[1];
    let third = props.parts[2];
    
    return (
        <div>
          <Part part={first.name} exercises={first.exercises} />
          <Part part={second.name} exercises={second.exercises} />
          <Part part={third.name} exercises={third.exercises} />
        </div>
    )
}

export default Content;