import axios from "axios";

export const getUser = () => async dispatch => {

    try{

        const token = localStorage.getItem('user');

        if(token){
            axios.get('http://localhost:5000/api/auth/', {headers: {"Authorization" : `Bearer ${token}`}})
                .then(res =>{
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