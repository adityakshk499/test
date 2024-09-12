import { createContext, useEffect, useState } from "react";
import axios from "axios"
export const StoreContext = createContext(null);


const StoreContextProvider = (props) =>{


  const [cartItems,setCartItems] = useState({});
  const [token,setToken]=useState("");
  const [food_list,setFoodList] = useState([]);
  const url = "https://foodie-api-tsx0.onrender.com"

  const addToCart = async(itemId) => {
    if(!cartItems[itemId]){
      setCartItems((prev)=>({...prev,[itemId]:1}))
    }
    else{
      setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    }
    if(token){
      await axios.post(`${url}/addcart`,{itemId},{headers:{token}})
    }
  }

  const removeFromCart = async(itemId) => {
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    if(token){
      await axios.post(`${url}/removecart`,{itemId},{headers:{token}})
    }
  }

  const getTotalCartAmount = ()=>{
    let totalAmount = 0;
    for(const item in cartItems){
      if(cartItems[item] > 0){
        let itemInfo = food_list.find((product)=>product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  }

  const getFoodList = async()=>{
    const response = await axios.get(`${url}/list`)
    setFoodList(response.data.data)
  }

  const loadCartData = async(token)=>{
    const response = await axios.post(`${url}/getcart`,{},{headers:{token}});
    setCartItems(response.data.cartData);
  }

  useEffect(()=>{
    async function loadData(){
      await getFoodList();
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"))
        await loadCartData(localStorage.getItem("token"))
      }
    } 
    loadData();   
  },[])

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  }

  useEffect(()=>{
    console.log(cartItems)
  },[cartItems])

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}
 

export default StoreContextProvider;
