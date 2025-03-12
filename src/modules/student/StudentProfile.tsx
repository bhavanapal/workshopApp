import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import { database} from "../../config/Firebase";
import {ref,onValue} from 'firebase/database';
import { WorkshopData } from "../../Context/FormContext";
import { studentschema, StudentSchema } from "./schema/StudentSchema";
import { useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod';
import Input from "../../Components/Input";

   
const StudentProfile = () => {
    const {workshopId} = useParams<{workshopId: string}>();
    const[workshop, setWorkshop] = useState<WorkshopData[]>([]);
    const {register, handleSubmit, formState:{errors},setValue} = useForm<StudentSchema>({resolver:zodResolver(studentschema)});



useEffect(() =>{
    // fetch the data from firebase based on studentId
    const workshopRef = ref(database,`workshops/${workshopId}`);
    onValue(workshopRef , (snapshot:any) =>{
//    onValue("value" , (snapshot:any) =>{  workshopRef.on
        const data = snapshot.val();
        console.log(data);
        if(data){
            setWorkshop(data);
            // pre-fill the form with the existing data
            setValue("collegename",data.collegename);
            setValue("workshopname",data.workshopname);
            setValue("date",data.date);
            setValue("time",data.time);
            setValue("status",data.status);
        }
    });
    // return()=>{
    //     workshopRef.off();
    // };
},[workshopId, setValue]);

const onSubmit = (data:StudentSchema)=>{
    const studentRef = database.ref(`workshops/${workshopId}`);
    studentRef.update(data)
    .then(() =>{
     alert("Your Profile has been submited");
    })
    .catch((error:any) =>{
      console.error("Error updating student data", error);
    });
}



if(!workshop){
    return<div>Loading...</div>
}
  return ( 
    <form onSubmit = {handleSubmit(onSubmit)}>
         <div className = 'space-y-5'>
         <Input
      label = "CollegeName"
      name="collegeName"
      register = {register}
      type="text"
      disabled
      />
      <Input
      label = "WorkshopName"
      name="workshopName"
      register = {register}
      type="text"
      disabled
      />
          <Input
      label = "Date"
      name="date"
      register = {register}
      type="date"
      disabled
      />
        <Input
      label = "Time"
      name="time"
      register = {register}
      type="time"
      disabled
      />
      <Input
      label = "Student Name"
      name="studentName"
      register = {register}
      type="text"
      placeholder = "Enter Your College Name"
      autoComplete = "off"
      error = {errors.studentName?.message}
      />
        <Input
      label = "Course"
      name="course"
      register = {register}
      type="text"
      placeholder = "Enter Your Course Name"
      autoComplete = "off"
      error = {errors.course?.message}
      />
        <Input
      label = "Phone No."
      name="phone"
      register = {register}
      type="text"
      placeholder = "Enter Your Phone No."
      autoComplete = "off"
      error = {errors.phone?.message}
      />
       <Input
      label = "Email"
      name="email"
      register = {register}
      type="email"
      placeholder = "Enter Your Email Id"
      autoComplete = "off"
      error = {errors.email?.message}
      />
      <textarea
       {...register('feedback')} 
       type="text" 
       placeholder="Enter your Feedback"
       className="px-3 py-2 rounded-lg bg-white 
       text-black outline-none focus:bg-gray-50 
       duration-200 border border-gray-200 w-full"/>
   <br/>
   <div className="flex space-x-2 md:space-x-8  justify-center">
   {workshop.status && (<button type="submit" className="text-bold bg-blue-200 px-4 py-2 rounded-lg bg-blue-200 p-20">Submit Feedback</button>)}
   {workshop.status && (<button onClick={generateCertificate} className="text-bold bg-blue-200 px-4 py-2 rounded-lg bg-blue-200 p-20">Generate Certificate</button>)} 
   </div>
   </div>
  {/* if the student is active then generating a certificate   */}
 {/* {workshop.status && (<button onClick={Certificate}>Generate Certificate</button>)} */}
 </form>
  )
}

export default StudentProfile
