import { useAuth } from "../Context/AuthContext"
import {Link} from "react-router-dom"
import {useState } from "react";
import Certificate from "../Components/Certificate";


const Dashboard = () => {
  const {logOut} = useAuth();
  const[certificate, setCertificate] = useState()


  return (
    <div className="flex flex-row">
    <div className = "w-64 bg-slate-800 h-screen py-8 text-center text-white flex flex-col gap-4">
      <h1>Dashboard</h1>
    <nav className="grid gap-2 mt-20">
      <Link to = "/adminform">Admin Form</Link>
      <br/>
      <Link to = "/studentprofile/:workshopId">Student Profile</Link>
      <br/>
      <Link to = "/">
    <button onClick={() => logOut}>LogOut</button>
    </Link>
    </nav>
    </div>
    <div className = "w-full h-screen flex justify-center bg-slate-200">
    <h1 className="mt-20 text-center"> Welcome to Dashboard</h1>
    <div className='flex flex-wrap'>
              {certificate?.map((cer:any) => (
                <div key={cer.$id} className='p-2 w-1/4'>
                    <Certificate {...cer} />
                </div>
              ))}
           </div>
    </div>
  </div> 
  )
}
export default Dashboard