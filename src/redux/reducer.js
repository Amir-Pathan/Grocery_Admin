import {GET_USER} from './user/action'

const initial = {
    loading:'',
    user : {}
}


const reducer = (state=initial,action)=>{

    switch(action.type){
        case GET_USER:
            console.log(action.payload);
            return{
                ...state,
                user : action.payload
            }

        default:
            return state
    }

    
}

export default reducer