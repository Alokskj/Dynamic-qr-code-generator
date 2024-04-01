import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'

const QrCodeUserCard = ({qrCode}) => {
  const navigate = useNavigate()
  const handlePreviewClick =async () =>{
    const imageResponse = await fetch(qrCode.qrCodeUrl)
    const blob = await imageResponse.blob()
    const blobUrl = URL.createObjectURL(blob)
    navigate('/preview', { state: { imageUrl: blobUrl } });
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>ID : {qrCode?.qrCodeId}</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-y-2 flex-col">
        <div><h3 className='text-lg font-medium'>Name : {qrCode?.name}</h3></div>
        <div className={`${qrCode.active ? 'bg-green-500' : 'bg-slate-600'} w-fit px-4 py-0.5 text-white rounded-xl font-medium`}>{qrCode.active ? "Active" : "Not active"}</div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button onClick={handlePreviewClick} variant="outline">Preview</Button>
        <Link to={`/update-qrcode/${qrCode.qrCodeId}`}><Button>Edit</Button></Link>
      </CardFooter>
    </Card>
  )
}

export default QrCodeUserCard