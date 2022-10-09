import {GET_USER} from './action'


export function getUser(payload){

    return{
        type:GET_USER,
        payload:payload
    }

}

export function getUserSet(){

    console.log('hire');

    let user = localStorage.getItem('seller')

    user = JSON.parse(user) || {}

    console.log(user);

    return dispatch=>dispatch(getUser(user))

}