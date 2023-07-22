import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewUser() {
    const navigate=useNavigate()
    const [user,setUser]=useState({
        name:'',
        email:'',
        password:''
    })

    const update=(x)=>{
        setUser((a)=>({...a,[x.target.name]:x.target.value}))
    }

    const create =async()=>{
        try{
            await axios.post("http://localhost8080/signin")
            console.log('done')
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            <div class="h-screen  py-20 p-4 md:p-20 lg:p-32">
                <div class="max-w-sm  rounded-lg overflow-hidden shadow-lg mx-auto">
                    <div class="p-6">
                        <h2 class="text-2xl font-bold  mb-2">Create an account</h2>
                        <form className=" p-3">
                            <div class="mb-4">
                                <label class="block font-bold mb-2" for="username">
                                    UserName
                                </label>
                                <input onChange={update} class=" text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="User Name" />
                            </div>
                            <div class="mb-6">
                                <label class="block font-bold mb-2" for="email">
                                    Email
                                </label>
                                <input onChange={update} class=" text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" />
                            </div>
                            <div class="mb-6">
                                <label class="block font-bold mb-2" for="password">
                                    Password
                                </label>
                                <input onChange={update} class=" text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" />
                            </div>
                            <div class="flex items-center justify-between">
                                <button onClick={create} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                    Sign In
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewUser;