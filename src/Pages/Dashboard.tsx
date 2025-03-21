import { useAuth } from "../Context/AuthContext"
import {Link} from "react-router-dom"
import {useEffect, useState } from "react";
import FetchForms from "../config/FetchForms";
import "./Dashboard.css"



const Dashboard = () => {
  const {logOut} = useAuth();
  const [forms, setForms] = useState<any[]>([]);
  const[loading, setLoading] = useState<boolean>(true);

  //fetch all forms when the components mounts

  useEffect(() => {
    const loadForms = async() => {
      const fetchedForms = await FetchForms();
      if(fetchedForms){
        setForms(Object.values(fetchedForms)) // this is convert the form object to array
      }
      setLoading(false);
    };
    loadForms();
  },[]);

  if(loading){
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-row">
    <div className = "w-64 bg-slate-800 h-screen py-8 text-center text-white flex flex-col gap-4">
      <h1>Dashboard</h1>
    <nav className="grid gap-2 mt-20">
      <Link to = "/adminform">Admin Form</Link>
      <br/>
      <Link to = "/">
    <button onClick={() => logOut}>LogOut</button>
    </Link>
    </nav>
    </div>
    <div>  
    <h1 className="mt-20 text-center text-center text-2xl leading-tight m-8 text-gray-800"> Welcome to Dashboard</h1>
    <div className='flex flex-wrap mt-12'>
      {forms.length > 0 ?(
        <div className="grid grid-cols-4 gap-4 m-12">
          {forms.map((form, index) => (
            <div key={index} className= "card" >
              <h3>{form.workshopName}</h3>
              <p>College Name : {form.collegeName}</p>
              <p>Date : {form.date}</p>
              <p>time: {form.time}</p>
              <p>Instructions : {form.instructions}</p>
              <p>Form Link : <a href={form.formLink} target="_blank" rel="noopener noreferrer">View Form</a></p>
            </div>
          ))}
        </div>
      ):(
        <p>No forms available</p>
      )}
    </div> 
  </div>
  </div> 
  )
}
export default Dashboard

  