import React from "react";
import { assets } from "../../assets/assets";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Explore tasty recipes, cooking advice, and kitchen inspiration on
            our food website. Whether you need a quick meal or want to cook a
            gourmet dish, we've got you covered for every occasion.
          </p>
          <div className="footer-social-links">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get In Touch</h2>
          <ul>
            <li>+91 9548751618</li>
            <li>foodwebsite@gmail.com</li>
            <li>Made By Abhishek</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">@copyRight 2024-All Right Reserved</p>
    </div>
  );
};

export default Footer;
