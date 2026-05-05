"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { Icon } from "@iconify/react";

interface SidebarProps {
  role?: "User" | "Admin";
}

export default function Sidebar({ role = "User" }: SidebarProps) {
  const router = useRouter();

  const handleSwitchToAdmin = () => {
    if (role === "User") {
      router.push("/dashboard");
    } else {
      router.push("/home");
    }
  };

  return (
    <div className="w-52 bg-white min-h-screen px-4 py-6 border-r border-slate-200 flex flex-col">
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-slate-900">{role}</h2>
      </div>

      
      <div className="flex-1 space-y-2">
        <Button
          fullWidth
          color="default"
          variant="flat"
          onClick={() => router.push(role === "User" ?"/home":"/dashboard")}
          className="justify-start rounded-xl px-3 py-3 text-slate-900 text-sm font-medium hover:bg-slate-100 transition-colors"
          startContent={<Icon icon="mdi:home" width="20" height="20" className="text-slate-600" />}
        >
          Home
        </Button>

        {role === "Admin" ? 
        (
        <Button
          fullWidth
          color="default"
          variant="flat"
           onClick={() => router.push("/dashboard/history")}
          className="justify-start rounded-xl px-3 py-3 text-slate-900 text-sm font-medium hover:bg-slate-100 transition-colors"
        >
          History
        </Button> 
      ): ""}

        <Button
          fullWidth
          color="default"
          variant="flat"
          onClick={handleSwitchToAdmin}
          className="justify-start rounded-xl px-3 py-3 text-slate-900 text-sm font-medium hover:bg-slate-100 transition-colors"
          startContent={
            role === "User" ? (
              <Icon icon="mdi:crown" width="20" height="20" className="text-slate-600" />
            ) : (
              <Icon icon="mdi:account" width="20" height="20" className="text-slate-600" />
            )
          }
        >
          {role === "User" ? "Switch to Admin" : "Switch to User"}
        </Button>
      </div>

      {/* Logout Button */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <Button
          fullWidth
          color="default"
          variant="flat"
          // onClick={handleLogout}
          className="justify-start rounded-xl px-3 py-3 text-slate-900 text-sm font-medium hover:bg-slate-100 transition-colors"
          startContent={<Icon icon="mdi:logout" width="20" height="20" className="text-slate-600" />}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
