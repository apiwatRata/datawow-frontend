"use client"
import Sidebar from '@/components/sidebar';
import HistoryTable from '@/components/tables/historyTable';
import { useEffect, useState } from "react";
import TotalSeatCardList from '@/components/totalSeatCardList';
export default function DashboardHistory() {

  return (
    <div className="min-h-screen bg-slate-50">
        <div className="flex">
            <Sidebar role="Admin" />
            <div className="flex-1">
                 <div className="mt-10 px-6">
                    <HistoryTable/>
                </div>
            </div>
        </div>
    </div>
  );
}
