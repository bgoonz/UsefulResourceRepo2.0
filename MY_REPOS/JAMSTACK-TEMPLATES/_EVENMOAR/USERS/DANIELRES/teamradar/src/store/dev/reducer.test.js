import reducer from './reducer'
import * as types from 'store/types'

describe(`on ${types.SET_DEV_PREVIEW}`, () => {
  it('replaces the dev preview', () => {
    const state = {
      preview: 'a',
    }

    const action = {
      type: types.SET_DEV_PREVIEW,
      payload: 'b',
    }

    const expected = {
      preview: 'b',
    }
    expect(reducer(state, action)).toEqual(expected)
  })
})
