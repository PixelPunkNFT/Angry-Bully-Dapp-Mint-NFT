import React from "react";
import img from "../assets/images/Background/6.png";

import { Link } from "react-router-dom";
import disableScroll from 'disable-scroll';
function Home() {
  disableScroll.on();
  return (
    <div className="row ">
        <img className="w-100 home-wallpaper d-md-block" src={img} alt="Enter the Angry Bully" />
        <div className="raw home-wallpaper-text text-center  m-auto">
                <Link to="/mint">
                  <button className=" row py-2  px-4  text-center m-auto   "  style={{ fontSize: "30px", float:"right" }}>
                    MINT
                  </button> 
                </Link>
              

  <a class="btn btn-block btn-social btn-twitter" style={{ color: "white"}} href="https://opensea.io/collection/angry-bully-yacht-club">
            <span class="fa fa-twitter"></span> Opensea
          </a>
          <a class="btn btn-block btn-social btn-twitter" style={{ color: "white"}} href="https://discord.gg/asGsQBtwhg">
            <span class="fa fa-twitter"></span> Discord
          </a>
          <a class="btn btn-block btn-social btn-twitter" style={{ color: "white"}} href="https://twitter.com/AngryBullyYC">
            <span class="fa fa-twitter"></span> Twitter
          </a>
            </div>
            </div>
            
          
        
          
        
   
           
   
  );
}

export default Home;
