import {z} from 'zod';

export const workshopschema = z.object({
    collegeName: z.string().nonempty('College name is required'),
    workshopname: z.string().nonempty('Workshop name is required'),
    date: z.string().min(1, 'Date are required'),
    time: z.string().min(1, 'Time are required'),
    instructions : z.string().optional(),
    status: z.boolean().default(false,)
});

export type WorkshopSchema = z.infer<typeof workshopschema>