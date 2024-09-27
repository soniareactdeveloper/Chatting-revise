import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "../Components/Navbar/Navbar"
import { useSelector } from "react-redux"
import { useEffect } from "react"


const LayoutOne = () => {
   // getting data from redux
 const sliceUser = useSelector((state)=> state.counter.value)
 const navigate  = useNavigate()

  // rendering the component based on the data
    useEffect(()=>{
      
      if(sliceUser == null){
        navigate('/login')  
      }
    },[])
    
  return (
    <div className="flex">
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default LayoutOne