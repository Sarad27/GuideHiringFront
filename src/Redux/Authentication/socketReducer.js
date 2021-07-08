
const INITIAL_STATE ={
    socket: null
}

const reducer = (state = INITIAL_STATE, action) =>{

    const{type, payload} = action

    switch (type) {

        case 'GET_SOCKET':

            return{
                ...state,
                socket: payload
            }


        default: return state;
    }
}

export default reducer;