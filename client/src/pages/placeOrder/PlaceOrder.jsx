import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import "./PlaceOrder.css"
import { StoreContext } from '../../context/StoreContext'
import { GiCrossedBones } from "react-icons/gi";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import {useNavigate }from "react-router-dom"

const PlaceOrder = () => {
  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext);

  const [data,setData] = useState({
    firstName:'',
    lastName:"",
    email:"",
    street:"",
    city:"",
    zip:"",
    state:"",
    country:"",
    phone:""
  })

  const onchangeHandler = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setData(data =>({...data,[name]:value}))
  }
  const placeOrder = async(e)=>{
    e.preventDefault();

    let orderItems =[];
    food_list.map((item)=>{
      if(cartItems[item._id]>0) {
        let itemInfo = item;      
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    console.log(orderItems)
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+29,
    }
    let response = await axios.post(url+"/place",orderData,{headers:{token}});
    console.log(response)
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Error")
    }

  }
  const navigate = useNavigate();
  useEffect(()=>{
    if(!token){
      navigate("/cart")
    }else if(getTotalCartAmount() === 0){
      navigate("/cart")
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required  name='firstName' onChange={onchangeHandler} value={data.firstName}  type="text" placeholder='First Name'/>
          <input required  name='lastName' onChange={onchangeHandler} value={data.lastName} type="text" placeholder='Last Name'/>
        </div>
        <input required  name='email' onChange={onchangeHandler} value={data.email} type="email" placeholder='Email Address'/>
        <input  required name='street' onChange={onchangeHandler} value={data.street} type="text" placeholder='street'/>
        <div className="multi-fields">
          <input required  name='city' onChange={onchangeHandler} value={data.city} type="text" placeholder='City'/>
          <input required  name='state' onChange={onchangeHandler} value={data.state} type="text" placeholder='State'/>
        </div>
        <div className="multi-fields">
          <input required  name='zip' onChange={onchangeHandler} value={data.zip} type="text" placeholder='Zip code'/>
          <input required  name='country' onChange={onchangeHandler} value={data.country} type="text" placeholder='Country'/>
        </div>
        <input required  name='phone' onChange={onchangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>

      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-deatils">
              <p>SubTotal</p>
              <p><MdOutlineCurrencyRupee />{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-deatils">
              <p>Delivery Fee</p>
              <p><MdOutlineCurrencyRupee />{getTotalCartAmount()===0 ?"0": 29}</p>
            </div>
            <hr />
            <div className="cart-total-deatils">
              <b>Total</b>
              <b><MdOutlineCurrencyRupee />{getTotalCartAmount()===0 ?"0":getTotalCartAmount()+29}</b>
            </div>
          </div>
          <button type='submit'>Proceed to Payment </button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
