import React, {useEffect, useState} from "react";

import {connect} from "react-redux";
import axios from "axios";
import {Col, Container, Row, Image} from "react-bootstrap";
import store from "../../Redux/store";

import {getProfile} from "../../Redux/Authentication/actions";

import Guide from "./Guide";
import Tourist from "./Tourist";
import "./profile.css"


function Profile(props){

    const [user, setUser] = useState();

    const token = localStorage.getItem('user');

    useEffect(async() =>{
        if(props.users.user !== null){
            store.dispatch(getProfile(props.users.user._id))
        }
    },[props.users])


    useEffect(() =>{
        if(props.profile.profile){
            setUser(props.profile.profile)
        }
    },[props.profile])



    return(
        <div className="profile_holder">
            <Container className="profile_container">
                    {user && user.role == "GUIDE" &&
                    <Guide data={user} socket={props.socket.socket}/>
                    }

                    {user && user.role == "TOURIST" &&
                    <Tourist data={user}/>
                    }
            </Container>
        </div>

    )

}

const mapStatetoProps = (state) =>{
    return{
        users: state.user,
        profile: state.profile,
        socket: state.socket
    }
}


export default connect(mapStatetoProps) (Profile);