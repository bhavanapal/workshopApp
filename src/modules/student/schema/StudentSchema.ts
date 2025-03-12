import {z} from 'zod'

export const studentschema = z.object({
    studentName: z.string().nonempty('Name is required'),
    course : z.string().nonempty('Course is required'),
    phoneNo : z.string().min(10, 'phone number should be at least 10 digits'),
    email : z.string().email('Invalid email format'),
    feedback : z.string().nonempty('Feedback is required'),
    collegeName: z.string().nonempty('College name is required'),
    workshopname: z.string().nonempty('Workshop name is required'),
    date: z.string().min(1, 'Date are required'),
    time: z.string().min(1, 'Time are required'),
});

export type StudentSchema = z.infer<typeof studentschema>