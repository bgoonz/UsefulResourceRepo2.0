import * as React from 'react'
import { ResponsiveLine, Serie } from '@nivo/line'
import { commonProperties, sliceTooltip } from '../utils/nivo'

interface ILineProps {
  data: Serie[]
  yScaleMin?: number | 'auto'
  yScaleMax?: number | 'auto'
}

const Line = ({ data, yScaleMin = 0, yScaleMax = 'auto' }: ILineProps) => {
  return (
    <ResponsiveLine
      {...commonProperties}
      data={data}
      theme={{
        textColor: 'var(--chart-text-color, #333333)',
        crosshair: { line: { stroke: 'var(--chart-crosshair-color, #333333)' } },
        axis: {
          domain: { line: { stroke: 'var(--chart-axis-color, #777777)' } },
          ticks: { line: { stroke: 'var(--chart-axis-color, #777777)' } },
        },
        grid: { line: { stroke: 'var(--chart-grid-color, #dddddd)' } },
      }}
      xScale={{ type: 'time', format: '%Y-%m-%d', useUTC: false, precision: 'day' }}
      xFormat="time:%Y-%m-%d"
      yScale={{ type: 'linear', min: yScaleMin, max: yScaleMax, stacked: false }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: '%m/%d/%y',
        tickValues: 4,
      }}
      axisLeft={{
        tickSize: 10,
        tickPadding: 5,
        tickRotation: 0,
      }}
      sliceTooltip={({ slice }) => sliceTooltip(slice)}
      colors={{ scheme: 'category10' }}
      pointSize={4}
      pointColor={{ from: 'color' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      enableCrosshair={true}
      crosshairType="x"
    />
  )
}

export default Line
