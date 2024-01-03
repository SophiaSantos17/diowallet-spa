/* eslint-disable react/prop-types */
const Input = ({type, placeholder}) => {
    return(
        <input 
            type={type} 
            placeholder={placeholder}
            className="rounded p-2 w-full"
        />
    )
}



export default Input;