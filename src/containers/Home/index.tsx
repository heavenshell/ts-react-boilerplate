import * as React from 'react'
import { useCallback } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useHistory, useLocation, useRouteMatch } from 'react-router'

import HomeComponent from '../../components/pages/Home'

export const useHandlers = ({ history }: RouteComponentProps) => ({
  onHomeLinkClick: useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      return history.push('/')
    },
    [history]
  ),
})

const Home = () => {
  const history = useHistory()
  const location = useLocation()
  const match = useRouteMatch()

  const { onHomeLinkClick } = useHandlers({
    location,
    history,
    match,
  })
  return <HomeComponent onHomeLinkClick={onHomeLinkClick} />
}

export default Home
