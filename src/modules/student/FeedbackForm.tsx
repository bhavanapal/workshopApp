import { useForm , Controller} from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod';
import {useParams} from "react-router-dom";
import { database } from "../../config/Firebase";
import {ref, set,get} from 'firebase/database';
import { studentschema, StudentSchema } from "./schema/StudentSchema";
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import { SendEmailjs } from '../../Components/Emailjs';
import Certificate from "../../Components/Certificate";
import Conatiner from "../../Components/Conatiner";



const FeedbackForm = () => {
    const[formDetails, setFormDetails] = useState<any>(null);
    const[studentData, setStudentData] = useState<StudentSchema>();
    const[verificationCode, setVerificationCode] = useState("");
    const[isOtpVerified , setIsOtpVerified] = useState<boolean>(false);
    const[email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const[submited, setSubmited] = useState<boolean>(false)
    const {control, handleSubmit, formState : {errors}, reset} = useForm<StudentSchema>({
     resolver : zodResolver(studentschema), defaultValues: formDetails,
    });
    const {Id} = useParams(); // for dynamic routing
    console.log("Form Link ID:" , Id);
    const navigate = useNavigate();


  // generate Otp for emailjs verification
    const handleSendOtp = () =>{
        const generateOTP = Math.random().toString(36).substring(2, 15);
        const generatedOtp =  `${generateOTP}`;         
        setOtp(generatedOtp);
        setOtpSent(true);
        const emailContent = `Your OTP for email verification is:${generateOTP}`;
        const subject = 'OTP for Email Verification';
       SendEmailjs(subject, emailContent, 'Email verification OTP');
    }
  
    const handleEmailVerification = () =>{
      if(verificationCode === otp){
        setIsOtpVerified(true);
        alert('OTP verified successfully');
      } else {
        alert('Invalid OTP, Please try again.');
      }
    };

    // fetch the form data from firebase
useEffect(() => {
  const loadForms = async() => {
      try{
          const fetchedForms = ref(database, `workshops/${Id}`); 
          const snapshot = await get(fetchedForms);
          
      if(snapshot.exists()){
          const data = snapshot.val();
          console.log("Fetched data from Firebase:", data);
          setFormDetails(data);
        } else {
          console.error("No data available for this Id");
        } 
      } catch(error) {
          console.error("Error fetching data from firebase:", error);
        }
      }
loadForms();   
},[Id])

const storeFormDataInFirebase = async (data:StudentSchema ) => { 
  try {
     const formId = Math.random().toString(36).substring(2, 15);
       const generatedLink = `http://127.0.0.1:5173/certificate/${formId}`; 
    // Add the generated link to the data object to be stored in Firebase
     const formDataWithLink = {
      ...data,
      ...formDetails,
       formLink: generatedLink, 
       Id:formId,
    };
    const formRef = ref(database, 'feedbacks/' + formId); // Unique ID for each form
    await set(formRef,formDataWithLink ); // Store form data in Firebase data, formRef, 
    console.log("Form data saved to Firebase");
   return generatedLink;
  } catch (error:any) {
    console.error("Error saving form data to Firebase:", error.message);
  }
};

//submit feedback form
const onSubmit = async(data : StudentSchema) =>{
  if(!formDetails && !isOtpVerified){
    alert("Please verify OTP before submitting.");
    console.error("workshop details not loaded yet.");
    return;
  }
  console.log("Form data to be saved:", data);
  try{
    const generatedLink= await storeFormDataInFirebase(data);
     if(generatedLink){ 
      alert('Feedback Form saved successfully with unique link:' + generatedLink); 
      reset();
      setStudentData(data);
      setSubmited(true);
      alert("Thank you for your feedback!");
       navigate(`/certificate/:Id`)
       };
    } catch(error){
    console.error("Error during form submission:", error)
  }
    
}


if(!formDetails){
    return <div>Loading workshop deatils...</div>;
}
    

   
  return (
    <div>
        <h1 className="text-center text-center text-2xl leading-tight m-4 text-gray-800">Student Feedback Form</h1>
           {/* Read only fields */}
         <h2 className="text-center text-center text-2xl leading-tight m-4 text-gray-800">Feedback Form for {formDetails.workshopName}</h2>
        <div className = 'space-y-5'>
            <h3>Workshop Details</h3>
            <p>College Name:{formDetails.collegeName}</p>
            <p>Date:{formDetails.date}</p>
            <p>Time:{formDetails.time}</p>
         </div> 
       {formDetails ? (
        <form onSubmit = {handleSubmit(onSubmit)}>
           <div className = 'space-y-5'>

        <div>
            <label className ='inline-block m-4 pl-1'>Student Name</label>&nbsp;
            <Controller
             name = "studentName"
             control={control}
             render = {({field}) => <input {...field}/>}
             className="w-full border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5 m-2"
            />
            {errors.studentName && <p>{errors.studentName.message}</p>}
           
        </div>
          <br/>
        <div>
            <label className ='inline-block mb-1 pl-1'>Course</label>&nbsp;
            <Controller
             name = "course"
             control={control}
             render = {({field}) => <input {...field}/>}
             className="w-full border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5 m-2"
            />
            {errors.course && <p>{errors.course.message}</p>}
        </div>
          
          <br/>

          <div>
            <label className ='inline-block mb-1 pl-1'>Email</label>
            <Controller
             name = "email"
             control={control}
             onChange = {(e:React.FormEvent) => setEmail(e.target.value)}
             render = {({field}) => <input {...field}/>}
             className="w-full border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5 m-2"
            />
             {errors.email && <p>{errors.email.message}</p>}
          </div>

          <div>
            {!otpSent ? (
              <button type="button" onClick = {handleSendOtp}>Send OTP</button>
            ):(
              <>
              <label className ='inline-block mb-1 pl-1'>Enter OTP sent to your Email</label>
              <input
               type = "text"
               placeholder = "Enter OTP"
               value = {verificationCode}
               onChange = {(e:React.FormEvent) => setVerificationCode(e.target.value)}
               className="w-full border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5 m-2"
              />
              <button type="button" onClick = {handleEmailVerification}>Verify OTP</button>
              </>
            )} 
          </div> 
    
        <div>
            <label className ='inline-block mb-1 pl-1'>Feedback</label>&nbsp;
            <Controller
             name = "feedback"
             control={control}
             render = {({field}) => <textarea {...field}/>}
             className="w-full border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5 m-2"
            />
            {errors.feedback && <p>{errors.feedback.message}</p>}
        </div>
        <br/>
      
        <button type="submit" className="w-full text-bold bg-blue-200 px-4 py-2 rounded-lg bg-blue-200 p-20">Submit Feedback</button>
        </div>
        </form>  
       ):(
          <p>Loading feedback form....</p>
        )}
        <div className="w-full py-8 mt-4 text-center">
     <Conatiner>
     {submited && studentData && formDetails &&(
            <Certificate
            studentName = {studentData.studentName}
            workshopName = {formDetails.workshopName}
            collegeName = {formDetails.collegeName}
            date={formDetails.date}
            time={formDetails.Time}/>
          )}
     </Conatiner>
     </div>     
    </div>
  );
}

export default FeedbackForm

