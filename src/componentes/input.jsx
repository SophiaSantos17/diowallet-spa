/* eslint-disable react/prop-types */
const Input = ({type, placeholder, register, name, defaultValue = "" }) => {
    return(
        <input 
            type={type} 
            placeholder={placeholder}
            className="rounded p-2 w-full"
            {...register(name, { defaultValue })}
        />
    )
}



export default Input;