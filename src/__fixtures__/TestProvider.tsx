import * as React from 'react'
import { Provider } from 'react-redux'
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history'
import { MemoryRouter, Route, Switch, RouteProps } from 'react-router-dom'
import { MemoryRouterProps } from 'react-router'

import { configureStore, ReduxState } from '../modules'

type RouterInitialProps = {
  paths: string[]
  initialPath?: string
  params?: RouteProps
  search?: string
  isRedux?: boolean
}

export type Props = MemoryRouterProps &
  RouterInitialProps & {
    component?: RouteProps['component']
    render?: RouteProps['render']
    initialState?: ReduxState
  }

type RouterProps = {
  path: string
  search?: string
  params?: any // eslint-disable-line @typescript-eslint/no-explicit-any
}

export const getRouters = ({ path, params }: RouterProps) => {
  const history = createMemoryHistory()
  const mockHistoryPush = jest.fn().mockName('history.push')
  history.push = mockHistoryPush

  const location = {
    hash: '#',
    pathname: path,
    search: '',
    state: undefined,
  }
  const match = {
    params: params || {},
    isExact: true,
    path,
    url: '/',
  }

  const mockClickEvent = {
    preventDefault: jest.fn().mockName('preventDefault'),
  }

  return { history, location, match, mockHistoryPush, mockClickEvent }
}

const TestProvider: React.FC<Props> = ({
  component: Component,
  render,
  initialState,
  paths,
  initialPath,
  search,
  isRedux = true,
}) => {
  const initialEntries: MemoryRouterProps['initialEntries'] = paths.map(
    (path) => ({ pathname: path, search })
  )
  const initialIndex = initialPath ? paths.indexOf(initialPath) : 0

  const Router = () => (
    <MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
      <Switch>
        {paths.map((path) => (
          <Route key={path} path={path} component={Component} render={render} />
        ))}
      </Switch>
    </MemoryRouter>
  )

  if (isRedux) {
    return (
      <Provider store={configureStore(initialState)}>
        <Router />
      </Provider>
    )
  }

  return <Router />
}

export default TestProvider
