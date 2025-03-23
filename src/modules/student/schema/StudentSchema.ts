import {z} from 'zod'

export const studentschema = z.object({
    studentName: z.string().nonempty('Name is required'),
    course : z.string().nonempty('Course is required'),
    // phoneNo : z.string().min(10, 'phone number should be at least 10 digits'),
    email : z.string().email('Invalid email format'),
    feedback : z.string().min(1,'Feedback is required'),
    //  otpVerified : z.boolean(),
});

export type StudentSchema = z.infer<typeof studentschema>