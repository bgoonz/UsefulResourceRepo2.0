import * as React from 'react'
import { atoms } from '../styles/sprinkles.css'
import * as styles from '../styles/nivo.css'

export const commonProperties = {
  margin: {
    top: 20,
    right: 5,
    bottom: 70,
    left: 40,
  },
  animate: true,
  enableSlices: 'x' as 'x' | 'y' | false,
}

export const sliceTooltip = (slice) => {
  return (
    <div
      className={atoms({
        background: {
          light: 'white',
          dark: 'gray-900',
        },
        boxShadow: 'md',
        fontSize: {
          mobile: 'sm',
          tablet: 'md',
        },
        borderRadius: 'md',
      })}
    >
      <div className={styles.header}>Date: {slice.points[0].data.xFormatted.replace(/"/g, '')}</div>
      <div className={atoms({ padding: '0x' })}>
        {slice.points.map((point) => (
          <div
            key={point.id}
            className={atoms({
              display: 'flex',
              flexDirection: 'row',
              marginX: 'none',
              marginY: 'point',
              justifyContent: 'space-between',
              alignItems: 'center',
            })}
          >
            <div>{point.serieId}</div>
            <div
              style={{ backgroundColor: point.serieColor }}
              className={atoms({
                fontWeight: 'semibold',
                color: {
                  light: 'white',
                },
                borderRadius: 'sm',
                paddingX: '2x',
                marginLeft: '3x',
              })}
            >
              {point.data.yFormatted}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
