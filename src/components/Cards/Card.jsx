import React from "react";
import "./card.css"
import {Link} from "react-router-dom";

const Card = (props) =>{

    const data = props.data;
    const image = "http://localhost:5000/" + data.image

    return(
        <div className="card">

            <div className="card_image">

                <img className="card_img" src={image} />

            </div>

            <div className="card_inner">

                <div>

                    <p className="card_name">{data.name}</p>

                    <img  className="card_image_location" src="/images/locationIcon.png"/>

                    <p className="card_location">{data.location}</p>

                </div>

                <div >

                    <p className="card_details">{data.abstract}</p>

                </div>


            </div>


            <div className="card_button">

                <Link to ={`destination/${props.data._id}`}>
                    <button className="card_btn" >Hire Now</button>
                </Link>



            </div>




        </div>
    )
}

export default Card;