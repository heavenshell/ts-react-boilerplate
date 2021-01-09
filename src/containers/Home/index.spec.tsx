import * as React from 'react'
import { render } from '@testing-library/react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history'
import { renderHook, act } from '@testing-library/react-hooks'

import Home, { useHandlers } from '.'

import TestProvider from '../../__fixtures__/TestProvider'

describe('<Home />', () => {
  it('should onCounterLinkClick', () => {
    // TODO enzyme does not support React 17
    // const renderer = mount(
    //   <TestProvider component={Home} paths={['/']} isRedux={false} />
    // )

    render(<TestProvider component={Home} paths={['/']} isRedux={false} />)
    const history = createMemoryHistory()
    const mockHistoryPush = jest.fn().mockName('history.push')
    history.push = mockHistoryPush

    const mockClickEvent = {
      preventDefault: jest.fn().mockName('preventDefault'),
    }

    const location = {
      hash: '#',
      pathname: '/',
      search: '',
      state: undefined,
    }
    const match = {
      params: {},
      isExact: true,
      path: '/',
      url: '/',
    }

    const { result } = renderHook(() =>
      useHandlers({ history, location, match })
    )
    const { onHomeLinkClick } = result.current
    act(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onHomeLinkClick(mockClickEvent as any)
    })
    expect(mockClickEvent.preventDefault).toHaveBeenCalled()
    // TODO enzyme does not support React 17
    // renderer.update()

    expect(mockHistoryPush).toHaveBeenCalledTimes(1)
    expect(mockHistoryPush).toHaveBeenCalledWith('/')
  })
})
