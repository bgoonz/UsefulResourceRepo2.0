import * as React from 'react'
import External from '../icons/external'
import Sidecar from '../icons/sidecar'
import Video from '../icons/video'

const icons = [
  {
    icon: <External />,
    desc: 'Link to the original post on Instagram',
  },
  {
    icon: <Sidecar />,
    desc: 'This post contains more than one image (gallery)',
  },
  {
    icon: <Video />,
    desc: 'This post is a video',
  },
]

/**
 * Explain the icons that can show on the post information
 */

const Iconography = () => (
  <div className="flex flex-col space-y-2">
    {icons.map((i) => (
      <div key={i.desc} className="flex flex-row items-center space-x-4">
        <span className="text-black dark:text-white">{i.icon}</span>{' '}
        <span>{i.desc}</span>
      </div>
    ))}
  </div>
)

export default Iconography
