import { useState,useEffect } from "react";
import axios from "axios";
export function Appbar(){
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
    return <div className="flex justify-between shadow-md pl-4 pr-4 pt-1">
        <div className="mr-3 mt-1 text-xl">Payment Site</div>
        <div className="flex justify-end">
            <div className="mr-3 mt-1 text-xl">Welcome {activeUser && activeUser.user ? activeUser.user.firstName : 'Loading...'}  {activeUser && activeUser.user ? activeUser.user.lastName : 'Loading...'}</div>
            <div className="bg-gray-400 rounded-full size-10 font-bold flex text-3xl justify-center">{activeUser && activeUser.user ? activeUser.user.firstName[0] : 'Loading...'}</div></div>
    </div>
}