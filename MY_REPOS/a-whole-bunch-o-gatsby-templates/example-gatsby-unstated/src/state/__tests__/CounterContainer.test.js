import React from 'react'
import { render, cleanup } from 'react-testing-library'
import CounterContainer from '../CounterContainer'

afterEach(cleanup)

test('CounterContainer counts correctly', async () => {
  const counterContainer = new CounterContainer()
  expect(counterContainer.state.count).toBe(0)

  await counterContainer.increment()
  expect(counterContainer.state.count).toBe(1)

  await counterContainer.decrement()
  expect(counterContainer.state.count).toBe(0)
})
