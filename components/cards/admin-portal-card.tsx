'use client';

import { Card, CardHeader, CardFooter, CardContent, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useRouter } from 'next/navigation'

export default function AdminPortalCard() {
  const router = useRouter()
  
    return (
    <Card className="w-full h-full max-w-md shadow-md secondary" 
    >
      <CardHeader className="flex flex-col justify-center items-center gap-4 pt-6">
        <Icon icon="mdi:account-cog" width="60" height="60" 
        />
        <h3 className="text-2xl font-bold "
        >Administrator</h3>
      </CardHeader>

      <CardContent>
        <p className="text-sm " >
          Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida
          porttitor nibh urna sit ornare a. Proin dolor morbi id ornare aenean
          non.
        </p>
      </CardContent>

      <CardFooter className="flex justify-center pb-6">
        <Button
          className="font-bold primary"
          type="button" onClick={() => router.push('/login/admin')}
        >
          Enter Portal <Icon icon="mdi:arrow-right" />
        </Button> 
      </CardFooter>
    </Card>
    )
}
