import React, {useEffect, useState} from "react";
import axios from "axios";
import {Row, Col} from "react-bootstrap";
import './destination.css'
import Modal from "../Modal/Modal";
import DisplayGuides from "../DisplayGuides/DisplayGuides";
import {connect} from "react-redux";


const Destination = (props) =>{


    const [destinations, setDestinations] = useState([]);

    const [auth, setAuth] = useState(false)

    const [show, setShow] = useState(false);

    useEffect(() =>{

        async function fetchDestinationData(){
            await axios.get(`http://localhost:5000/api/destination/${props.match.params.id}`).then(res =>{
            setDestinations(res.data.results)
        })
        }
        fetchDestinationData()
    },[props.match.params.id])

    useEffect( () =>{
        if(props.user.user.isAuthenticated === true){
            setAuth(true)
        }

    },[props.user])


    return(
        <>
            <Modal show={show}  modalClosed={() => {setShow(false)}}>

                <DisplayGuides destinationId={props.match.params.id} userData={props.user.user.user} socket={props.socket.socket}/>

            </Modal>

            <Row className="destination_div">
                <Col lg={5}>
                    <img className="destination_img" src= {`http://localhost:5000/${destinations.image}`} alt="DestinationImg"/>
                </Col>

                <Col className="destination_detail" lg={7}>
                    <div style={{width: "80%"}}>
                        <p className="destination_name">{destinations.name}</p>

                        <p className="destination_location"> Located At {destinations.location}</p>

                        <p className="destination_details">{destinations.details}</p>

                        <br/>

                        {auth === false ? <button className="destination_button" onClick={() =>{ window.location.href = 'http://localhost:3000/login';  }}> Login To Hire</button> :

                                props.user.user.user.role === "GUIDE" ? <> </> :

                            <button onClick={() =>{ setShow(true)}} className="destination_button">Hire A Guide</button>}

                    </div>

                </Col>
            </Row>



        </>
    )
}

const mapStateToProps = (state) => {
    return{
        user: state,
        socket: state.socket
    }
}


export default connect(mapStateToProps)(Destination);