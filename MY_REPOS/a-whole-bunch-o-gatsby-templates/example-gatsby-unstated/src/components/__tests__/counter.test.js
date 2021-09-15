import React from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'
import { Provider } from 'unstated'
import CounterContainer from '../../state/CounterContainer'
import Counter from '../counter'

afterEach(cleanup)

test('Counter corectly triggers changes in counterContainer', async () => {
  const counterContainer = new CounterContainer()
  const { container, getByText } = render(
    <Provider inject={[counterContainer]}>
      <Counter />
    </Provider>
  )

  await fireEvent(
    getByText('+'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  )
  expect(counterContainer.state.count).toBe(1)

  await fireEvent(
    getByText('-'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  )
  expect(counterContainer.state.count).toBe(0)
})

test('Counter corectly triggers methods of counterContainer', async () => {
  const counterContainer = new CounterContainer()
  counterContainer.increment = jest.fn()
  counterContainer.decrement = jest.fn()

  const { container, getByText } = render(
    <Provider inject={[counterContainer]}>
      <Counter />
    </Provider>
  )

  await fireEvent(
    getByText('+'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  )

  expect(counterContainer.increment).toHaveBeenCalledTimes(1)

  await fireEvent(
    getByText('-'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  )

  expect(counterContainer.decrement).toHaveBeenCalledTimes(1)
})
