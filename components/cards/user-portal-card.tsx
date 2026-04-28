'use client';

import { Card, CardHeader, CardFooter, CardContent, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

export default function SignInForm() {
    return (
    <Card className="w-full max-w-md shadow-md" style={{color:"#007BFF"}}>
      <CardHeader className="flex justify-center items-start gap-2">
        <Icon icon="mdi:account-box-outline" width="60" height="60" color="#007BFF" />
        <h3 className="text-lg font-bold">User</h3>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-600" >
          Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida
          porttitor nibh urna sit ornare a. Proin dolor morbi id ornare aenean
          non.
        </p>
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button
          color="primary"
        >
          Enter Workspace <Icon icon="mdi:arrow-right" />
        </Button> 
      </CardFooter>
    </Card>
    )
}