import React, {useEffect, useState} from "react";
import axios from "axios";
import {Container, Row, Col} from "react-bootstrap";
import './destination.css'

const Destination = (props) =>{

    const [destinations, setDestinations] = useState([]);

    useEffect(async() =>{

        await axios.get(`http://localhost:5000/api/destination/${props.match.params.id}`).then(res =>{
            setDestinations(res.data.results)
        })

    },[])

    return(

           <Row className="destination_div">
               <Col lg={5}>
                   <img className="destination_img" src= {`http://localhost:5000/${destinations.image}`} />
               </Col>

               <Col className="destination_detail" lg={7}>
                   <div style={{width: "80%"}}>
                       <p className="destination_name">{destinations.name}</p>

                       <p className="destination_location"> Located At {destinations.location}</p>

                       <p className="destination_details">{destinations.details}</p>

                       <button className="destination_button">Hire A Guide</button>

                   </div>

               </Col>
           </Row>

    )
}

export default Destination;