import React, { useEffect, useState } from 'react'

const Home = () => {
 
  return (
    <>
    <div>Home</div>
    {user ? user.email : 'user not found'}
    </>
  )
}

export default Home