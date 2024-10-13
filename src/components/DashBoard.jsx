import React , {useState , useEffect} from 'react';
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import { Button } from 'react-bootstrap';
import ApiRoutes from '../utils/ApiRoutes'
import apiService from '../service/apiService'
import useLogout from '../hooks/useLogout';
import TopBar from '../common/TopBar';
import { Col, Row , Divider , DatePicker, Checkbox} from 'antd'
import {Link, useParams} from 'react-router-dom'
import moment from 'moment';
import DefaultLayout from '../common/DefaultLayout';


function DashBoard() {
  const {RangePicker} = DatePicker
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [city, setCity ] = useState(null);
  
  useEffect(() => {
    console.log(selectedCountry);
    console.log(selectedCountry?.isoCode);
    console.log(State?.getStatesOfCountry(selectedCountry?.isoCode));
  }, [selectedCountry]);
  let [data,setData] = useState([])
  const [totalCars , setTotalcars] = useState([])
  let logout = useLogout()
  
  const getData = async()=>{
    try {
      let {GET_ALL_APPROVED_VEHICLES} = ApiRoutes
      let response = await apiService.get(GET_ALL_APPROVED_VEHICLES.path,{
        authenticate:GET_ALL_APPROVED_VEHICLES.authenticate
      })
      setData(response.data)
    } catch (error) {
      if(error.status === 401)
        logout()
    }
  }

  
  useEffect(()=>{
    getData()
  },[])
 

  
  useEffect(() => {

    setTotalcars(data)
    
}, [data])

  function setFilter(values){

    var selectedFrom = moment(values[0] , 'MMM DD YYYY HH:mm')
    var selectedTo = moment(values[1] , 'MMM DD YYYY HH:mm')

    var temp=[]

    for(var vehicle of data){

          if(vehicle.bookedTimeSlots.length == 0){
              temp.push(vehicle)
          }
          else{

               for(var booking of vehcile.bookedTimeSlots) {

                   if(selectedFrom.isBetween(booking.from , booking.to) ||
                   selectedTo.isBetween(booking.from , booking.to) || 
                   moment(booking.from).isBetween(selectedFrom , selectedTo) ||
                   moment(booking.to).isBetween(selectedFrom , selectedTo)
                   )
                   {

                   }
                   else{
                       temp.push(vehicle)
                   }

               }

          }

    }


    setTotalcars(temp)


}

  return <>
      <TopBar/>
      <DefaultLayout>
      <div className='App' >
     
        <Select placeholder="Select Country ..." 
          options={Country.getAllCountries()}
          getOptionLabel={(options) => {
            return options["name"];
          }}
          getOptionValue={(options) => {
            return options["name"];
          }}
          value={selectedCountry}
          onChange={(item) => {
            setSelectedCountry(item);
          }}
          
        /> &nbsp;
        <Select placeholder="Select State ..."
          options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
          getOptionLabel={(options) => {
            return options["name"];
          }}
          getOptionValue={(options) => {
            return options["name"];
          }}
          value={selectedState}
          onChange={(item) => {
            setSelectedState(item);
          }}
        />&nbsp;
        <Select placeholder="Select City ..."
          options={City.getCitiesOfState(
            selectedState?.countryCode,
            selectedState?.isoCode
          )}
          getOptionLabel={(options) => {
            return options["name"];
          }}
          getOptionValue={(options) => {
            return options["name"];
          }}
          value={selectedCity}
          onChange={(item) => {
            setSelectedCity(item);
            setCity(item.name);
          }}
        />
      
      </div>
      <div className='container-Fluid'>
      <Row className='mt-3' justify='center'>
                 
                 <Col lg={20} sm={24} className='d-flex justify-content-center'>

                     <RangePicker showTime={{format: 'HH:mm'}} format='MMM DD YYYY HH:mm' onChange={setFilter}/>
                 
                 </Col>

             </Row>
            <Row justify='center' gutter={16}>

            {totalCars.filter(car=>{
                  return ((car.location).charAt(0).toUpperCase() + car.location.slice(1)== city)
            }).map(car=>{
                return <Col lg={5} sm={24} xs={24}>
                     <div className="car p-2 bs1">
                        <img src={car.image} className="carimg"/>

                        <div className="car-content d-flex align-items-center justify-content-between">

                             <div className='text-left pl-2'>
                                 <p>{car.name}</p>
                                 <p> Location : {car.location} </p>
                                 <p> Rent Per Hour <h6>{car.price_per_hour} /-</h6></p>
                             </div>

                             <div>
                                 <button className="btn1 mr-2"><Link to={`/booking/${car.id}`} className='a'>Book Now</Link></button>
                             </div>

                        </div>
                     </div>
                </Col>
            })}

       </Row>
      </div>
      </DefaultLayout>
  </>
}

export default DashBoard