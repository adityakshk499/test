import React, { useContext } from "react";
import {useNavigate} from "react-router-dom"
import { StoreContext } from "../.././context/StoreContext";
import { GiCrossedBones } from "react-icons/gi";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import "./cart.css";

const cart = () => {
  const { cartItems, food_list, removeFromCart,getTotalCartAmount,url } = useContext(StoreContext);
  const navigate = useNavigate()
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>
                    <MdOutlineCurrencyRupee />
                    {item.price}
                  </p>
                  <p>{cartItems[item._id]}</p>
                  <p>
                    <MdOutlineCurrencyRupee />
                    {item.price * cartItems[item._id]}
                  </p>
                  <p
                    className="cart-cross"
                    onClick={() => removeFromCart(item._id)}
                  >
                    <GiCrossedBones />
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
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
          <button onClick={()=>navigate("/order")}>Proceed to Checkout </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If You have Promo Code ,Enter Here</p>
            <div className="cart-promocode-inputs">
              <input type="text" placeholder="Coupon Code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default cart;
