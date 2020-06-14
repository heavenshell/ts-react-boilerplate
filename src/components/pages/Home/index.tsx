import * as React from 'react'

type ViewProps = {
  // Add view props here
}

type ActionProps = {
  onHomeLinkClick: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

type Props = ViewProps & ActionProps

const Home: React.FC<Props> = ({ onHomeLinkClick }) => (
  <div>
    <a href="/" onClick={onHomeLinkClick}>
      Hello world
    </a>
  </div>
)

export default Home
