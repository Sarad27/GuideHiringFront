import React, {useEffect, useState} from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";

import "./rateHire.css"




const Hire = () =>{

    const [data, setData] = useState()

    useEffect(async() =>{
        const token = localStorage.getItem('user');

        const hireData = await axios.get("http://localhost:5000/api/hire", {headers: {"Authorization" : `Bearer ${token}`}})

        console.log(hireData.data.results)

        setData(hireData.data.results)
    },[])

    const handleChange = async(e) =>{

        var tempData = String (e.target.value)

        tempData = tempData.split(' ')


        const token = localStorage.getItem('user');

        await axios.post(`http://localhost:5000/api/hire/rate/${tempData[1]}`, {rating : tempData[0]}, {headers: {"Authorization" : `Bearer ${token}`}})
        .then(res =>{
            window.location.reload();
        })

    }


    if(data){
        return(
            <div className="profile_holder" style={{paddingTop : "50px"}}>

                
                    <div className="profile">
        
                        <div className="notification_content">
        
                            <h3>Your Hire Records</h3>

                            <Row className="justify-content-md-center">

                                <Col md={6}>
                                    <h5>Rated Hires</h5>

                                    {
                                       data.filter(data => data.rating != null).map(filtered =>(
                                           <div className="ratingBoxes">
                                            <p>Guiding By : {filtered.guide.name} </p>
                                            <p>Destination : {filtered.destination.name}</p>
                                            <p>Date : {filtered.updatedAt.slice(0,10)}</p>
                                            <p>Rated : {filtered.rating}</p>
                                          
                                           </div>

                                         ))
                                    }

                                </Col>



                                <Col md={6}>
                                    <h5>Unrated Hired</h5>

                                    {
                                       data.filter(data => data.rating === null).map(filtered =>(
                                          
                                        <div className="ratingBoxes">
                                            <p>Guiding By : {filtered.guide.name} </p>
                                            <p>Destination : {filtered.destination.name}</p>
                                            <p>Date : {filtered.updatedAt.slice(0,10)}</p>
                                            
                                            <p>Rate : </p>

                                            <fieldset class="rating">
                                                <input type="radio" id="star5" name="rating" value={`5 ${filtered._id}`} onChange={handleChange}/><label for="star5" >5 stars</label>
                                                <input type="radio" id="star4" name="rating" value={`4 ${filtered._id}`} onChange={handleChange}/><label for="star4">4 stars</label>
                                                <input type="radio" id="star3" name="rating" value={`3 ${filtered._id}`} onChange={handleChange}/><label for="star3" >3 stars</label>
                                                <input type="radio" id="star2" name="rating" value={`2 ${filtered._id}`} onChange={handleChange}/><label for="star2" >2 stars</label>
                                                <input type="radio" id="star1" name="rating" value={`1 ${filtered._id}`} onChange={handleChange}/><label for="star1" >1 star</label>
                                            </fieldset>
                                            
  
                                          
                                           </div>
                                        ))
                                    }

                                </Col>

                            </Row>
        
                        </div>
        
                   </div>
            </div>
        )
    }else{
        return(
            <div className="profile_holder">
                    <div className="profile">
        
                        <div className="notification_content">
        
                            <h3>You Dont have past Hires.</h3>
        
                        </div>
        
                   </div>
            </div>
        )
    }

}


export default Hire;