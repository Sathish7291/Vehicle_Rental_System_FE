import React, { useState, useEffect } from "react";
import { Col, Row } from "antd";
import TopBar from "../common/TopBar";
import moment from "moment";
import ApiRoutes from "../utils/ApiRoutes";
import apiService from "../service/apiService"
import useLogout from "../hooks/useLogout";
import DefaultLayout from "../common/DefaultLayout";

function MyBookings() {
  
  const id = sessionStorage.getItem("id");

  let [data,setData] = useState([])
  let logout = useLogout()
  
  const getData = async()=>{
    try {
      let {GET_ALL_BOOKINGS} = ApiRoutes
      let response = await apiService.get(GET_ALL_BOOKINGS.path,{
        authenticate:GET_ALL_BOOKINGS.authenticate
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
  console.log(data)

  return (
    <>
      <TopBar/>
      
      <DefaultLayout>
      <h3 className="text-center mt-2">My Bookings</h3>
    
      <Row justify="center" gutter={16}>
        <Col lg={16} sm={24}>
         
            {data.filter(o=>o.userId==id).map(booking => {
             return <Row gutter={16} className="bs1 mt-3 text-left">
                <Col lg={6} sm={24}>
                <p><b>{booking.carname}</b></p>
                    <p>Total hours : <b>{booking.totalHours}</b></p>
                    <p>Rent per hour : <b>{booking.carprice}</b></p>
                    <p>Total amount : <b>{booking.totalAmount}</b></p>
                </Col>

                <Col lg={12} sm={24}>
                <p>Transaction Id : <b>{booking.transactionId}</b></p>
                <p>From: <b>{booking.bookedTimeSlots.from}</b></p>
                <p>To: <b>{booking.bookedTimeSlots.to}</b></p>
                <p>Date of booking: <b>{moment(booking.createdAt).format('MMM DD yyyy')}</b></p>
                </Col>

                <Col lg={6} sm={24} className='text-right'>
                    <img style={{borderRadius:5}} src={booking.carimage} height="140" className="p-2"/>
                </Col>
              </Row>;
            })}
          
        </Col>
      </Row>
  </DefaultLayout>
    </>
  );
}


export default MyBookings;
