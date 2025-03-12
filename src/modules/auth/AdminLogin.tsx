import {useForm} from 'react-hook-form';
import { useAuth } from '../../Context/AuthContext';
import {Link, useNavigate} from 'react-router-dom'
import { loginschema, LoginSchema } from './Schema/LoginSchema';
import {zodResolver} from '@hookform/resolvers/zod'
import Input from '../../Components/Input';

const AdminLogin = () => {
    const {role, logIn} = useAuth();
    const navigate = useNavigate();
    const {register , handleSubmit , formState:{errors}} = useForm<LoginSchema>({
        resolver:zodResolver(loginschema)
    });

    const onSubmit = async(data:LoginSchema)=>{
        try{
            await logIn(data.email, data.password);
            navigate("/dashboard");
        } catch(error){
            console.log(error);
    };
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <button type = "submit" className="w-full font-bold text-bold bg-blue-200 mt-8 px-4 py-2 rounded-lg bg-blue-200 p-20">LogIn</button>
       <p className="mt-2 text-center text-base text-black/60">Don&apos;t have any account?&nbsp;
       <Link to="/" className="font-medium text-primary transition-all duration-200 hover:underline text-blue-400">SingUp</Link>
       </p>
     </form>
  )
}

export default AdminLogin