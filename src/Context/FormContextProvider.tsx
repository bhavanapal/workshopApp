import { ReactNode, useEffect, useState } from "react"
import { FormContext, WorkshopData } from "./FormContext"


const FormContextProvider = ({children} : {children : ReactNode}) => {
    const [formData, setFormData] = useState<WorkshopData>({
    id:"",
    collegename : "",
    workshopname : "",
    date : "",
    time : "",
    instructions : "",
    isActive : false,
    link : "",
    });

    const addFormData=(data:WorkshopData)=>{
      setFormData((prev) => ({...prev,...data, formData}));
      
    }

    const toggleFormStatus=()=>{
        setFormData((prevData) => ({...prevData, isActive: !prevData.isActive}));
    };
   
    useEffect(() =>{
      setFormData(formData)
     },[formData, setFormData]);

  return (
    <div>
        <FormContext.Provider value={{formData,addFormData,toggleFormStatus }}>
           {children}
        </FormContext.Provider>
    </div>
  )
}

export default FormContextProvider