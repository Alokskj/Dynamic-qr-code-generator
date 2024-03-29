import Loader from "@/components/Loader";
import { QrForm } from "@/components/QrForm";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateQr = () => {
    const navigate = useNavigate()
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    const fetchQrCodeDetails = async () => {
      try {
        const response = await fetch(`/api/v1/qrcode/${id}`, {
          credentials: "include",
        });
        const res = await response.json();
        if (res.success) {
          setQrCode(res.data);
          setLoading(false)
        } else {
          toast.error(res.message);
          
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchQrCodeDetails();
  }, [id]);

  const handleQrCodeUpdate = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(`/api/v1/qrcode/${qrCode.qrCodeId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        method: "PATCH",
        body: JSON.stringify(qrCode),
      });
      const res = await response.json();
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
        
      }
    } catch (error) {
      console.log(error);
    }
  };
  if(loading){
    return <Loader />
  }
  return (
    <div className="flex justify-center items-center min-h-screen">

    <QrForm
    type='Update'
    setQrCode={setQrCode}
    qrCode={qrCode}
    handleSubmit={handleQrCodeUpdate}
    />
    </div>
  );
};

export default UpdateQr;
