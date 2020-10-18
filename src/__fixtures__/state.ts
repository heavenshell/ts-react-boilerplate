import { ReduxState } from '../modules'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defaultState = (param: any) => param || { isLoading: false }

export const configureInitialState = (params: {
  indexState?: {
    // Add state here
    // meState?: MeState
  }
}): ReduxState => ({
  index: defaultState(params.indexState),
})
