import React from 'react'
import { SpinnerCircular } from 'spinners-react'

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen ">
       <SpinnerCircular size={50} thickness={100} speed={100} color="rgba(0, 0, 0, 1)" secondaryColor="rgba(0, 0, 0, 0)" />
      </div>
  )
}

export default Loader