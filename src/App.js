import React, {useEffect, useState} from "react";
import {BrowserRouter, BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Authentication/Login";
import SignUp from "./components/Authentication/SignUp";
import GuideDetails from "./components/Authentication/GuideDetails";
import TouristDetails from "./components/Authentication/TouristDetails";
import Profile from "./components/Profile/Profile";
import store from "./Redux/store";
import {getUser} from "./Redux/Authentication/actions";
import {connect} from "react-redux";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Destination from "./components/Destination/Destination";


const App = (user) => {

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        store.dispatch(getUser())
    }, [])

    console.log(user.user.isAuthenticated)


    return (
            <Router>

                <Header data={user}/>
                <Switch>

                    <Route exact path="/signUp/GuideDetails" component={GuideDetails}/>
                    <Route exact path="/signUp/TouristDetails" component={TouristDetails}/>

                    {user.user.isAuthenticated == false &&
                    <Route exact path="/login" component={Login}/>}

                    {
                        user.user.isAuthenticated == false &&
                        <Route exact path="/signUp" component={SignUp}/>
                    }



                    <Route exact path="/profile" render={() => (
                        user.user.isAuthenticated ? (
                            <Profile/>
                        ) : (
                            <Home/>
                        )
                    )}/>

                    <Route exact path="/destination/:id" component={Destination} />
                    <Route exact path="/" component={Home}/>

                </Switch>
                <Footer/>
            </Router>
    );
}



const mapStateToProps = state => ({
    user : state.user
});

export default connect(mapStateToProps)(App);