import React,{useEffect} from "react"
import api from '../service/apiService'
import ApiRoutes from '../utils/ApiRoutes'
import { useNavigate,Link, useParams} from "react-router-dom"
import toast from "react-hot-toast"
import login from '../assets/logincar.jpg'

function Login() {
    let {city} = useParams();
    const navigate = useNavigate()

    const handleLogin = async(e) =>{
        e.preventDefault()
        try {
            const formData = new FormData(e.currentTarget)
            const data = {}
            console.log(data)
            for (let [key, value] of formData.entries())
              data[key] = value
      
            let response = await api.post(ApiRoutes.LOGIN.path,data,{
              authenticate:ApiRoutes.LOGIN.authenticate
        })
        toast.success(response.message)

        sessionStorage.setItem("token",response.token)
        sessionStorage.setItem("role",response.role)
  
        navigate(`/dashboard`)
    }
        catch (error) {
            toast.error(error.response.data.message || "Error Occured! Please try again!")
        }
    }

    useEffect(()=>{
        sessionStorage.clear()
      },[])

    return (
        <section className="relative py-10 bg-gray-900 sm:py-16 lg:py-24">
        <div className="absolute inset-0">
            <img className="object-cover w-full h-full" src={login} alt="" />
        </div>
        <div className="absolute inset-0 bg-gray-900/20"></div>
    
        <div className="relative max-w-lg px-4 mx-auto sm:px-0">
            <div className="overflow-hidden bg-gray rounded-md shadow-md">
                <div className="px-4 py-6 sm:px-8 sm:py-7">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-white">Welcome back</h2>
                        <p className="mt-2 text-base text-white">Don’t have one? <Link to='/signup'>Create a free account</Link></p>
                    </div>
    
                    <form className="mt-8" onSubmit={handleLogin}>
                        <div className="space-y-5">
                            <div>
                                <label for="" className="text-base font-medium text-white"> Email address </label>
                                <div className="mt-2.5">
                                    <input type="email" name="email" id="" placeholder="Enter email to get started" className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                                </div>
                            </div>
    
                            <div>
                                <div className="flex items-center justify-between">
                                    <label for="" className="text-base font-medium text-white"> Password </label>
    
                                    <a href="#" title="" className="text-sm font-medium transition-all duration-200 text-rose-500 hover:text-rose-600 focus:text-rose-600 hover:underline"> Forgot password? </a>
                                </div>
                                <div className="mt-2.5">
                                    <input type="password" name="password" id="" placeholder="Enter your password" className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                                </div>
                            </div>
    
                            <div>
                                <button type="submit" className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">Log in</button>
                            </div>
    
                           
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
    
    )
  }
  

export default Login