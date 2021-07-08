import axios from "axios";
import io from "socket.io-client";

export const getUser = () => async dispatch => {

    try{

        const token = localStorage.getItem('user');

        if(token){
            axios.get('http://localhost:5000/api/auth/', {headers: {"Authorization" : `Bearer ${token}`}})
                .then(res =>{

                    console.log(res.data.results.user)

                    const socket = io("http://localhost:5000/",{secure: true, reconnection: true, rejectUnauthorized: false });

                    //Naming socket by ID
                    socket.emit("Name Socket", (res.data.results.user._id))

                    dispatch({
                        type: "GET_SOCKET",
                        payload: socket
                    })

                    dispatch({
                        type: "GET_USER",
                        payload: res.data.results.user
                    })
                }).catch(e =>{
                console.log(e)
            })
        }

    }catch(e){
        console.log(e)
    }
}

export const getProfile = (userId) => async dispatch =>{

    try{
        const token = localStorage.getItem('user');

        if(token){

             axios.get(`http://localhost:5000/api/user/${userId}`, {headers: {"Authorization" : `Bearer ${token}`}} )
                 .then(res =>{

                     console.log(res.data)

                     dispatch({
                         type: "GET_PROFILE",
                         payload: res.data.results
                     })
                 })
        }
    }
    catch(e){

    }
}