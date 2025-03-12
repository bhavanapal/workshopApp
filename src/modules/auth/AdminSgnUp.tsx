import { useForm } from "react-hook-form"
import { authschema, AuthSchema } from "./Schema/AuthSchema";
import {zodResolver} from '@hookform/resolvers/zod'
import { useAuth } from "../../Context/AuthContext";
import {Link, useNavigate} from 'react-router-dom'
import Input from "../../Components/Input";

const AdminSgnUp = () => {
    const {signUp} = useAuth();
    const navigate = useNavigate();
    const {register , handleSubmit, formState:{errors}} = useForm<AuthSchema>({
        resolver: zodResolver(authschema),
    });

   const onSubmit = (data:AuthSchema)=>{
         try{
        signUp(data.email, data.password, data.role);
         navigate('/login');
         } catch(error){
            console.log(error);
         }
   }


  return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className = 'space-y-5'>
        <Input 
        label = "Email"
        name="email"
        register = {register}
        type="email"
        placeholder = "Enter Your Email Id"
        autoComplete = "off"
        error = {errors.email?.message}
        />
       <Input
        label = "Password"
        name="password"
        register = {register}
        type="password"
        placeholder = "Enter Your Password"
        autoComplete = "off"
        error = {errors.password?.message}
       />
       <Input
        label = "Confirm Password"
        name="confirmPassword"
        register = {register}
        type="password"
        placeholder = "Confirm your password"
        autoComplete = "off"
        error = {errors.confirmPassword?.message}
       />
       <select {...register('role')} required>
         <option value=""disabled>Select the User</option>
         <option value="admin">Admin</option>
         <option value="user">User</option>
       </select>
       <br/>
       <button type = "submit"  className="w-full text-bold bg-blue-200 px-4 py-2 rounded-lg bg-blue-200 p-20">Sign Up</button>
       <p className="mt-2 text-center text-base text-black/60">Don&apos;t have any account?&nbsp;
       <Link to="/login" className="font-medium text-primary transition-all duration-200 hover:underline text-blue-400">LogIn</Link>
       </p>
       </div>
     </form>
  )
}

export default AdminSgnUp