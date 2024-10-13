import React,{useState,useEffect} from 'react'
import TopBar from '../common/TopBar'
import { Link } from 'react-router-dom'
import useLogout from '../hooks/useLogout'
import ApiRoutes from '../utils/ApiRoutes'
import apiService from '../service/apiService'
import TableComponent from '../common/TableComponent'
import Button from 'react-bootstrap/esm/Button'
import DefaultLayout from '../common/DefaultLayout'

function MyListings() {
  let role = sessionStorage.getItem("role")

  let [data,setData] = useState([])
  let logout = useLogout()
  
  const getData = async()=>{
    try {
      let {GET_VEHICLE_BY_USERID} = ApiRoutes
      let response = await apiService.get(GET_VEHICLE_BY_USERID.path,{
        authenticate:GET_VEHICLE_BY_USERID.authenticate
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
  

  let columns = [
    {
      title:"Name",
      role:["admin","user"],
      dataIndex:"name",
      render: (e)=>e["name"]
    },
    {
      title:"Model",
      role:["admin","user"],
      dataIndex:"model",
      render: (e)=>e["model"]
    },
    {
      title:"Year",
      role:["admin","user"],
      dataIndex:"year",
      render: (e)=>e["year"]
    },
    {
      title:"Description",
      role:["admin","user"],
      dataIndex:"description",
      render: (e)=>e["description"]
    },
    {
      title:"Image",
      role:["admin","user"],
      dataIndex:"image",
      render: (e)=>{
        return <img src={e["image"]} height="200px" width="200px"/>
      }
    },
    {
      title:"Price_Per_Hour",
      role:["admin","user"],
      dataIndex:"price_per_hour",
      render: (e)=>e["price_per_hour"]
    },
    {
      title:"Location",
      role:["admin","user"],
      dataIndex:"location",
      render: (e)=>e["location"]
    },
    {
      title:"Status",
      role:["admin","user"],
      dataIndex:"status",
      render:(e)=>{
        return e["status"].charAt(0).toUpperCase() + e["status"].slice(1)
      }
    },
    {
      title:"Actions",
      role:["admin"],
      dataIndex:null,
      render:(e)=>{
        return <div>
          {
            ["approved","pending","rejected"].filter(status=>e.status!=status).map((s,i)=>{
              return <>
                <Button onClick={()=>handleStatusChange(s.toUpperCase(),e.id)}>{s}</Button>
                &nbsp;
              </>
            })
          }
        </div>
      }
    }
  ]

  return <>
  <TopBar/>
  <DefaultLayout>
  <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">My Listings</h2>
        
      </div>
  <div className='addcar'>
  <Button variant="danger" size='lg' ><Link className='link' to='/addvehicle'>Add_Car</Link></Button>
  </div>
  <div className='container-fluid'>
    <TableComponent
      col={columns.filter(e=>e.role.includes(role))}
      row={data}
    />
  </div>
  </DefaultLayout>
  </>
}

export default MyListings