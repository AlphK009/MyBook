import api from "../api";
console.log(api)
type Props = {
  text : string
  onClick: () => void
  className:string
}
const Button = ({text,onClick,className} : Props) => {
    
    
    return (
    <div> 
    <button
      type="submit"
      onClick={onClick}
      className={className}
      >
      {text}
    </button>
    </div>
    )
}

export default Button;