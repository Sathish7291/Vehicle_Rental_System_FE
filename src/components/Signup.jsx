import React from 'react'
import { useNavigate ,Link } from 'react-router-dom'
import api from '../service/apiService'
import toast from 'react-hot-toast'
import ApiRoutes from '../utils/ApiRoutes'
import logincar from '../assets/logincar.jpg'

function Signup() {
    const navigate = useNavigate()

    const handleSignUp = async(e)=>{
      
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const data = {}
      for (let [key, value] of formData.entries())
        data[key] = value
      
      let response = await api.post(ApiRoutes.SIGNUP.path,data,{authenticate:ApiRoutes.SIGNUP.authenticate})
  
      toast.success(response.message)
  
      navigate('/login')
    }
  return (
    <section className="relative py-10 bg-gray-900 sm:py-16 lg:py-24">
    <div className="absolute inset-0">
        <img className="object-cover w-full h-full" src={logincar} alt="" />
    </div>
    <div className="absolute inset-0 bg-gray-900/20"></div>

    <div className="relative max-w-lg px-4 mx-auto sm:px-0">
        <div className="overflow-hidden bg-gray rounded-md shadow-md">
            <div className="px-4 py-6 sm:px-8 sm:py-7">
                <div className="text-center">
                    <h2 className="text-3xl font text-white">Create an account</h2>
                    <p className="mt-2 text-base text-white">Already joined? login <Link to='/login'>Here</Link></p>
                </div>

                <form action="#" method="POST" className="mt-8" onSubmit={handleSignUp}>
                    <div className="space-y-5">
                        <div>
                            <label for="" className="text-base font-medium text-white"> First & Last name </label>
                            <div className="mt-2.5">
                                <input type="text" name="name" id="" placeholder="Enter your full name" className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                            </div>
                        </div>

                        <div>
                            <label for="" className="text-base font-medium text-white"> Email address </label>
                            <div className="mt-2.5">
                                <input type="email" name="email" id="" placeholder="Enter email to get started" className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                            </div>
                        </div>

                        <div>
                            <label for="" className="text-base font-medium text-white"> Mobile </label>
                            <div className="mt-2.5">
                                <input type="mobile" name="mobile" id="" placeholder="Enter mobile" className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                            </div>
                        </div>

                        <div>
                            <label for="" className="text-base font-medium text-white"> Password </label>
                            <div className="mt-2.5">
                                <input type="password" name="password" id="" placeholder="Enter your password" className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                            </div>
                        </div>

                        <div>
                            <label for="" className="text-base font-medium text-white"> Address</label>
                            <div className="mt-2.5">
                            <textarea
      className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border placeholder-gray-500 border-blue-gray-200 border-t-transparent  px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all  focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-white-50"
      placeholder="Enter your address" name='address'></textarea>
                            </div>
                        </div>
                        

                        <div>
                            <button type="submit" className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">Sign up</button>
                        </div>
                    </div>
                </form>

                <p className="max-w-xs mx-auto mt-5 text-sm text-center text-white">
                    This site is protected by reCAPTCHA and the Google <a href="#" title="" className="text-blue-600 transition-all duration-200 hover:underline hover:text-blue-700">Privacy Policy</a> &
                    <a href="#" title="" className="text-blue-600 transition-all duration-200 hover:underline hover:text-blue-700">Terms of Service</a>
                </p>
            </div>
        </div>
    </div>
</section>

 
  )
}

export default Signup