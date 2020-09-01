import { combineReducers, Reducer } from 'redux'
import auth from './auth'
import notification from './notification'
import { History } from 'history'
import { connectRouter } from 'connected-react-router'
import { ApplicationState } from '..'

const createRootReducer = (history: History) =>
  combineReducers<ApplicationState>({
    auth,
    notification,
    router: connectRouter(history) as Reducer
  })

export default createRootReducer
