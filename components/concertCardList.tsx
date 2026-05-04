"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardHeader, CardContent, CardFooter, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { Icon } from "@iconify/react";
import { getConcerts } from '@/lib/concerts';
import { booking, cancel } from "@/lib/reservations";
import ModalTest from '@/components/modals/modal';


const PAGE_SIZE = 10;


export default function ConcertCardList() {
  const [page, setPage] = useState(1);
  const [concerts, setConcerts] = useState<any[]>([]);
  const [detail, setDetail] = useState({});
  const pageCount = Math.ceil(detail.total / PAGE_SIZE);

  useEffect(() => {
    const loadConcerts = async () => {
        try {
            const data = await getConcerts();
            if (Array.isArray(data.data) && data.data.length > 0) {
                setConcerts(data.data);
                setDetail(data);
            }
        } catch (err) {
            console.error("Failed to load concerts", err);
        }
    };
    loadConcerts();
  }, []);

  const currentConcerts = useMemo(
    () => concerts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [page, concerts]
  );

  const handleConfirm = async (action : string, concert : any) => {
        try{
            if(action === 'book'){
                await booking(concert.id)
            } else if(action === 'cancel') {
                await cancel(concert.reservations.id)
            } else return null;

            const data = await getConcerts();
            if (Array.isArray(data) && data.length > 0) {
                setConcerts(data);
            }
            return true;
        } catch (err) {
            console.error("Failed to load concerts", err);
        }
   };

  return (
    <div className="flex-1 p-4">
      <div className="flex items-center justify-between mb-4 gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Concert List</h2>
          <p className="text-sm text-slate-500">Showing {page * 10} of {detail.total} events</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            color="default"
            variant="flat"
            className="rounded-xl px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            type="button"
            color="default"
            variant="flat"
            className="rounded-xl px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            onClick={() => setPage((prev) => Math.min(prev + 1, pageCount))}
            disabled={page === pageCount}
          >
            Next
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {currentConcerts.map((concert) => (
          <>
          <Card
            key={concert.id}
            className="min-h-[220px] rounded-3xl border border-slate-200 bg-white shadow-sm"
          >
            <CardHeader className="space-y-3 px-4 pt-4">
              <div className="flex items-center gap-2 text-slate-500">
                <Icon icon="mdi:music" width="18" height="18" />
                <span className="text-sm font-medium">Live Event</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{concert.name}</h3>
            </CardHeader>

            <CardContent className="px-4 pb-4 text-sm text-slate-600">
              <p>{concert.description}</p>
            </CardContent>

            <CardFooter className="flex items-center justify-between gap-3 px-4 pb-4 pt-2">
              <div className="flex items-center gap-2 text-slate-700 text-sm">
                <Icon icon="mdi:account" width="18" height="18" />
                <span>{concert.total_seats - concert.reserved_seats}</span>
              </div>
              <ModalTest action={concert.reservations.id? "cancel" : "book"} handleConfirm={handleConfirm} concert={concert} />
            </CardFooter>
          </Card>
        </>
        ))}
      </div>
         
    </div>
  );
}
