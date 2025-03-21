import { ReactNode,  useState } from "react"
import { FormContext, WorkshopData} from "./FormContext" 


const FormContextProvider = ({children} : {children : ReactNode}) => {
     const [formStatus, setFormStatus] = useState(false);
    const [formData, setFormData] = useState<WorkshopData>({
    collegeName : "",
    workshopName : "",
    date : "",
    time : "",
    instructions : "",
    studentEmail :"",
    });

    const updateFormData=(data:WorkshopData)=>{
     setFormData(data); 
    }

    const toggleFormStatus=()=>{
       setFormStatus((prevStatus) => !prevStatus); 
    };
   

  return (
    <FormContext.Provider value={{formData,updateFormData, toggleFormStatus,formStatus}}> 
           {children}
    </FormContext.Provider>
  )
}

export default FormContextProvider

