import Login from "../components/Login";
import Signup from "../components/Signup";
import Home from "../components/Home";
import DashBoard from "../components/DashBoard";
import MyBookings from "../components/MyBookings";
import MyListings from "../components/MyListings";
import Profile from "../components/Profile";
import UsersManagement from "../components/UsersManagement";
import VehicleManagament from "../components/VehicleManagament";
import MyTransactions from "../components/MyTransactions";
import { Navigate } from "react-router-dom";
import AddVehicle from "../components/AddVehicle";
import ProtectedRoute from "../utils/ProtectedRoute"
import AdminGaurd from "../utils/AdminGaurd"
import BookingCar from "../components/BookingCar";
import Contactus from "../components/Contactus";



const AppRoutes = [
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/signup',
        element: <Signup/>
    },
    {
        path:'/',
        element:<Home/>
    },
    {
        path:'/dashboard',
        element:<ProtectedRoute><DashBoard/></ProtectedRoute>
    },
    {
        path:'/bookings',
        element:<ProtectedRoute><MyBookings/></ProtectedRoute>
    },
    {
        path:'/mylistings',
        element:<ProtectedRoute><MyListings/></ProtectedRoute>
    },
    {
        path:'/transaction',
        element:<ProtectedRoute><MyTransactions/></ProtectedRoute>
    },
    {
        path:'/profile',
        element:<ProtectedRoute><Profile/></ProtectedRoute>
    },
    {
        path:'/allusers',
        element:<ProtectedRoute><UsersManagement/></ProtectedRoute>
    },
    {
        path:'/allvehicles',
        element:<ProtectedRoute><VehicleManagament/></ProtectedRoute>
    },
    {
        path:'/addvehicle',
        element:<ProtectedRoute><AddVehicle/></ProtectedRoute>
    },
    {
        path:'/*',
        element:<Navigate to={'/'}/>
    },
    {
        path:'/booking/:id',
        element:<ProtectedRoute><BookingCar/></ProtectedRoute>
    },
    {
        path: '/contactus',
        element:<ProtectedRoute><Contactus/></ProtectedRoute>
    }
]

export default AppRoutes