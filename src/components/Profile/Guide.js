import React from "react";
import {Col, Image, Row} from "react-bootstrap";

import './profile.css'

const Guide = (props) =>{
    const user = props.data

    console.log(user)

    return(

        <>
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

                <p>City : {user.gProfile.city}</p>
            </div>
        </>
    )
}

export default Guide;
