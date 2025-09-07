import React from 'react'

const Container = ({children}) => {
  return (
    <div className='w-full flex items-center justify-center' >
        <div className='w-full max-w-[1440px]'>
            {children}
        </div>
    </div>
  )
}

export default Container