import React,{useState} from 'react'
import TopBar from '../common/TopBar'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BlogCard from '../common/BlogCard';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import apiService from '../service/apiService'
import ApiRoutes from '../utils/ApiRoutes';
import { useNavigate } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import DefaultLayout from '../common/DefaultLayout';

const validExtensions = ["jpg","png","jpeg"]

function AddVehicle() {
  let [name,setName] = useState(null)
  let [model,setModel] = useState(null)
  let [year,setYear] = useState(null)
  let [description,setDesc] = useState(null)
  let [image,setImage] = useState(null)
  let [price_per_hour,setPrice_per_hour] = useState(null)
  let [location,setLocation] = useState(null)
  let navigate = useNavigate();
  let logout = useLogout()
  const validateFile = (file)=>{
    
    let extension = file.name.split(".")[file.name.split(".").length-1]
    return validExtensions.includes(extension)
  }

  const handleFileChange = (e)=>{
    let file = e.target.files[0]
    if(validateFile(file))
    {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        setImage(reader.result)
      }
    }
    else
    {
      toast.error(`Invalid Image. Only ${validExtensions.join(",")} are allowed!`)
    }
  }

  const handleSubmit = async()=>{
    try {
      let {ADD_VEHICLE} = ApiRoutes
      let response = await apiService.post(`${ADD_VEHICLE.path}`,{name,model,year,image,description,price_per_hour,location},{
        authenticate:ADD_VEHICLE.authenticate
      })
      toast.success(response.message)
      navigate('/mylistings')
    } catch (error) {
      if(error.status === 401)
        logout()
    }
  }

  return <>
    <TopBar/>
    <DefaultLayout>
    <Container fluid>
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Vehicle Name"  onChange={(e)=>setName(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Model</Form.Label>
              <Form.Control type="text" placeholder="Enter Model"  onChange={(e)=>setModel(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Year</Form.Label>
              <Form.Control type="text" placeholder="Enter Year"  onChange={(e)=>setYear(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" name="file" onChange={handleFileChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" onChange={(e)=>setDesc(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price_per_hour</Form.Label>
              <Form.Control type="text" placeholder="Enter price_per_hour"  onChange={(e)=>setPrice_per_hour(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" placeholder="Enter location"  onChange={(e)=>setLocation(e.target.value)}/>
            </Form.Group>

            <Button variant="primary" onClick={()=>handleSubmit()}>
              Submit
            </Button>
          </Form>
        </Col>
        <Col><BlogCard data={{name,model,year,image,description,price_per_hour,location}}/></Col>
      </Row>
    </Container><br/><br/>
    </DefaultLayout>
  </>
}

export default AddVehicle