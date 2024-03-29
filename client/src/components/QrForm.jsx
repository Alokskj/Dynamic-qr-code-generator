import React from 'react'
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
import { Switch } from "./ui/switch";
export const QrForm = ({type, handleSubmit, qrCode, setQrCode}) => {
  const handleChange = (e) => {
    setQrCode((prevValue) => {
      return {
        ...prevValue,
        [e.target.name]: e.target.value,
      };
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{type} Qr Code</CardTitle>
          <CardDescription>
            {type} your dynamic Qr code in one minute.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={qrCode?.name}
                onChange={handleChange}
                placeholder="Name of your Qr code"
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="redirectURL">Redirect URL</Label>
              <Input
                id="redirectURL"
                name="redirectURL"
                value={qrCode?.redirectURL}
                onChange={handleChange}
                placeholder="Enter your redirect URL"
                required
              />
            </div>
            <div className="flex items-center gap-x-2 ">
              <Switch
                checked={qrCode?.active}
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
          <Button type="submit">{type}</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
