import React, { useEffect, useState } from 'react'
import "./List.css"
import axios  from "axios"
import { toast } from 'react-toastify'
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { GiCrossedSwords } from "react-icons/gi";


const List = ({url}) => {

  const [list , setList]=useState([])


  const getList = async()=>{
    const response = await axios.get(`${url}/list`)
    if(response.data.success){
      setList(response.data.data)
    }else{
      toast.error("Error") 
    }
  }

  const removeFood = async(foodId)=>{
    const response = await axios.post(`${url}/remove`,{id:foodId})
    await getList();
    if(response.data.success){
      toast.success(response.data.message)
    }else{
      toast.error('error')
    }
    }
  


  useEffect(()=>{
  getList();
  },[])


  return (
    <div className='add-list flex-col'>
      <p className='heading-list'>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Remove</b>
        </div>
        {
          list.map((item,index)=>{
            return(
              <div key={index} className='list-table-format'>
                <img src={`${url}/images/`+item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>< MdOutlineCurrencyRupee/>{item.price}</p>
                <p onClick={()=>removeFood(item._id)} className='remove-icon'>< GiCrossedSwords/></p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default List
