import React,{useState } from "react";
import axios from 'axios';
import {Container} from "react-bootstrap";
import {useHistory} from "react-router-dom"
import "./auth.css"
import store from "../../Redux/store";
import {getUser} from "../../Redux/Authentication/actions";

function SignUp(){

    const history = useHistory();

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: ""
    })

    const [valid, setValid] = useState(true);

    const handleChange = (e) =>{
        const {name, value}   = e.target;
        setValues( values => ({
            ...values,
            [name] : value
        }))
    }

    const handleSubmitClick = (e)=>{
        setValid(true);
        e.preventDefault();

        if(values.password !== values.confirmPassword){
            setValid(false);
        }

        const data = values;
        delete data.confirmPassword;

        axios.post('http://localhost:5000/api/auth/signUp', data).then( response =>{

            localStorage.setItem('user', response.data.results.token);

            store.dispatch(getUser()).then(res =>{

                if(data.role === "GUIDE"){
                    history.push('/signUp/GuideDetails')
                }else if(data.role === "TOURIST"){
                    history.push('/signUp/TouristDetails')
                }
                }
            )

        }).catch(e =>{
            console.log(e)
            setValid(false);
        })



    }


    return(
       <Container>

           <div className="textCenter">

               <form className="form_signIn">


                       <svg className="signUpSvg" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                           <path
                               d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                       </svg>


                    <h2 style={{padding : "10px 0 10px 0", color: "#6415FF"}}>Sign Up</h2>

                   <input type = "name"  class="form-field" placeholder="Name" name="name"  value={values.name} onChange={handleChange}/>

                   <input type = "email"  class="form-field" placeholder="Email" name="email" value={values.email} onChange={handleChange}/>

                   <input type = "password"  class="form-field" placeholder="Password" name="password" value={values.password} onChange={handleChange}/>

                   <input type = "password"  class="form-field" placeholder="Confirm Password" name="confirmPassword" value={values.confirmPassword} onChange={handleChange}/>

                   <br/>
                   <br/>



                   <p>Who are you?</p>


                   <pre>
                        <input type="radio" value="GUIDE" name="role" onChange={handleChange}/> Guide  &nbsp;&nbsp;&nbsp;&nbsp;
                         <input type="radio" value="TOURIST" name="role" onChange={handleChange}/> Tourist

                   </pre>


                   <br/>



                   <button
                       type="submit"
                       className="authButton"
                       onClick={handleSubmitClick}
                   >
                       Register
                   </button>

               </form>

               {!valid ? <span>Password not matching </span> : <></> }

           </div>

       </Container>
    )
}

export default SignUp;