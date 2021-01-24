import * as React from 'react'
import { render } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'

import Home, { useHandlers } from '.'

import TestProvider, { getRouters } from '../../__fixtures__/TestProvider'
// import { render } from '../../__fixtures__/test-utils'

describe('<Home />', () => {
  it('should onCounterLinkClick', () => {
    render(<TestProvider component={Home} paths={['/']} isRedux={false} />)

    const {
      history,
      location,
      match,
      mockHistoryPush,
      mockClickEvent,
    } = getRouters({
      path: '/',
    })

    const { result } = renderHook(() =>
      useHandlers({ history, location, match })
    )
    const { onHomeLinkClick } = result.current
    act(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onHomeLinkClick(mockClickEvent as any)
    })
    expect(mockClickEvent.preventDefault).toHaveBeenCalled()

    expect(mockHistoryPush).toHaveBeenCalledTimes(1)
    expect(mockHistoryPush).toHaveBeenCalledWith('/')
  })
})
