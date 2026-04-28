import Image from "next/image";
import SignInForm from "@/components/cards/user-portal-card";
import { Icon } from "@iconify/react";

export default function Home() {
  return (
  <div className="grid grid-cols-12 gap-4">
    <div className="bg-gray-200 col-span-2 p-4 font-bold" style={{color:"#007BFF"}}>
       <div className="flex items-center gap-2">
          <Icon icon="mdi:circle" /> 
          <span>Brand</span>
        </div>
      </div>
    <div className="row-start-2 col-start-4 col-span-6 bg-gray-200 p-4 font-bold text-3xl flex justify-center items-center">
      Select Access Level
    </div>
    <div className="row-start-3 col-start-4 col-span-6 bg-gray-200 p-4 flex justify-center items-center">
      Lorem ipsum dolor sit amet consectetur. Elit purus nam.
      </div>
    <div className="row-start-4 col-start-2 col-span-5 bg-gray-200 p-4"><SignInForm/></div>
    <div className="row-start-4 col-span-5 bg-gray-200 p-4">05</div>
  </div>
  );
}
