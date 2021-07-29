import React, { useEffect, useState } from "react";
import {Redirect, useHistory} from "react-router-dom";
import axios from "axios";


import io from "socket.io-client";


import './profile.css'


const Guide = (props) =>{


    const [hiredata, setHireData] = useState(null);

    const history = useHistory();

    const user = props.data



    const logout = async () =>{

            const token = localStorage.getItem('user');

            await axios.get('http://localhost:5000/api/auth/logout', {headers: {"Authorization" : `Bearer ${token}`}}) 

            localStorage.removeItem('user');

            history.go(0);

    }

    const confirmHire = async(value) =>{

        const token = localStorage.getItem('user');

        const data = {
            status: value
        };

        await axios.post(`http://localhost:5000/api/hire/confirm/${hiredata._id}`, data ,  {headers: {"Authorization" : `Bearer ${token}`}})
            .then(res =>{

                 var socketData = res.data.results

                 if(res.data.code == 201){

                    props.socket.emit("Hire Notification To Tourist", (socketData))

                }

            })

        window.location.reload();

    }

    const completedHire = async() =>{

        const token = localStorage.getItem('user');

        await axios.put(`http://localhost:5000/api/user/updateUser`, {data: hiredata} ,  {headers: {"Authorization" : `Bearer ${token}`}})
            
        window.location.reload();

    }

    // console.log(props.data._id)


    // useEffect(() =>{


    //     if(props.data._id != null) {
    //         console.log(props.data._id)
    //         const socket = io("http://localhost:5000/",{secure: true, reconnection: true, rejectUnauthorized: false });

    
    //         socket.on("Hire Notification", (data) =>{
    //             if(data.guide === props.data._id){
    //                 console.log("Request For Hire")
    //             }
    //         })
    
    //     }
       
    // },[])


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
                    <br />
                {user.gProfile.rating}/5 rating out of {user.gProfile.rateCount} ratings
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
        </div>

        <div className="profile">

            <div className="notification_content">

            <h3>Recent Notification</h3>

            {

                hiredata == null ? <p style={{padding: '40px'}}>No New Notifications</p> :


            hiredata !== null && hiredata.status == "Pending" ? 

            <div>
                <p>  {hiredata.tourist.name} Hired Your For location {hiredata.destination.name} </p>
           


            <button className="notificationBtn notificationGreen" onClick={()=> confirmHire("Accepted")}>Accept</button>  
            <button className="notificationBtn notificationRed" onClick={() =>confirmHire("Rejected")}>Deny</button>

            </div>

            :

            hiredata !== null && hiredata.status == "Accepted" ? 

            <>

            <p style={{padding: '40px'}}>You Have <span style={{color: 'green'}}>accepted </span>the Hire Request of {hiredata.tourist.name} to guide him in location {hiredata.destination.name}</p>

            <button onClick = {() => completedHire()}>Completed</button>

            </>
            :

            hiredata !== null && hiredata.status == "Rejected" ? 

            <p style={{padding: '40px'}}>You Have <span style={{color: 'red'}}>cancelled </span> the Hire Request of {hiredata.tourist.name} to guide him in location {hiredata.destination.name}</p>

            :

            hiredata !== null && hiredata.status == "Completed" ? 

            <p style={{padding: '40px'}}>No New Notifications</p>

            :
            null

        }

            </div>


            

           

        </div>


        </>
        
    )
}

export default Guide;
