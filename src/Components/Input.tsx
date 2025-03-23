
interface InputValue {
    label?: string;
    name?: string; 
    type? : string;
    placeholder? : string;
    register: any;
    error? : string;
    className? : string;
    autoComplete:boolean;
    disabled?:boolean;
}

const Input = ({label,
    type = "text",
    name,
    placeholder,
    register,error,className,autoComplete,disabled = false,} : InputValue) =>{
    return(
        <div className = 'w-full'>
            {label && (<label htmlFor = {name}
          className ='inline-block mb-1 pl-1'> 
           {label} 
            </label>)}
            <input 
            id={name}
             {...register(name)}
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete ? 'on' : 'off'}
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