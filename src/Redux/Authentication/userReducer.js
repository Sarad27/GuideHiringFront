
const INITIAL_STATE ={
    user : null,
    isAuthenticated: false,
    loading: true
}

const reducer = (state = INITIAL_STATE, action) =>{

    const{type, payload} = action

    switch (type) {

        case 'GET_USER':

            return{
                ...state,
                isAuthenticated: true,
                user: payload,
                loading: false
            }


        default: return state;
    }
}

export default reducer;