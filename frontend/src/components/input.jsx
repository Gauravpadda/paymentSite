export function Input({label,placeholder,type,onchange}){
    return <div className=" ">
        <div className="text-md mb-0 pb-0 pl-4 py-2 font-medium">{label}</div>
        <div className=" flex justify-center">
        <input className="border-2 rounded-sm w-[320px] m-1 h-9 p-2" 
        onChange={onchange}
         placeholder={`${placeholder}`}
         type={`${type}`}
         ></input>
         </div>
    </div>
}