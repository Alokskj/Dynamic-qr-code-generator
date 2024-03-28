import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "./ui/switch";
import { useState } from "react";
import { toast } from "react-toastify";
import { QrCodePreview } from "./QrCodePreview";

export function QrCreateFrom() {
  const [qrCode, setQrCode] = useState({
    name: "alok",
    redirect: "",
    active: false,
  });
  const [qrCodeURL, setQrCodeURL] = useState()
  const handleChange = (e) => {
    setQrCode((prevValue) => {
      return {
        ...prevValue,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSubmit = async (e) => {
    
    try {
      e.preventDefault();
      console.log(qrCode);
      const response = await fetch("http://localhost:3000/api/v1/qrcode", {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        method: "POST",
        body: JSON.stringify(qrCode),
      });
      const res = await response.json()
      console.log(res)
      if(res.success){
      toast.success(res.message)
      setQrCodeURL(res.data.qrCodeUrl)
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
    <form onSubmit={handleSubmit}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create Qr Code</CardTitle>
          <CardDescription>
            Create your dynamic Qr code in one minute.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={qrCode.name}
                onChange={handleChange}
                placeholder="Name of your Qr code"
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="redirect">Redirect Link</Label>
              <Input
                id="redirect"
                name="redirect"
                value={qrCode.redirect}
                onChange={handleChange}
                placeholder="Enter your redirect link"
                required
              />
            </div>
            <div className="flex items-center gap-x-2 ">
              <Switch
                checked={qrCode.active}
                id="activate"
                name="active"
                onCheckedChange={() =>
                  setQrCode((prevValue) => {
                    return { ...prevValue, active: !prevValue.active };
                  })
                }
              />
              <Label htmlFor="activate">Activate</Label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button type="submit">Create</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
