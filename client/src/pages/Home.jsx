import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthProvider'
import Header from '../components/Header'

const Home = () => {
  const {user} = useAuth()
  return (
    <>
    <Header />
    <div>Home</div>
    {user ? user.email : 'user not found'}
    </>
  )
}

export default Home