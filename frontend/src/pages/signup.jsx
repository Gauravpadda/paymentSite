import { Waring } from "../components/bottonWarning";
import { Button } from "../components/button";
import { Heading } from "../components/heading";
import { Input } from "../components/input";
import { Subheading } from "../components/subheading";
import {useState} from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


export function Signup(){
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    {console.log(firstName)}
    return <div className="h-screen bg-blue-100 w-full flex justify-center"> 
    <div className="flex flex-col justify-center">
        <div className="h-[530px] w-[350px] border-2 rounded-xl bg-gray-50 shadow-xl">

            <Heading title={"Sign up"} />
            <Subheading text={"Enter your information to create new account"}/>
            <Input onchange={(e)=>{
                setFirstName(e.target.value);
            }} type={'text'} placeholder={"Harry"} label={"First Name"}/>   
            

            <Input onchange={(e)=>{
                setLastName(e.target.value);
            }} type={'text'} placeholder={"Foe"} label={"Last Name"} />   


            <Input onchange={(e)=>{
                setUsername(e.target.value);
            }} type={'email'} placeholder={"harryfoe@gmail.com"} label={"Email"} />   


            <Input onchange={(e)=>{
                setPassword(e.target.value);
            }} type={'password'} placeholder={"12345678"} label={"Set Password"} />   


            <Button onClick={async ()=>{
                const response= await axios.post("http://localhost:3000/api/v1/user/signup",{
                    username,
                    password,
                    firstName,
                    lastName
                })
                localStorage.setItem("token",response.data.token);
                navigate("/signin")
            }} title={"sign up"}/>
            <Waring label={"Already have an account? "} to={"/signin"} linkText={" Sign in"}/>
            </div>
    </div>
    </div>
}