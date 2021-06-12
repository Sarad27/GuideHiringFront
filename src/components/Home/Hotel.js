import React, {useEffect, useState} from "react";
import axios from "axios";
import Loader from "../Spinner/Loader";
import './hotel.css'
import Card from "../Cards/Card";

const Hotel = () =>{

    const [destinations, setDestinations] = useState([]);

    useEffect(async() =>{

        await axios.get("http://localhost:5000/api/destination").then(res =>{
            setDestinations(res.data.results)
        })

    },[])


    const cards = destinations.map(destination =>{

        return(
            <Card data={destination} />
            )
    })


        if(destinations.length > 0){
            return (
                <div className="cards">
                    <p className="popular_Destination">Popular Destinations</p>
                    <div className="flex-grid">
                        {cards}
                    </div>

                </div>
            )

        }else{
            return <Loader />
        }

}

export default Hotel