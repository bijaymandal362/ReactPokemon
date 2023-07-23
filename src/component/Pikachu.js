import React from 'react'

function Pikachu({url, name}) {
  return (
    <div className='pikachu'>
        <img src={url} alt={name} />
        <h3>{name}</h3>
    </div>
  )
}

export default Pikachu