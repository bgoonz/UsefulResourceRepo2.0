import React from "react"

const Banner = ({ children, bannertype }) => {
  return (
    <div style={{ background: 'orange' }}>
      {bannertype == 'small' && <div>small banner</div>}
      {children}
    </div>
  )
}

export default Banner
