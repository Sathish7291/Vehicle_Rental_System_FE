import React , {useState,useEffect} from 'react'
import { Col, Row, Divider, DatePicker, Checkbox, Modal } from 'antd';
import TopBar from '../common/TopBar'
import { useParams } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import ApiRoutes from '../utils/ApiRoutes';
import apiService from '../service/apiService';
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import DefaultLayout from '../common/DefaultLayout';
import { jwtDecode } from 'jwt-decode';

const { RangePicker } = DatePicker;

function BookingCar() {
     const {id} = useParams();
     let token = sessionStorage.getItem("token");
     const userid = jwtDecode(token).id;
   
     const [car, setcar] = useState({});
     let [data,setData] = useState({});
     const [from, setFrom] = useState();
     const [to, setTo] = useState();
     const [totalHours, setTotalHours] = useState(0);
     const [driver, setdriver] = useState(false);
     const [totalAmount, setTotalAmount] = useState(0);
     const [showModal, setShowModal] = useState(false);
     let logout = useLogout()
     
  
     const getData = async()=>{
       try {
         let {GET_VEHICLE_BY_ID} = ApiRoutes
         let response = await apiService.get(`${GET_VEHICLE_BY_ID.path}/${id}`,{
           authenticate:GET_VEHICLE_BY_ID.authenticate
         })
         setData(response.data)
       } catch (error) {
         if(error.status === 401)
           logout()
       }
     }
   
     useEffect(() => {
          getData();
    }, []);
    console.log(data)

    useEffect(() => {
      setTotalAmount(totalHours * data.price_per_hour);
      if (driver) {
        setTotalAmount(totalAmount + 30 * totalHours);
      }
    }, [driver, totalHours]);

    function selectTimeSlots(values) {
      setFrom(moment(values[0]).format("MMM DD YYYY HH:mm"));
      setTo(moment(values[1]).format("MMM DD YYYY HH:mm"));
  
      setTotalHours(values[1].diff(values[0], "hours"));
    }

    function onToken(token){
      const handleSubmit = async()=>{
        try {
          let {BOOK_CAR} = ApiRoutes
          let response = await apiService.post(`${BOOK_CAR.path}`,{token,
            userId: userid,
            vehicleId: id,
            totalHours,
            totalAmount,
            driverRequired: driver,
            bookedTimeSlots: {
              from,
              to,}},{
            authenticate:BOOK_CAR.authenticate
          })
          toast.success(response.message)
        } catch (error) {
          if(error.status === 401)
            logout()
        }
      }
    }
    

  return (<>
    <TopBar/>
    <DefaultLayout>
    <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <Col lg={10} sm={24} xs={24} className='p-3'>
          <img src={data.image} className="carimg2 bs1 w-100"/>
        </Col>

        <Col lg={10} sm={24} xs={24} className="text-right">
          <Divider  variant="dashed" style={{borderColor: 'orangered',}} dashed>
            Car Info
          </Divider>
          <div style={{ textAlign: "right" }}>
            <p>{data.name}</p>
            <p>{data.price_per_hour}₹ Rent Per hour /-</p>
            <p>Model : {data.model}</p>
            <p>Year : {data.year}</p>
            <p>Description : {data.description}</p>
            <p>location : {data.location}</p>
          </div>

          <Divider   variant="dashed" style={{borderColor: 'orangered',}} dashed>
            Select Time Slots
          </Divider>
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD YYYY HH:mm"
            onChange={selectTimeSlots}
          />
          <br />
          <button
            className="btn1 mt-2"
            onClick={() => {
              setShowModal(true);
            }}
          >
            See Booked Slots
          </button>
          {from && to && (
            <div>
              <p>
                Total Hours : <b>{totalHours}</b>
              </p>
              <p>
                Rent Per Hour : <b>{data.price_per_hour}</b>
              </p>
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    setdriver(true);
                  } else {
                    setdriver(false);
                  }
                }}
              >
                Driver Required
              </Checkbox>

              <h3>Total Amount : {totalAmount}</h3>

              <StripeCheckout
                shippingAddress
                token={onToken}
                currency='inr'
                amount={totalAmount * 100}
                stripeKey="pk_test_51Q6XKsRwligArDQc5BX4mTTbinn1ACKHNqox1NIvAeJqGhQUBNrbh0rosgJ8IfTGlmkbstQiAHjok3179sQN663d00wOeGfv4V"
              >
                  <button className="btn1" >
                Book Now
              </button>
            
              </StripeCheckout>
            </div>
          )}
        </Col>

        {data.name && (
          <Modal
            visible={showModal}
            closable={false}
            footer={false}
            title="Booked time slots"
          >
            <div className="p-2">
              {data.bookedTimeSlots.map((slot) => {
                return (
                  <button className="btn1 mt-2">
                    {slot.from} - {slot.to}
                  </button>
                );
              })}

              <div className="text-right mt-5">
                <button
                  className="btn1"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </Modal>
        )}
      </Row>

      </DefaultLayout>
    </>
  )
}

export default BookingCar