import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Disclosure } from '@headlessui/react'
import { Button } from 'react-bootstrap';
import benz from '../assets/images/benz.jpg';
import gplay from '../assets/images/gplay.svg'
import appstore from '../assets/images/appstore.svg'
import jeep from '../assets/images/jeep.png'
import audi from '../assets/images/audi.jpg'
import logo from '../assets/logo.png'
import DefaultLayout from '../common/DefaultLayout'
import front from'../assets/fron1.jpg'
import car2 from '../assets/car2.png'

function Home() {
  const navigate = useNavigate();

  
  return (
        
    <>
     <div className="min-h-full">
        <Disclosure as="nav" className="bg-white-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    alt="Drivezy"
                    src={logo}
                    className="h-10 w-18"
                  />
                </div>
                
                
             </div>
             </div>
             </div>
             </Disclosure>
             <div>
            
             </div>
             </div>
  <DefaultLayout>
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32" >

      <div
        aria-hidden="true"
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
      >
        
      </div>
      <div
        aria-hidden="true"
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
      >
            <div className="absolute inset-0">
              
        </div>
       
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
        <div className="mx-auto max-w-2xl lg:mx-0">
          
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-4xl">Fast & Easy Way To Rent A Car</h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Drive with Drivezy
          </p><br/>
          <Button variant="success" size='lg'><Link  className='link' to= {'/dashboard'}>Book Now</Link></Button>
        </div>
      </div>
    </div>
    <div></div> 
   
            <div className="flex justify-center mt-24">
                <img className="z-50" src={jeep} alt=""/>
            </div>
            
            <div className="container mx-auto p-6 justify-center mt-28 mb-20">
                <div className="grid lg:grid-cols-2 gap-4 px-16">
                    <div className="">
                        <img className="" src={benz} alt="" />
                    </div>
                    <div className="w-3/4 text-center">
                        <h1 className='text-4xl font-bold font-sans mb-4'>Download our app to get most out of it</h1>
                        <p className="text-base text-[#706f7b]  font-sans">
                        Thrown shy denote ten ladies though ask saw. Or by to he going think order event music. 
                        Incommode so intention defective at convinced. Led income months itself and houses you.
                        </p>
                        <div className="grid lg:grid-cols-2 gap-4 my-6">
                            <a target='_blank' href="https://play.google.com/store/search?q=carrental&c=apps"><img className="transform hover:-translate-x-2 hover:-translate-y-2 transition duration-300 hover:shadow-xl" style={{cursor:"pointer"}} src={gplay} alt=""/></a>
                            <a target='_blank' href="https://www.apple.com/in/search/carrental?src=globalnav"><img className="transform hover:-translate-x-2 hover:-translate-y-2 transition duration-300 hover:shadow-xl" style={{cursor:"pointer"}} src={appstore} alt=""/></a>
                        </div>
                    </div>                    
                </div>
           </div>
           <div className="w-full bg-[#2d2d2d]">
                <div className="container mx-auto py-12 justify-center text-center">
                    <h2 className="text-white font-bold font-sans text-6xl py-3">Save big with our cheap car rental!</h2>
                    <h3 className="text-white font-semibold font-sans text-3xl py-3">Top Airports. Local Suppliers. <span className="text-orange">24/7</span> Support.&nbsp;&nbsp;&nbsp; <Button variant="outline-light"  size='lg'>
                      <Link to='/contactus' className='link'>Contact With Us</Link></Button></h3>
                </div>
            </div>
           </DefaultLayout>
    </>
  );
}

export default Home