import React, {useEffect, useState} from "react";
import axios from "axios";
import './displayGuide.css'
import {Col, Row} from "react-bootstrap";
import {useHistory} from "react-router-dom";


const DisplayGuides = (props) =>{


    const history = useHistory();

    const [data, setData] = useState([]);

    function calculateDistance(touristGeometry, guideGeometry){

        Number.prototype.toRad = function() {
            return this * Math.PI / 180;
         }

        const lat1 = touristGeometry.coordinates[0]
        const lon1 = touristGeometry.coordinates[1]
        const lat2 =  guideGeometry.coordinates[0]
        const lon2 =  guideGeometry.coordinates[1]

        const R = 6731 ; //km

        const l1 = lat1.toRad();
        const l2 = lat2.toRad();

        const dLat = (lat2-lat1).toRad();
        const dLon = (lon2-lon1).toRad();

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +  Math.cos(l1) * Math.cos(l2)  * Math.sin(dLon / 2) * Math.sin(dLon / 2);


        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));


        const d = R * c; //in km
        
        return d;

    }

    

    useEffect(() =>{
         axios.get("http://localhost:5000/api/user/guides").then(res =>{
             setData(res.data.results)
         })
    },[])

    useEffect(() =>{

        if(data.length>0){


            if(props.userData){
                data.forEach( data =>{

                    const distance = calculateDistance(props.userData.geometry, data.geometry).toFixed(2)

                    data.distance = distance;
                })
    
                data.sort(function(a,b) {
                    return a.distance - b.distance
                })
    
                data.sort(function(a,b){
                    return b.status - a.status 
                })
            }
         
        }

    },[data])
    

    const hireGuide = (index) =>{
        const hire = new Object();
        hire.destinationId = props.destinationId;
        hire.guideId = data[index]._id

        const token = localStorage.getItem('user');

        if(token){
            axios.post("http://localhost:5000/api/hire", hire,  {headers: {"Authorization" : `Bearer ${token}`}})
                .then(res =>{

                    var socketData = res.data.results

                    if(res.data.code === 201){

                        props.socket.emit("Hire Notification To Guide", (socketData))

                        history.push('/')
                    }
                })
        }
    }


    const guides = data.map((data, index) =>{


        return(
            <div className="displayGuides_main">
                <Row>
                    <Col className="displayGuides_col"> <a href={`http://localhost:3000/profile/${data._id}`} target="_blank">{data.name}</a>  </Col>
                    <Col className="displayGuides_col"> 
                    
                    {data.status === true ? <button className="displatGuides-btn online"></button> : <button className="displatGuides-btn offline"></button>}

                     </Col>
                    <Col className="displayGuides_col"> {data.distance} km </Col>
                    <Col className="displayGuides_col"> {data.gProfile.city} </Col>
                    <Col className="displayGuides_col">

                        <button disabled={!data.availability} className="displayGuides_btn" onClick={ () => hireGuide(index)}>Hire</button>

                    </Col>
                </Row>

            </div>
        )
    });


    

    return(
        <div style={{textAlign : "center"}}>
            <h4 style={{marginBottom : "40px"}} >Available Guides</h4>
            {guides}
        </div>
    )
}



export default DisplayGuides;