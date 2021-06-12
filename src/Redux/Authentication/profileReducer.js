
const INITIAL_STATE ={
    profile : null,
    loading: true
}

const reducer = (state = INITIAL_STATE, action) =>{

    const{type, payload} = action

    switch (type) {

        case 'GET_PROFILE':

            return{
                ...state,
                profile: payload,
                loading: false
            }


        default: return state;
    }
}

export default reducer;