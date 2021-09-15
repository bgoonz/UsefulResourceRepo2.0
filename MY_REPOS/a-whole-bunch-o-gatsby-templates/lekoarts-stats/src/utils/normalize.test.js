import { normalizeGithub, flatten, constructShape, nivoGithubFormatter, nivoTwitterFormatter } from './normalize'
import { data as githubData } from './__fixtures__/github'
import { data as twitterData } from './__fixtures__/twitter'

describe('flatten', () => {
  it('should create new object shape', () => {
    const flat = flatten(githubData)

    const objectShape = [
      {
        datetime: '2020-07-17',
        forks: 154,
        name: 'gatsby-starter-minimal-blog',
        stars: 517,
        url: 'https://github.com/LekoArts/gatsby-starter-minimal-blog',
      },
    ]

    expect(flat).toMatchSnapshot()
    expect(flat).toEqual(expect.arrayContaining(objectShape))
    expect(flat[0].id).not.toBeDefined()
  })
  it('should create entries in correct order', () => {
    const flat = flatten(githubData)
    const length = flat.length

    expect(flat[0]).toStrictEqual({
      datetime: '2020-07-17',
      forks: 243,
      name: 'gatsby-themes',
      stars: 745,
      url: 'https://github.com/LekoArts/gatsby-themes',
    })
    expect(flat[length - 1]).toStrictEqual({
      datetime: '2020-07-18',
      forks: 18,
      name: 'gatsby-starter-portfolio-bella',
      stars: 113,
      url: 'https://github.com/LekoArts/gatsby-starter-portfolio-bella',
    })
  })
})

describe('constructShape', () => {
  it('should group data by name and omit name', () => {
    const flat = flatten(githubData)
    const shape = constructShape(flat, 'name', 'name')
    const namedEntry = shape['gatsby-starter-minimal-blog']

    expect(shape).toMatchSnapshot()
    expect(namedEntry).toStrictEqual([
      {
        datetime: '2020-07-17',
        forks: 154,
        stars: 517,
        url: 'https://github.com/LekoArts/gatsby-starter-minimal-blog',
      },
      {
        datetime: '2020-07-18',
        forks: 153,
        stars: 517,
        url: 'https://github.com/LekoArts/gatsby-starter-minimal-blog',
      },
    ])
  })
})

describe('normalizeGithub', () => {
  it('should flatten and group data by name', () => {
    const normalized = normalizeGithub(githubData, 'name', 'name')
    const namedEntry = normalized['gatsby-starter-minimal-blog']

    expect(namedEntry).toStrictEqual([
      {
        datetime: '2020-07-17',
        forks: 154,
        stars: 517,
        url: 'https://github.com/LekoArts/gatsby-starter-minimal-blog',
      },
      {
        datetime: '2020-07-18',
        forks: 153,
        stars: 517,
        url: 'https://github.com/LekoArts/gatsby-starter-minimal-blog',
      },
    ])
  })
})

describe('nivoGithubFormatter', () => {
  it('should output correct shape via input', () => {
    const normalized = normalizeGithub(githubData, 'name', 'name')
    const nivo = nivoGithubFormatter(normalized, 'stars')

    const objectShape = [
      {
        data: [
          {
            x: '2020-07-17',
            y: 517,
          },
          {
            x: '2020-07-18',
            y: 517,
          },
        ],
        id: 'gatsby-starter-minimal-blog',
      },
    ]

    expect(nivo).toMatchSnapshot()
    expect(nivo).toEqual(expect.arrayContaining(objectShape))
  })
})

describe('nivoTwitterFormatter', () => {
  it('should output correct shape via input', () => {
    const nivo = nivoTwitterFormatter(twitterData, 'followers')

    const objectShape = [
      {
        data: [
          {
            x: '2020-07-16',
            y: 1126,
          },
          {
            x: '2020-07-17',
            y: 1137,
          },
          {
            x: '2020-07-18',
            y: 1150,
          },
        ],
        id: 'followers',
      },
    ]

    expect(nivo).toMatchSnapshot()
    expect(nivo).toEqual(expect.arrayContaining(objectShape))
  })
})
