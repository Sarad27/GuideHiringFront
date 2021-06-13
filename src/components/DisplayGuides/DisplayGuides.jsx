import React, {useEffect, useState} from "react";
import axios from "axios";
import './displayGuide.css'
import {Col, Row} from "react-bootstrap";
import {useHistory} from "react-router-dom";

const DisplayGuides = (props) =>{

    const history = useHistory();

    const [data, setData] = useState([]);

    useEffect(() =>{
         axios.get("http://localhost:5000/api/user/guides").then(res =>{
             setData(res.data.results)
         })
    },[])

    const hireGuide = (index) =>{
        const hire = new Object();
        hire.destinationId = props.destinationId;
        hire.guideId = data[index]._id

        const token = localStorage.getItem('user');

        if(token){
            axios.post("http://localhost:5000/api/hire", hire,  {headers: {"Authorization" : `Bearer ${token}`}})
                .then(res =>{
                    if(res.data.code == 201){
                        history.push('/')
                    }
                })
        }
    }

    const guides = data.map((data, index) =>{

        return(
            <div className="displayGuides_main">
                <Row>
                    <Col className="displayGuides_col">  {data.name} </Col>
                    <Col className="displayGuides_col"> {data.gProfile.city} </Col>
                    <Col className="displayGuides_col">

                        <button className="displayGuides_btn" onClick={ () => hireGuide(index)}>Hire</button>

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