import * as React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { QrCodePreview } from "./QrCodePreview";
import {QrForm} from "./QrForm";
import { useNavigate } from "react-router-dom";

export function GenerateQr() {
  const navigate = useNavigate()
  const [qrCode, setQrCode] = useState({
    name: "",
    redirectURL: "",
    active: true,
  });
 
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
      const blobUrl = URL.createObjectURL(blob)
      navigate('/preview', { state: { imageUrl: blobUrl } });
      }
      else{
        toast.error(res.message)
      }
    } catch (error) {
      console.log(error)
      
    }
  };
  return (
    <QrForm type='Create' handleSubmit={handleSubmit} qrCode={qrCode} setQrCode={setQrCode}/>
  );
}
