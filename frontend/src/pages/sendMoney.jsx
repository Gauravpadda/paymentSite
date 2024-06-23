import { useParams, useSearchParams } from "react-router-dom";
import { Waring } from "../components/bottonWarning";
import { Button } from "../components/button";
import { Heading } from "../components/heading";
import { Input } from "../components/input";
import { useRef, useState } from "react";
import axios from "axios";

export function SendMoney(){
    const [ userdetails ]=useSearchParams();
    const userid=userdetails.get("userid");
    const firstName=userdetails.get("firstName");
    const lastName=userdetails.get("lastName");
    const inputref=useRef();
    const [msg,setmsg]=useState("");
    const [amount,setamount]=useState(0);

    return <div className="h-screen bg-gray-100  w-full flex justify-center"> 
    <div className="flex flex-col justify-center">
        <div className="h-[350px] w-[400px] border-2 rounded-xl bg-white shadow-xl flex flex-col pt-7 ">

            <Heading title={"Send money"} />
            <div className="flex justify-start ml-12 mt-10">
                <div className="rounded-full size-10 bg-green-500 mr-2 flex justify-center content-center text-xl font-bold pt-1">{firstName[0]}</div>
                <div className="text-2xl pt-0 font-medium ">{firstName}</div>
            </div>
            <div className="ml-8"> 
                <div className="text-md mb-0 pb-0 pl-5 py-2 font-medium">Amount (in Rs)</div>
                <div className=" flex justify-center   w-fit">
                    <input className="border-2 rounded-sm w-[320px] m-1 h-9 p-2"
                        onChange={()=>setamount(inputref.current.value)}
                        placeholder="Enter Amount" ref={inputref} value={amount}
                    ></input>
                </div>
            </div> 
            <div className="mt-2 flex justify-center">
                <button onClick={async()=>{
                    const response=await axios.post("http://localhost:3000/api/v1/account/transfer",{
                        to:userid,
                        amount:amount
                    },{
                        headers:{
                            Authorization:"Bearer "+localStorage.getItem("token")
                        }
                    })
                    console.log(response)
                    setmsg(()=>response.data.msg);
                    setamount(0)
                }}
                className="h-8 mt-2 content-center w-[320px] flex justify-center text-lg text-white rounded-lg hover:rounded-full bg-green-600 transition-smooth duration-100">
                    Send Money
                </button>
            </div>
            <div className="flex justify-center text-sm pt-2">{msg}</div>
            </div>
    </div>
    </div>
}