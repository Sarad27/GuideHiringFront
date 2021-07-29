import React, {useEffect, useState} from "react";

import axios from "axios";
import {Col, Container, Row, Image} from "react-bootstrap";


import Guide from "./Guide";
import Tourist from "./Tourist";
import "./profile.css"


function ViewProfile(props){

    const [user, setUser] = useState();

    useEffect(async() =>{

        const token = localStorage.getItem('user');

        await axios.get(`http://localhost:5000/api/user/${props.match.params.id}`, {headers: {"Authorization" : `Bearer ${token}`}}).then(res =>{
            setUser(res.data.results)
        })

    },[])

    console.log(user)

   if(user == undefined){
       return null
   }else if (user.role == "GUIDE"){

    return(
        <div className="profile_holder">

    <div className="profile">
        <div className="profile_header">

            <div className="profile_image">
                <img src="/images/pp.jpg" roundedCircle />
            </div>

            <div className="profile_name">
                <h3> {user.name}</h3>
                {user.email}
                <br />
                {user.gProfile.rating}/5 rating out of {user.gProfile.rateCount} ratings
            </div>

        </div>

        <div className="profile_bio">
            <p>
                An artist of considerable range, Chet Faker — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure.

            </p>

        </div>

        <div className="profile_details">

            <p>City : {user.gProfile.city}</p>
        </div>
    </div>
    </div>

    )
    
   } else if(user.role == "TOURIST"){
       return(
        <div className="profile_holder">
        <div className="profile">
        <div className="profile_header">

            <div className="profile_image">
                <img src="/images/pp.jpg" roundedCircle />
            </div>

            <div className="profile_name">
                <h3> {user.name}</h3>
                {user.email}
            </div>

        </div>

        <div className="profile_bio">
                <p>
                    An artist of considerable range, Chet Faker — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure.

                </p>

        </div>

        <div className="profile_details">

            <p>City : {user.tProfile.city}</p>
            <p>Country : {user.tProfile.country}</p>
            <p>Language : {user.tProfile.language}</p>
        </div>
    </div>
    </div>

       )
   }

}



export default ViewProfile;