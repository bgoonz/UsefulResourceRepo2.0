const fetchProfile = async (input) => {
  const URL = `https://www.instagram.com/${input}/?__a=1`
  const res = await fetch(URL)

  if (res.url !== URL) {
    throw new Error(`Couldn't load the information. Please try again later.`)
  }

  const json = await res.json()
  const { graphql } = json

  if (!graphql) {
    throw new Error(
      `Couldn't find "${input}". Are you sure this is the right name?`
    )
  }

  const {
    graphql: {
      user: { id, username, profile_pic_url: picture },
    },
  } = json
  return {
    id,
    username,
    picture,
  }
}

export { fetchProfile }
