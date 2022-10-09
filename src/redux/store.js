import {createStore,applyMiddleware,combineReducers} from 'redux'
import Thunk from 'redux-thunk'
import Logger from 'redux-logger'
import reducer from './reducer'

const red = combineReducers({
    user : reducer
})

const store = createStore(red,applyMiddleware(Thunk,Logger))

export default store
