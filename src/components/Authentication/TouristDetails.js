import React,{useState } from "react";
import axios from 'axios';
import {Container} from "react-bootstrap";
import "./auth.css"
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";

function TouristDetail(user){

    const history = useHistory();

    const [values, setValues] = useState({
        city: "",
        country: "",
        passport_number: "",
        language: ""
    })


    const handleChange = (e) =>{
        const {name, value}   = e.target;
        setValues( values => ({
            ...values,
            [name] : value
        }))
    }

    const handleSubmitClick = (e)=>{
        e.preventDefault();

        const data = values;

        const token = localStorage.getItem('user');

        axios.post('http://localhost:5000/api/auth/signUp/TouristProfile', data, {headers: {"Authorization" : `Bearer ${token}`}})
            .then(res =>{
                history.go(-2);
            }, e =>{
                console.log(e)
            })

    }

    // if(user.user.isAuthenticated == true && user.user.user.details == false){
        return(
            <Container>

                <div className="textCenter">

                    <form className="form_signIn">


                        <svg className="signUpSvg" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                            <path
                                d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                        </svg>


                        <h2 style={{padding : "10px 0 10px 0", color: "#6415FF"}}>Complete Your Profile</h2>


                        <input type = "text"  class="form-field" placeholder="City" name="city" value={values.city} onChange={handleChange}/>

                        <input type="text" className="form-field" placeholder="Country" name="country" value={values.country}
                               onChange={handleChange}/>

                        <input type = "text"  class="form-field" placeholder="Passport Number" name="passport_number" value={values.passport_number} onChange={handleChange}/>


                        <input type="text" className="form-field" placeholder="Primary Language" name="language" value={values.language}
                               onChange={handleChange}/>

                        <br/>
                        <br/>


                        <button
                            type="submit"
                            className="authButton"
                            onClick={handleSubmitClick}
                        >
                            Complete Profile
                        </button>

                    </form>

                </div>

            </Container>
        )
    // }else{
    //     return(
    //         <Redirect to="/" />
    //     )
    // }


}


const mapStateToProps = state => ({
    user : state.user
});

export default connect(mapStateToProps)(TouristDetail);