import {z} from 'zod'

export const authschema = z.object({
    email : z.string().email('Invalid email format'),  
    password: z.string().min(6, 'Password must be at least 6 characters log'),
    confirmPassword : z.string(),
    // confirmPassword : z.string().min(6).refine((val:any, ctx:any) => val === ctx.parent.password,{
    //     message : 'Passwords do not match',
    // }),
    role: z.enum(['user', 'admin'],{message:'Role must be either user or admin'}),
});
export type AuthSchema = z.infer<typeof authschema>