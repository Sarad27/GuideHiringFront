import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Authentication/Login";
import SignUp from "./components/Authentication/SignUp";
import GuideDetails from "./components/Authentication/GuideDetails";
import TouristDetails from "./components/Authentication/TouristDetails";
import Profile from "./components/Profile/Profile";
import ViewProfile from "components/Profile/ViewProfile";
import store from "./Redux/store";
import {getUser} from "./Redux/Authentication/actions";
import {connect} from "react-redux";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Destination from "./components/Destination/Destination";
import Modal from "components/Modal/Modal";
import Notification from "components/Notification/Notification";

import Hire from "components/Hires/Hire";


const App = (user) => {


    const [notification, setNotification] = useState(null);

    const [show, setShow] = useState(false);

    useEffect(() => {
        store.dispatch(getUser())
    }, [])

    //Socket Code

    useEffect(() =>{

        if(user.socket.socket!=null){

            user.socket.socket.on("Hire Notification To Guide", (data) =>{
                console.log(data)
                setNotification(data);
                setShow(true);
      
            })

            user.socket.socket.on("Hire Notification To Tourist", (data) =>{
                console.log(data)
                setNotification(data);
                setShow(true);
      
            })
        }

    }, [user.socket])

    return (
            <Router>

                <Header data={user}/>

                <Modal show={show}  modalClosed={() => {setShow(false)}}>

                    <Notification data={notification} />

                </Modal>

                <Switch>

                    <Route exact path="/signUp/GuideDetails" component={GuideDetails}/>
                    <Route exact path="/signUp/TouristDetails" component={TouristDetails}/>

                    {user.user.isAuthenticated === false &&
                    <Route exact path="/login" component={Login}/>}

                    {
                        user.user.isAuthenticated === false &&
                        <Route exact path="/signUp" component={SignUp}/>
                    }



                    <Route exact path="/profile" render={() => (
                        user.user.isAuthenticated ? (
                            <Profile/>
                        ) : (
                            <Home/>
                        )
                    )}/>

                    <Route exact path="/profile/:id"  component={ViewProfile}/>

                    <Route exact path="/hires"  component={Hire}/>

                    <Route exact path="/destination/:id" component={Destination} />
                    <Route exact path="/" component={Home}/>

                </Switch>
                <Footer/>
            </Router>
    );
}



const mapStateToProps = state => ({
    user : state.user,
    socket: state.socket
});

export default connect(mapStateToProps)(App);