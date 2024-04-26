import React from 'react'

function Logo({width = '100px',text='logo',fontSize=''}) {
  return (
    <div className={`font-[${fontSize}]`}>{text}</div>
  )
}

export default Logo