import Loader from '@/components/Loader'
import QrCodeUserCard from '@/components/cards/QrCodeUserCard'
import useQuery from '@/hooks/useQuery'
import React from 'react'

const UserQrCodesPage = () => {
  const {data : qrCodes,isLoading, error} = useQuery('/api/v1/qrcode')
  if(isLoading){
    return <Loader />
  }
  if(error){
    return <div className='min-h-screen flex items-center justify-center text-2xl text-red-500'><p>Something went wrong!</p></div>
  }
  if(qrCodes.length == 0){
    return <div className='min-h-screen flex items-center justify-center text-2xl '><p>You do not have any Qr codes!</p></div>
    
  }
  return (
    <div className='container-max py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
      {qrCodes.map((qrcode)=>{
        return <QrCodeUserCard qrCode={qrcode}/>
      })}
    </div>
  )
}

export default UserQrCodesPage