import React from 'react'
import "./Orders.css"
import { useState } from 'react'
import {toast} from "react-toastify"
import axios from "axios"
import { useEffect } from 'react'
import {assets} from "../../assets/assets"
import { MdOutlineCurrencyRupee } from "react-icons/md";

const Orders = ({url}) => {

  const [orders,setOrders]=useState([]);

  const getAllOrders = async()=>{
    const response = await axios.get(`${url}/orders`)
    if(response.data.data){
    setOrders(response.data.data)
    console.log(response.data.data)
  }else{
    toast.error("Error")
  }
  }
  const statusHandler = async(e,orderId)=>{
    const response= await axios.post(`${url}/status`,{
      orderId,
      status:e.target.value
    })
    if(response.data.success){
      await getAllOrders();
    }
  }

  useEffect(()=>{
    getAllOrders();
  },[])
  return (
    <div className='order add'>
     <h2>Order Page</h2> 
     <div className="order-list">
      {
        orders.map((order,index)=>(
          <div key={index}className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div> 
              <p className="order-item-food">
                {
                  order.items.map((item,index)=>{
                    if(index===order.items.length-1) {
                      return item.name + " x " + item.quantity  
                    }
                    else{
                      return item.name + " x " + item.quantity + ","
                    }
                  })
                } 
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + "," + order.address.state  + "," +order.address.country+ "," + order.address.zip}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p className='item'>Items:{order.items.length}</p>
            <p><MdOutlineCurrencyRupee />{order.amount}</p>
            <select onChange={(e)=>statusHandler(e,order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out Of Delivery">Out Of Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))
      }
     </div>
    </div>
  )
}

export default Orders
