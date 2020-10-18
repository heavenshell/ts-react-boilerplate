import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore,
  StoreEnhancer,
} from 'redux'
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk, { ThunkDispatch, ThunkMiddleware } from 'redux-thunk'

export type ReduxState = {
  // Add state here
}

export const configureStore = (initialState?: ReduxState) => {
  const rootReducer = combineReducers({})

  return createStore(
    rootReducer,
    initialState || {},
    composeWithDevTools(
      applyMiddleware(thunk as ThunkMiddleware<ReduxState, AnyAction, null>)
    ) as StoreEnhancer<{
      dispatch: ThunkDispatch<ReduxState, null, AnyAction>
    }>
  )
}
