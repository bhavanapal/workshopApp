import { createContext , useContext } from "react";

export type WorkshopData={
    id:string;
    collegename : string;
    workshopname : string;
    date : string;
    time : string;
    instructions : string;
    isActive : boolean;
    link : string;
}

export type WorkshopContextType={
    formData : WorkshopData[];
    toggleFormStatus : () => void;
    addFormData : (data : WorkshopData) => void;
} 

// create context
export const FormContext = createContext<WorkshopContextType | undefined>(undefined);

// consumer

export const useFormDataContext = () =>{
    const contexts = useContext(FormContext);
    if(!contexts){
        throw new Error('useWorkshop must be used within a Provider')
    }
    return contexts;
}