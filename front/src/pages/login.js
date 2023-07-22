import { useNavigate } from "react-router-dom";

function Login() {

    const navigate=useNavigate()
    return (
        <div>
            <div class="h-screen  py-20 p-4 md:p-20 lg:p-32">
                <div class="max-w-sm  rounded-lg overflow-hidden shadow-lg mx-auto">
                    <div class="p-6">
                        <h2 class="text-2xl font-bold  mb-2">Welcome Back!</h2>
                        <p class="mb-6">Please sign in to your account</p>
                        <form>
                            <div class="mb-4">
                                <label class="block font-bold mb-2" for="email">
                                    Email
                                </label>
                                <input class=" text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email"/>
                            </div>
                            <div class="mb-6">
                                <label class="block font-bold mb-2" for="password">
                                    Password
                                </label>
                                <input class=" text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password"/>
                            </div>
                            <div class="flex items-center justify-between">
                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                    Sign In
                                </button>
                                <button onClick={()=>navigate('/newuser')} class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" >
                                    New User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;