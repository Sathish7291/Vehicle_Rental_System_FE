import {React ,useState , useEffect}from 'react'
import TopBar from '../common/TopBar'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BlogCard from '../common/BlogCard';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import DefaultLayout from '../common/DefaultLayout';
import avathar from '../assets/avathar.png'
import useLogout from '../hooks/useLogout';
import ApiRoutes from '../utils/ApiRoutes';
import apiService from '../service/apiService'
import { useParams } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

function Profile() {
  let token = sessionStorage.getItem("token");
  const id = jwtDecode(token).id;

  let [data,setData] = useState([])
  let logout = useLogout()
  
  const getData = async()=>{
    try {
      let {GET_USER_BY_ID} = ApiRoutes
      let response = await apiService.get(`${GET_USER_BY_ID.path}/${id}`,{
        authenticate:GET_USER_BY_ID.authenticate
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
  return (<>
    <TopBar/>
    <DefaultLayout>
    <Container fluid><div className='avathar1'>
    <img src={avathar} alt="Avatar" className="avatar"/><br/><Button variant='outline-success' disabled>{data.status}</Button>
    </div>
    <br/>
    <br/>
      <Row>
        <Col>
          <Form  className='profile'>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder={data.name} disabled/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder={data.email}  disabled/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mobile</Form.Label>
              <Form.Control type="text" placeholder={data.mobile}  disabled/>
            </Form.Group>
          </Form>
          </Col>
          <Col>
          <Form className='profile'>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control as="textarea" placeholder={data.address} disabled/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Created At : </Form.Label>&nbsp;
              {data.createdAt}
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
    </DefaultLayout>
    </>
  )
}

export default Profile