import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Link } from "react-router-dom"

export function QrCodePreview({imageUrl}) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Qr Code</CardTitle>
        <CardDescription>Qr code generated successfully.</CardDescription>
      </CardHeader>
      <CardContent className='flex justify-center items-center '>
        <img src={imageUrl} className=""/>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Print</Button>
        <a href={imageUrl} download='true'><Button>Download</Button></a>
      </CardFooter>
    </Card>
  )
}
