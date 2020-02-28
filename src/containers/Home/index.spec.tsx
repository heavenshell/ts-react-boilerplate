import * as React from 'react'
import { mount } from 'enzyme'
import { createMemoryHistory } from 'history'
import { renderHook, act } from '@testing-library/react-hooks'

import Home, { useHandlers } from '.'

import TestProvider from '../../__fixtures__/TestProvider'

describe('<Home />', () => {
  it('should onCounterLinkClick', () => {
    const renderer = mount(
      <TestProvider component={Home} paths={['/']} isRedux={false} />
    )
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
    renderer.update()

    expect(mockHistoryPush).toHaveBeenCalledTimes(1)
    expect(mockHistoryPush).toHaveBeenCalledWith('/')
  })
})
