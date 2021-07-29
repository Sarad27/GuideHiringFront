import React, { useEffect, useState } from "react";

import './Notification.css';

const Notification = (props) =>{

    const redirectRespond = () =>{

       window.location.href= "http://localhost:3000/profile"
    }

    if(props.data == null){
        return null
    }else if(props.data.status){
        return(
            <>
                <h1>Notification ALert</h1>
                <p>{props.data.guideName} has {props.data.status} you for guiding {props.data.destination}</p>
            </>
           
        )
    }else{
        return(
            <>
                <h1>Notification ALert</h1>
                <p>{props.data.touristName} has hired you for guiding {props.data.destination}</p>
                <button onClick={redirectRespond}>Respond</button>
            </>
           
        )
    }

}

export default Notification;