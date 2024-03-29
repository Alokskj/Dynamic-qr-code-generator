import * as React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { QrCodePreview } from "./QrCodePreview";
import {QrForm} from "./QrForm";

export function GenerateQr() {
  const [qrCode, setQrCode] = useState({
    name: "",
    redirectURL: "",
    active: true,
  });
  const [qrCodeURL, setQrCodeURL] = useState()
 
  const handleSubmit = async (e) => {
    
    try {
      e.preventDefault();
      const response = await fetch("/api/v1/qrcode", {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        method: "POST",
        body: JSON.stringify(qrCode),
      });
      const res = await response.json()
      if(res.success){
      toast.success(res.message)
      const imageResponse = await fetch(res.data.qrCodeUrl)
      const blob = await imageResponse.blob()
      setQrCodeURL(URL.createObjectURL(blob))
      }
      else{
        toast.error(res.message)
      }
    } catch (error) {
      console.log(error)
      
    }
  };
  if(qrCodeURL){
    return <QrCodePreview imageUrl={qrCodeURL}/>
  }
  return (
    <QrForm type='Create' handleSubmit={handleSubmit} qrCode={qrCode} setQrCode={setQrCode}/>
  );
}
