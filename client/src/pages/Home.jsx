import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthProvider'
import Header from '../components/Header'
import { QrCreateFrom } from '@/components/QrCreateFrom'
import { QrCodePreview } from '@/components/QrCodePreview'


const Home = () => {
  const {user} = useAuth()
  return (
    <>
    <Header />
    <div className="flex justify-center items-center h-screen gap-8">
    <QrCreateFrom />
    </div>
    </>
  )
}

export default Home