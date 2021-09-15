import _ from 'lodash'

export function flatten(data) {
  return data.flatMap((g) => {
    return g.repos.map((r) => {
      return {
        name: r.name,
        datetime: g.datetime,
        stars: r.stars,
        forks: r.forks,
        url: r.url,
      }
    })
  })
}

/**
 * _.mapValues: https://lodash.com/docs/4.17.15#mapValues
 * _.groupBy: https://lodash.com/docs/4.17.15#groupBy
 * _.omit: https://lodash.com/docs/4.17.15#omit
 */

export function constructShape(flat, name, omit) {
  return _.mapValues(_.groupBy(flat, name), (list) => list.map((entry) => _.omit(entry, omit)))
}

export function normalizeGithub(data, name, omit) {
  const flat = flatten(data)
  return constructShape(flat, name, omit)
}

export function nivoGithubFormatter(data, name) {
  const keys = Object.keys(data)
  const nivoData = []

  for (const key of keys) {
    const entry = data[key]

    const values = entry.map((e) => ({
      x: e.datetime,
      y: e[name],
    }))

    const obj = {
      id: key,
      data: values,
    }

    nivoData.push(obj)
  }

  return nivoData.reverse()
}

export function nivoTwitterFormatter(data, name) {
  const values = data.map((e) => ({
    x: e.datetime,
    y: e[name],
  }))

  return [
    {
      id: name,
      data: values,
    },
  ]
}
