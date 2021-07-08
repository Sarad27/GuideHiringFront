import React, {useEffect, useState} from "react";
import {Redirect, useHistory} from "react-router-dom";
import axios from "axios";

import './profile.css'

const Tourist = (props) =>{

    const history = useHistory();

    const user = props.data


    const [hiredata, setHireData] = useState(null);

    const logout = async () =>{

        const token = localStorage.getItem('user');

        await axios.get('http://localhost:5000/api/auth/logout', {headers: {"Authorization" : `Bearer ${token}`}}) 

        localStorage.removeItem('user');

        history.go(0);

    }


    useEffect(async() =>{

        const token = localStorage.getItem('user');

        const hireData = await axios.get("http://localhost:5000/api/hire", {headers: {"Authorization" : `Bearer ${token}`}})

        setHireData(hireData.data.results[0])  

    } ,[])

    return(

        <>

        <div className="profile">
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

                <p>City : {user.tProfile.city}</p>
                <p>Country : {user.tProfile.country}</p>
                <p>Language : {user.tProfile.language}</p>
            </div>
        </div>

        <div className="profile">

        <div className="notification_content">

            <h3>Recent Notification</h3>

            {
                hiredata == null ? null :

                hiredata !== null && hiredata.status == "Pending" ? 

             
                <p style={{padding: '40px'}}> Waiting for confirmation of {hiredata.guide.name} For <span style={{color: 'green'}}>Guiding </span> location {hiredata.destination.name} </p>

           

            :

            hiredata !== null && hiredata.status == "Accepted" ? 

            <p style={{padding: '40px'}}>{hiredata.guide.name} Have <span style={{color: 'green'}}>accepted </span>your Hire Request of  location {hiredata.destination.name}</p>

            :

            hiredata !== null && hiredata.status == "Rejected" ? 

            <p style={{padding: '40px'}}>{hiredata.guide.name} Have <span style={{color: 'red'}}>cancelled </span> your Hire Request of location {hiredata.destination.name}</p>

            :
            null

            }


        </div>


        </div>

        </>

    )
}

export default Tourist;