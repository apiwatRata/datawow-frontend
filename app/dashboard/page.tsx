"use client"
import Sidebar from '@/components/sidebar';
import { useEffect, useState } from "react";
import { getSeats } from '@/lib/concerts';
import { getCancelledSeats } from '@/lib/reservations';
import TotalSeatCardList from '@/components/totalSeatCardList';
import AdminConcertCardList from '@/components/cards/adminConcertCardList';
export default function Dashboard() {
    const [total_seats, setTotalSeats] = useState<number>(0);
    const [reserve_seats, setReserveSeats] = useState<number>(0);
    const [cancelled_seats, setCancelledSeats] = useState<number>(0);

    useEffect(() => {
    const loadConcerts = async () => {
        try {
            const data = await getSeats();
            const cancelled = await getCancelledSeats();
            setCancelledSeats(cancelled.cancelled_seats);
            setTotalSeats(data.total_seats);
            setReserveSeats(data.reserve_seats);
        } catch (err) {
            console.error("Failed to load concerts", err);
        }
    };
    loadConcerts();
      }, []);

  return (
    <div className="min-h-screen bg-slate-50">
        <div className="flex">
            <Sidebar role="Admin" />
            <div className="flex-1">
                 <div className="mt-10 px-6">
                    <TotalSeatCardList 
                    total_seats={total_seats}
                    reserve_seats={reserve_seats}
                    cancelled_seats={cancelled_seats}
                      />
                </div>
                <div className="mt-10 px-6">
                    <AdminConcertCardList/>
                </div>
            </div>
        </div>
    </div>
  );
}
