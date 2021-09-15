export interface IGitHubEntry {
  id: string
  datetime: string
  repos: {
    forks: number
    stars: number
    id: string
    url: string
    name: string
  }[]
}

export interface ITwitterEntry {
  tweets: number
  followers: number
  datetime: string
}

export interface IHomepageDataProps {
  site: {
    siteMetadata: {
      title: string
      url: string
      repo: string
      github: string
      twitter: string
      homepage: string
      image: string
      description: string
      author: string
    }
    buildTime: string
  }
  github: {
    nodes: IGitHubEntry[]
  }
  twitter: {
    nodes: ITwitterEntry[]
  }
}
