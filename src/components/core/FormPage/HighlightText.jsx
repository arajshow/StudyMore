import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className=' font-inter text-md bg-gradient-to-r from-blue-100 to-blue-50 text-transparent bg-clip-text'>
        {text}
    </span>
  )
}

export default HighlightText

