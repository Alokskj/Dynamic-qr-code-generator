import { Loader2 } from 'lucide-react'
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'

const BulkCreateForm = ({handleSubmit, count,setCount,loading}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create Bulk Qr Codes</CardTitle>
          <CardDescription>Create Bulk qr Codes at once</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="count">Enter Count</Label>
                <Input type="number" min="1" max="30" value={count} onChange={(e)=> setCount(e.target.value)} id="count" placeholder="Qr code count to be generated" />
              </div>
            </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button disabled={loading} >{loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait</> : "Create"}</Button>
        </CardFooter>
      </Card>
          </form>
  )
}

export default BulkCreateForm