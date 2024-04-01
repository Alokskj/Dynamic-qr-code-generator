import * as React from "react";
import BulkCreateForm from "@/components/BulkCreateForm";
import { useState } from "react";
import { toast } from "react-toastify";

export function BulkCreate() {
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [qrCodes, setQrCodes] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/v1/qrcode/generate-bulk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ count }),
      });

      const res = await response.json();
      if (!res.success) {
        throw new Error(res.message);
      }
      setQrCodes(res.data);
    } catch (err) {
      toast.error(err.message, { toastId: err.message });
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  if (qrCodes) {
    return (
      <>
        <div className="container-max py-6 grid sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6  gap-1">
          {qrCodes.map((qrcode) => {
            return <div key={qrcode._id} className="border rounded-xl  flex flex-col justify-center items-center p-2">
              <div className="qr-id text-xl font-semibold">{qrcode.qrCodeId}</div>
              <img src={qrcode.qrCodeUrl} alt='qr-code' />
            </div>;
          })}
        </div>
      </>
    );
  }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <BulkCreateForm
        handleSubmit={handleSubmit}
        count={count}
        setCount={setCount}
        loading={loading}
      />
    </div>
  );
}
