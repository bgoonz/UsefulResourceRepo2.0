import { useState, useEffect } from 'react'

const SCROLL_UP = 'up'
const SCROLL_DOWN = 'down'

const useScrollDirection = ({
  initialDirection = 'up',
  thresholdPixels = 20,
} = {}) => {
  const [scrollDir, setScrollDir] = useState(initialDirection)

  useEffect(() => {
    const threshold = thresholdPixels
    let lastScrollY = window.pageYOffset
    let ticking = false

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false
        return
      }

      setScrollDir(scrollY > lastScrollY ? SCROLL_DOWN : SCROLL_UP)
      lastScrollY = scrollY > 0 ? scrollY : 0
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [initialDirection, thresholdPixels])

  return scrollDir
}

export default useScrollDirection
