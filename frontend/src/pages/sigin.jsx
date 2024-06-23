import { useState } from "react";
import { Waring } from "../components/bottonWarning";
import { Button } from "../components/button";
import { Heading } from "../components/heading";
import { Input } from "../components/input";
import { Subheading } from "../components/subheading";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Signin(){
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();

    return <div className="h-screen bg-blue-100  w-full flex justify-center"> 
    <div className="flex flex-col justify-center">
        <div className="h-[400px] w-[350px] border-2 rounded-xl bg-gray-50 shadow-xl">

            <Heading title={"Sign in"} />
            <Subheading text={"Enter your credentials to sign in"}/>   
            <Input onchange={(e)=>{
                setUsername(e.target.value);
            }} type={'email'} placeholder={"harryfoe@gmail.com"} label={"Email"} />  


            <Input onchange={(e)=>{
                setPassword(e.target.value)
            }} type={'password'} placeholder={"12345678"} label={"Password"} />   

            <div className="mt-2">
            <Button onClick={async()=>{
                const response=axios.post("http://localhost:3000/api/v1/user/signin",{
                    username,
                    password
                })
                localStorage.setItem("token",(await response).data.token);
                navigate("/dashboard")
            }} title={"sign in"} />
            </div>
            <Waring label={"Don't have an account? "} to={"/signup"} linkText={" Sign up"}/>
            </div>
    </div>
    </div>
}