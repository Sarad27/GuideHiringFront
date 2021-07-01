import React from "react";
import {Redirect, useHistory} from "react-router-dom";
import axios from "axios";

import './profile.css'

const Guide = (props) =>{

    const history = useHistory();

    const user = props.data

    const logout = async () =>{

    const token = localStorage.getItem('user');

    await axios.get('http://localhost:5000/api/auth/logout', {headers: {"Authorization" : `Bearer ${token}`}}) 

    localStorage.removeItem('user');

    history.go(0);

    }

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

                <button onClick={logout} className="logout">Log out</button>

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
