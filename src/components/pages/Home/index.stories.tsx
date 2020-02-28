import * as React from 'react'
import { action } from '@storybook/addon-actions'

import Home from '.'

import { StoryProps } from '../../../types'

const story = {
  title: 'pages/Home',
}

export const component: StoryProps = () => {
  return (
    <Home
      onHomeLinkClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        action('onHomeLinkClick')(e.target)
      }}
    />
  )
}

component.story = {
  name: 'default',
}

export const regression: StoryProps = () => {
  return (
    <Home
      onHomeLinkClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        action('onHomeLinkClick')(e.target)
      }}
    />
  )
}

regression.story = {
  name: 'regression',
}

export default story
