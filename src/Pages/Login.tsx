import AdminLogin from "../modules/auth/AdminLogin"


const Login = () => {
  return (
    <div className="w-full py-8 mt-4 text-center">
    <div className="flex flex-wrap">
        <div className="p-2 w-full">
        <h3 className="text-center text-2xl leading-tight m-8 text-gray-800">LogIn to Your Account</h3>
        </div>
        </div>
        <div className='flex items-center justify-center w-full'>
       <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10"> 
       <AdminLogin/>
    </div>
    </div>
    </div>
  )
}

export default Login