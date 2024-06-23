export function Button({title,onClick}){
    return <div className="flex justify-center">
        <button onClick={onClick} className="h-8 mt-3 content-center w-[300px] flex justify-center text-white rounded-lg hover:scale-110 bg-slate-800 transition-smooth duration-100">
            {title}</button>
    </div>
}