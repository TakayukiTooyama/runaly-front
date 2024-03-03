'use client'

import {
  Legend,
  Line,
  LineChart as LineRechart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

type LineChartProps = {
  data: (number | null)[]
  times: number[]
  xDataKey: string
  xLabel: string
  yDataKey: string
  yLabel: string
  handleClickDot: (payload: unknown) => void
  handleMoveMouse?: (payload: unknown) => void
}

export function LineChart({
  data,
  times,
  // xLabel,
  xDataKey,
  // yLabel,
  yDataKey,
  handleClickDot,
  handleMoveMouse,
}: LineChartProps) {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <LineRechart
        onMouseMove={handleMoveMouse}
        data={times.map((time, index) => ({
          [yDataKey]: data[index],
          time: time,
        }))}
        margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
        syncId='keypoints'
      >
        <XAxis
          dataKey={xDataKey}
          angle={-30}
          dx={-10}
          dy={5}
          interval={Math.floor(times.length / 6)}
          tick={{ fill: 'gray', fontSize: 12 }}
        />
        <YAxis
          dataKey={yDataKey}
          tickCount={5}
          tick={{ fill: 'gray', fontSize: 12 }}
        />
        <Line
          id={yDataKey}
          type='monotone'
          dataKey={yDataKey}
          legendType='line'
          dot={false}
          activeDot={{
            cursor: 'pointer',
            onClick: (_e, payload) => handleClickDot(payload),
          }}
          stroke='orange'
          strokeWidth={2}
          label='角度'
          unit='°'
          isAnimationActive
          // animationDuration={1500}
          animationEasing='linear'
        />
        <Legend
          verticalAlign='top'
          align='right'
          height={40}
          fontSize={14}
          iconSize={14}
          iconType='plainline'
        />
        <Tooltip
          contentStyle={{
            background: 'linear-gradient(to right, #fff9, #fff9)',
            border: 'none',
            borderRadius: 10,
            boxShadow: '0px 0px 6px 0px rgba(171,171,171,0.6)',
            fontSize: 14,
            fontWeight: 'bold',
            lineHeight: 1,
            paddingBottom: 8,
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 10,
          }}
          labelStyle={{ color: 'gray' }}
          cursor={{ stroke: 'red', strokeWidth: 2 }}
          wrapperStyle={{ outline: 'none' }}
          separator=' '
          labelFormatter={(label) => `Time ${label}s`}
          formatter={(value) => `${value}`} //TODO:後ほど変更
        />
      </LineRechart>
    </ResponsiveContainer>
  )
}