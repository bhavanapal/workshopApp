import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import {ref, set} from 'firebase/database';
import { database} from '../../config/Firebase';
import {useFormDataContext } from '../../Context/FormContext';
import { workshopschema, WorkshopSchema } from './schema/FormSchema';
import { useEffect, useState } from 'react';
import { SendEmailjs } from '../../Components/Emailjs';


const AdminForm = () => {
    const {formData,updateFormData, toggleFormStatus,formStatus} = useFormDataContext();
    const [formLink, setFormLink] = useState();
    const {register, handleSubmit, formState:{errors},reset} = useForm<WorkshopSchema>({
        resolver:zodResolver(workshopschema), defaultValues:formData,
    }); 


  const storeFormDataInFirebase = async (data: WorkshopSchema) => {
    try {
      const formId = Math.random().toString(36).substring(2, 15);
      const generatedLink = `http://127.0.0.1:5173/feedback/${formId}`;
      setFormLink(generatedLink);
       // Add the generated link to the data object to be stored in Firebase
       const formDataWithLink = {
        ...data,
        formStatus,
        formLink: generatedLink, 
        Id:formId,
      };
      const formRef = ref(database, 'workshops/' + formId); // Unique ID for each form
      await set(formRef,formDataWithLink );
      console.log("Form data saved to Firebase");
      return generatedLink;
    } catch (error:any) {
      console.error("Error saving form data to Firebase:", error.message); 
    }
  };


  useEffect(() =>{
    console.log("Form Status updated:" , formStatus);
  },[formStatus]);


  const onSubmit = async (data: WorkshopSchema) => {
    console.log("Form data to be saved:", data);

    // Update form data in context
    updateFormData(data);

    // Store the form data in Firebase only if the form is active
    if (formStatus) {
      try{
      const generatedLink= await storeFormDataInFirebase(data);
      
      if(generatedLink){ 
         toggleFormStatus();
          reset();
        await SendEmailjs(data, `${generatedLink}`, 'Workshop Profile Activation'); 
        alert('Form saved successfully with unique link:' + generatedLink);
      }
      }
   catch(error){
      console.error("Error during form submission:", error)
    }
  }
    else{
      alert('Form is inactive. Please toggle the form status to active.');
    }
  };
     
  return (
    <div>
     <form onSubmit = {handleSubmit(onSubmit)}>
       <div className = 'space-y-5'>
       <label>CollegeName</label> &nbsp;
    <input {...register('collegeName')} type="text" placeholder="enter your CollegeName"
    className="w-full border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5 m-2"/>
    {errors.collegeName && <p style = {{color:'red'}}>{errors.collegeName.message}</p>}
    <br/>   
    <label>WorkshopName</label>  &nbsp;
    <input {...register('workshopName')} type="text" placeholder="enter Workshop Name"
    className="w-full border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5 m-2"/>
    {errors.workshopName && <p style = {{color:'red'}}>{errors.workshopName.message}</p>}
    <br/>   
    <label>Student Email</label>  &nbsp;
    <input {...register('studentEmail')} type="email" placeholder="enter Your Email Id"
    className="w-full border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5 m-2"/>
    {errors.studentEmail  && <p style = {{color:'red'}}>{errors.studentEmail .message}</p>}
    <br/>
    <label>Date</label> &nbsp;
    <input {...register('date')} type = "date"
    className="w-full border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5 m-2"/> 
    {errors.date && <p style = {{color:'red'}}>{errors.date.message}</p>}
     <br/>
     <label>Time</label> &nbsp;
    <input {...register('time')} type = "time"
    className="w-full border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5 m-2"/> 
    {errors.time && <p style = {{color:'red'}}>{errors.time.message}</p>}
     <br/>
     <label>Instrucation</label> &nbsp;
    <input {...register('instructions')} type = "textarea" placeholder="say something about workshop"
    className="w-full border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5 m-2"/> 
    {errors.instructions && <p style = {{color:'red'}}>{errors.instructions.message}</p>}
     <br/>
    <label>Form Status</label> &nbsp;
       <input
       type = "checkbox"
       checked = {formStatus}
       onChange = {toggleFormStatus}
       />&nbsp;
       <span>{formStatus ? "Active" : "Inactive"}</span>
       &nbsp;
       <br/>
         
     {formLink && ( 
       <div>
        <h3>Form Created</h3>
        <p>Form Link:<a href={formLink} target="_blank" rel="noopener noreferrer">{formLink}</a></p> 
       </div>
       )} 

      <button type = "submit" disabled={!formStatus}>Submit</button>
        </div>
        </form>
       </div>
  )
}
export default AdminForm;
     