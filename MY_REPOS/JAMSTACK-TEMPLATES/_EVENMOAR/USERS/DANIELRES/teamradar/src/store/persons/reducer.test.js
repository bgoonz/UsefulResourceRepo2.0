import reducer from './reducer'
import * as types from 'store/types'

describe(`on ${types.FETCH_PERSONS_SUCCESS}`, () => {
  it('updates the persons list', () => {
    const state = {
      items: {
        1: { name: 'one' },
        2: { name: 'two' },
      },
    }

    const action = {
      type: types.FETCH_PERSONS_SUCCESS,
      payload: {
        persons: [
          {
            id: 2,
            name: 'two(new)',
          },
          { id: 3, name: 'three' },
        ],
      },
    }

    const expected = {
      items: {
        1: { name: 'one' },
        2: { name: 'two(new)' },
        3: { name: 'three' },
      },
    }
    expect(reducer(state, action)).toEqual(expected)
  })
})

describe(`on ${types.FETCH_PERSON_SUCCESS}`, () => {
  it('updates the person in the list', () => {
    const state = {
      items: {
        1: { name: 'one' },
        2: { name: 'two' },
      },
    }

    const action = {
      type: types.FETCH_PERSON_SUCCESS,
      payload: {
        person: {
          id: 2,
          name: 'two',
          details: 'details',
        },
      },
    }

    const expected = {
      items: {
        1: { name: 'one' },
        2: { name: 'two', details: 'details' },
      },
    }
    expect(reducer(state, action)).toEqual(expected)
  })
})
