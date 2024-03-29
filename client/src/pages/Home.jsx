import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthProvider'
import { GenerateQr } from '@/components/GenerateQr'


const Home = () => {
  const {user} = useAuth()
  return (
    <>
    <div className="flex justify-center items-center min-h-[80vh] gap-8">
    <GenerateQr />
    </div>
    </>
  )
}

export default Home