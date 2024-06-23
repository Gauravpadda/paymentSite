import {Link} from "react-router-dom"
export function Waring({label, linkText,to}){
    return <div className="p-1 flex justify-center mt-2">
        {label}
        <Link className="pointer-cursor underline " to={to}>{linkText}</Link>
    </div>
}