import { ReduxState } from '../modules'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defaultState = (param: any) => (param ? param : { isLoading: false })

export const configureInitialState = (params: {
  indexState?: {}
}): ReduxState => ({
  index: defaultState(params.indexState),
})
