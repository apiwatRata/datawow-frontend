"use client"

import {Button, Description, FieldError, Form, Input, Label, TextField, CloseButton, Alert, TextArea} from "@heroui/react";
import SubmitButton from "@/components/submitButton";
import { updateConcerts } from "@/lib/concerts";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

export default function ConcertForm(props : any){
    const {concert} = props;
    const router = useRouter();
    const [state, action] = useActionState(updateConcerts, undefined);
    const [showAlert, setShowAlert] = useState(false);
    const [formData, setFormData] = useState({
        name: concert.name,
        description: concert.description,
        total_seats: Number(concert.total_seats),
        event_date: concert.event_date.split("T")[0],
        id: concert.id,
    });
    console.log('concert',concert);
    useEffect(() => {
        if (state?.success) {
            setShowAlert(true);
            const timer = setTimeout(() => {
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [state, router]);

    return (
        <Form className="space-y-6" action={action}>
            {showAlert && (
            <Alert status="success">
                <Alert.Indicator />
                <Alert.Content>
                <Alert.Title>Edit successfully</Alert.Title>
                </Alert.Content>
                <CloseButton />
            </Alert>
            )}
            <TextField
            className="block space-y-2 text-sm font-medium text-slate-700"
            isRequired
            name="name"
            type="text"
            >
            {state?.message && (
                <p className="text-sm text-red-500">{state.message}</p>
            )}
            <Label>Concert Name</Label>
            <Input className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200" 
            value={formData.name} 
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Concert Name" />
            {state?.error?.name && (
                <p className="text-sm text-red-500">{state.error.name}</p>
            )}
            <FieldError />
            </TextField>
            <TextField
                name="description"
                type="text"
                className="block space-y-2 text-sm font-medium text-slate-700"
                >
                <Label>Description</Label>
                <TextArea placeholder="Description" 
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                 className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                {state?.error?.description && (
                    <p className="text-sm text-red-500">{state.error.description}</p>
                )}
                <FieldError />
            </TextField>
            <TextField
                name="total_seats"
                type="number"
                className="block space-y-2 text-sm font-medium text-slate-700"
                >
                <Label>Total Seats</Label>
                <Input className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200" 
                value={formData.total_seats} 
                onChange={(e) => setFormData({ ...formData, total_seats: Number(e.target.value) })}
                placeholder="Total Seats" min={1}/>
                {state?.error?.total_seats && (
                    <p className="text-sm text-red-500">{state.error.total_seats}</p>
                )}
                <FieldError />
            </TextField>
            <TextField
                name="event_date"
                type="date"
                className="block space-y-2 text-sm font-medium text-slate-700"
                >
                <Label>Event Date</Label>
                <Input className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200" 
                value={formData.event_date} 
                onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}/>
                {state?.error?.event_date && (
                    <p className="text-sm text-red-500">{state.error.event_date}</p>
                )}
                <FieldError />
            </TextField>
            <TextField
                name="id"
                type="hidden"
                className="block space-y-2 text-sm font-medium text-slate-700"
                >
                    <Input value={concert.id}/>
            </TextField>
            <div className="flex gap-2">
            <SubmitButton>
                Edit
            </SubmitButton>
            </div>
        </Form>
    )
}