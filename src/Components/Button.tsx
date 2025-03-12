interface ButtonValues{
    label: string;
    onClick : ()=>void;
    disabled? : boolean;
    type?: 'button' | 'submit' | 'reset' | 'primary' | 'secondary' | 'danger';
    // className?: string;
}

const Button = ({label, onClick, disabled = false, type} : ButtonValues) => {
  const buttonClass = `w-full px-4 py-2 rounded-lg bg-blue-200 text-black`;
  return (
    <button className = {buttonClass}
    type = {type} 
    onClick = {onClick} 
    disabled = {disabled}
    >{label}</button>
  )
}

export default Button