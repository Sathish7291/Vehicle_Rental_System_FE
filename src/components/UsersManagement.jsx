import React,{useState,useEffect} from 'react'
import TopBar from '../common/TopBar'
import useLogout from '../hooks/useLogout'
import ApiRoutes from '../utils/ApiRoutes'
import apiService from '../service/apiService'
import TableComponent from '../common/TableComponent'
import { Button ,ToggleButton} from 'react-bootstrap'

function UsersManagement() {
  let [data,setData] = useState([])
  let logout = useLogout()

  const getData = async()=>{
    try {
      let {GET_ALL_USERS} = ApiRoutes
      let response = await apiService.get(GET_ALL_USERS.path,{
        authenticate:GET_ALL_USERS.authenticate
      })
      setData(response.data)
    } catch (error) {
      if(error.status === 401)
        logout()
    }
  }

  let handleStatusChange = async(status,id)=>{
    try {
      let {USERS_UPDATE_STATUS} = ApiRoutes
      let response = await apiService.put(`${USERS_UPDATE_STATUS.path}/${id}`,{status},{
        authenticate:USERS_UPDATE_STATUS.authenticate
      })
      getData()
    } catch (error) {
      if(error.status === 401)
        logout()
    }
  }

  useEffect(()=>{
    getData()
  },[])
  
  let columns= [
    {
      title:"Name",
      dataIndex:"name",
      render: (e)=>e["name"]
    },
    {
      title:"Email",
      dataIndex:"email",
      render: (e)=>e["email"]
    },
    {
      title:"Mobile",
      dataIndex:"mobile",
      render: (e)=>e["mobile"]
    },
    {
      title:"Address",
      dataIndex:"address",
      render: (e)=>e["address"]
    },
    {
      title:"Role",
      dataIndex:"role",
      render: (e)=>e["role"].toUpperCase()
    },
    {
      title:"Status",
      role:["admin"],
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
            ["verified","not_verified"].filter(status=>e.status!=status).map((s,i)=>{
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
    <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">User Management</h2>
        
      </div>
  <div className='container-fluid'>
    <TableComponent
      col={columns}
      row={data}
    />
  </div>
  </>
}

export default UsersManagement