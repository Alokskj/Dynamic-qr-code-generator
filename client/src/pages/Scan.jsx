import { QrCodeScan } from '@/components/QrCodeScan'
import React from 'react'

const Scan = () => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
        <QrCodeScan />
    </div>
  )
}

export default Scan