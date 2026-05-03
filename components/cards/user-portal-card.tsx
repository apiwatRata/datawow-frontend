'use client';

import { Card, CardHeader, CardFooter, CardContent, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

import { useRouter } from 'next/navigation'

export default function UserPortalCard() {
  const router = useRouter()

    return (
    <Card className="w-full h-full max-w-md shadow-md primary">
      <CardHeader className="flex flex-col justify-center items-center gap-4 pt-6">
        <Icon icon="mdi:account-box-outline" width="60" height="60" 
        />
        <h3 className="text-2xl font-bold" 
        >User</h3>
      </CardHeader>

      <CardContent>
        <p className="text-sm" >
          Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida
          porttitor nibh urna sit ornare a. Proin dolor morbi id ornare aenean
          non.
        </p>
      </CardContent>

      <CardFooter className="flex pb-6 justify-center">
        <Button
          className="font-bold secondary"
          type="button" onClick={() => router.push('/login')}
        >
          Enter Workspace <Icon icon="mdi:arrow-right" />
        </Button> 
      </CardFooter>
    </Card>
    )
}