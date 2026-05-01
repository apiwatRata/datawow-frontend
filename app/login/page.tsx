import Image from "next/image";
import UserPortalCard from "@/components/cards/user-portal-card";
import AdminPortalCard from "@/components/cards/admin-portal-card";
import { Icon } from "@iconify/react";
import Navbar from "@/components/navbar";

export default function Login() {
  return (
  <>
    <Navbar />
    <div className="grid grid-cols-12 gap-4 pt-20">
    <div className="row-start-2 col-start-4 col-span-6 p-4 font-bold text-3xl flex justify-center items-center">
      Select Access Level
    </div>
    <div className="row-start-3 col-start-4 col-span-6 p-4 flex justify-center items-center">
      Lorem ipsum dolor sit amet consectetur. Elit purus nam.
      </div>
    <div className="row-start-4 col-start-4 col-span-3 p-4"><UserPortalCard/></div>
    <div className="row-start-4 col-start-7 col-span-3 p-4"><AdminPortalCard/></div>
  </div>
  </>
  );
}
