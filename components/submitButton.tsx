"use client";
import React, { PropsWithChildren } from "react";
import { Button } from "@heroui/react";
import { useFormStatus } from "react-dom";

export default function SubmitButton({ children }: PropsWithChildren) {
  const { pending } = useFormStatus();  

  return (
    <Button
      type="submit"
      className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-white font-semibold transition hover:bg-blue-700"
        isDisabled={pending}
    >
      {pending ? "Loading..." : children}
    </Button>
  );
};