import React from 'react';
import LoaderImg from "../../images/loader.svg";
import "./Loader.css";

const Loader = () => {
  return (
    <div className='loader flex flex-c' >
      <img src = {LoaderImg} alt = "loader" style={{color:'#3b3b6d'}}/>
    </div>
  )
}

export default Loader