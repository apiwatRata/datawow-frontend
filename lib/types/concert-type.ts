import { z } from "zod";

export type FormState =
  | {
      success?: boolean;
      error?: {
        name?: string[];
        description?: string[];
        total_seats?: string[];
        event_date?: string[];
      };
      message?: string;
    }
  | undefined;

export const ConcertFormSchema = z.object({
    name: z.string().min(6, { message: "Be at least 6 characters long"}).trim(),
    description: z.string()
    .min(6, { message: "Be at least 6 characters long"}).trim(),
    total_seats: z.coerce.number().min(1, {message: "Total seats must be more than 0"}),
    event_date: z.string().refine((val) => {
        const date = new Date(val);
        return date > new Date();
    }, {
        message: "Event date must be in the future",
    }),
})