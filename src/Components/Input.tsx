import {UseFormRegister} from 'react-hook-form';

interface InputValue {
    label?: string;
    name?:string;
    type? : string;
    placeholder? : string;
    register: UseFormRegister<any>;
    error? : string;
    className? : string,
    autoComplete:boolean,
    disabled?:string,
}

const Input = ({label,type,name,placeholder,register,error,className,autoComplete,disabled} : InputValue) =>{
    return(
        <div className = 'w-full'>
            {label && <label htmlFor = {name}
          className ='inline-block mb-1 pl-1'>{label}</label>}
            <input id={name} {...register(name)}
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            disabled = {disabled}
            className={`px-3 py-2 rounded-lg bg-white 
            text-black outline-none focus:bg-gray-50 
            duration-200 border border-gray-200 w-full
            ${className}`}/>
            {error && <p style = {{color : "red"}}>{error}</p>}
        </div>
    )
}

export default Input