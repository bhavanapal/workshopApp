import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import {ref, set ,push } from 'firebase/database';
import { database} from '../../config/Firebase';
import {useFormDataContext } from '../../Context/FormContext';
import { workshopschema, WorkshopSchema } from './schema/FormSchema';
import {useNavigate} from 'react-router-dom'
import Input from '../../Components/Input';
import { useEffect } from 'react';
import  {Emailjs}  from '../../Components/Emailjs';


const AdminForm = () => {
    const {formData,addFormData,toggleFormStatus} = useFormDataContext();
    const navigate = useNavigate();
    const {register, handleSubmit, formState:{errors}, reset} = useForm<WorkshopSchema>({
        resolver:zodResolver(workshopschema), defaultValues:formData,
    });

    useEffect(() =>{
    reset(formData);
    },[formData,reset])

   const onSubmit = async (data:WorkshopSchema)=>{ 
    console.log(data);
    const adminRef = ref(database, 'workshops');
    // adminRef.push(data);
    const newadminRef = push(adminRef); // push() to generates a new unique key
    await set(newadminRef, data ,{...data, isActive:data.isActive})
    newadminRef.set({...data, status: data.isActive})
      .then(() =>{
        if(data.isActive){
          const workshopLink = `http://127.0.0.1:5173/l/workshop/${newadminRef.key}`; //${URL}
          // send email
          const emailSubject = 'Student Profile is Now Active!';
          const emailMessage = `Hello, the student${data.name} is now active.You can view their profile using this Link: ${workshopLink}`;
          Emailjs(data.email, emailSubject, emailMessage); //workshopLink
          alert(`workshop link has been sent to : ${workshopLink}`);
          alert('Data saved successfully!');
          console.log(workshopLink);
     }else{
       alert("The student is not active, no link generated.");
    }
    addFormData(data);
    console.log(newadminRef);
    })
      .catch((error:any) => {
      console.error("Error adding student:", error);
      alert("Error adding student");
      });
      navigate('/studentform');
    }

  return (
     <form onSubmit = {handleSubmit(onSubmit)}>
       <div className = 'space-y-5'>
      <Input
      label = "CollegeName"
      name="collegeName"
      register = {register}
      type="text"
      placeholder = "Enter College Name"
      autoComplete = "off"
      error = {errors.collegeName?.message}
      />
      <Input
      label = "Workshop Name"
      name="workshopName"
      register = {register}
      type="text"
      placeholder = "Enter Workshop Name"
      autoComplete = "off"
      error = {errors.workshopName?.message}
      />
      <Input
      label = "Date"
      name="date"
      register = {register}
      type="date"
      error = {errors.date?.message}
      />
      <Input
      label = "Time"
      name="time"
      register = {register}
      type="time"
      error = {errors.time?.message}
      />
      <Input
      label = "Instructions"
      name="instructions"
      register = {register}
      type="textarea"
      placeholder = "Enter Your instructions about your workshop"
      autoComplete = "off"
      error = {errors.instructions?.message}
      />
      <label>Status:</label>
      <button type="button" onClick={toggleFormStatus}>
        {formData.isActive? 'Set inactive' : 'Set Active'}
      </button>
      <div className="flex space-x-2 md:space-x-8  justify-center">
      <button type="submit" className="text-bold bg-blue-200 px-4 py-2 rounded-lg bg-blue-200 p-20">Create Workshop</button> &nbsp;
      <button onClick={() => navigate("/dashboard")} className=" text-bold bg-blue-200 px-4 py-2 rounded-lg bg-blue-200 p-20">Back To Dashboard</button>    
      </div>
      </div>  
    </form>
  )
}

export default AdminForm




