type Option={
    value: string;
    label: string;
}

type SelectOptions ={
    options: Option[];
    value:string;
    onChange:(value: string) => void;
    label?: string
    placeholder?: string;
    className? : string;
}

const Select = ({options,value,onChange,label,placeholder,className} : SelectOptions) => {
  return (
   <div>
    {label && <label>{label}</label>}
    <select value={value} onChange={(e) => onChange(e.target.value)}
    className={`px-3 py-2 rounded-lg bg-white text-black
    outline-none focus:bg-gray-50 duration-200 border border-gray-200 
    w-full ${className}`} 
    >
      {placeholder && (
        <option value="" disabled>
            {placeholder}
        </option>
      )}
      {options?.map((option) => (
        <option key = {option.value} value={option.value}>
            {option.label}
        </option>
      ))}
    </select>
   </div>
  )
}

export default Select