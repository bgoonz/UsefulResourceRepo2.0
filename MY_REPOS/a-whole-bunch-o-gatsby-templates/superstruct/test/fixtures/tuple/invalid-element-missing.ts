import { tuple, string, number } from '../../..'

export const Struct = tuple([string(), number()])

export const data = ['A']

export const error = {
  value: undefined,
  type: 'number',
  path: [1],
  branch: [data, data[1]],
}
