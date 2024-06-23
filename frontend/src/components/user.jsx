import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function UserComponent(){
    const [filter,setFilter]=useState("");
    const [ allusers , setUsers ]=useState([]);
    const [activeUser,setActiveUser]=useState(null)
    useEffect(()=>{
        async function fetchuser(){
            const response=await axios.get(`http://localhost:3000/api/v1/user/me`,{
                headers:{
                    Authorization:"Bearer "+localStorage.getItem("token")
                }
                
            })
            console.log("hi");
            setActiveUser(response.data);
        };    
        fetchuser()
        
        
    },[]);
   

    useEffect(()=>{
        async function fetchdata(){
            const response=await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`,{
                headers:{
                    Authorization:"Bearer "+localStorage.getItem("token")
                }
            })
            
            setUsers(response.data.users);
            
        };  
        
        
        fetchdata();
        
    },[filter]);


    
    return <div>
        <div className="p-2 pl-3 font-medium text-lg">Your balance: {activeUser && activeUser.account ? activeUser.account.balance : 'Loading...'}</div>
        <div className="p-3 m-2 mt-0 border-2 rounded-lg">
            <div className="font-bold text-xl">Users</div>
            <div className="mt-3 mb-3">
                <input type="search" placeholder="Search users..." className="w-full h-8 pl-2 border-2 rounded-md"
                onChange={(e)=>setFilter(e.target.value)}
                ></input> </div>


            <User allusers={allusers}/>    
            </div>


        </div>

    
}
function User({allusers}){
    const navigate=useNavigate();
    return <div>
        {allusers.map((value,index)=>{
            return(
            <div key={index} className="flex justify-between border-3">
                 <div  className="border-1 m-3 w-full flex justify-start ">
                <div className="rounded-full size-10 pt-1 bg-gray-400 content-center flex justify-center font-bold text-xl">{value.firstName[0]}</div>
                <div className="pl-5 pt-2 text-lg font-medium">{value.firstName} {value.lastName} </div>
                </div>
                <div className="flex justify-center mb-3">
                    <button onClick={()=>{
                        navigate(`/send?userid=${value._id}&firstName=${value.firstName}&lastName=${value.lastName}`)
                    }}
                    className="h-8 mt-2 content-center w-[120px] flex justify-center text-lg text-white rounded-lg hover:scale-110 bg-slate-800 transition-smooth duration-100">
                        Send Money
                    </button>
                </div>
            </div>)
        })}
    
    </div>
}