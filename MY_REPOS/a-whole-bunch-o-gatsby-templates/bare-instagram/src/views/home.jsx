import * as React from 'react'
import { useQueries } from 'react-query'
import Layout from '../components/layout'
import Post from '../components/home/post'
import { Loading, ErrorMessage } from '../components/information'
import useNames from '../hooks/use-names'
import useDesign from '../hooks/use-design'
import { fetchPosts } from '../utils/fetch-posts'

const Home = () => {
  const [names] = useNames()
  const [design] = useDesign()

  const results = useQueries(
    names.map((name) => {
      return {
        queryKey: ['username', name.id],
        queryFn: () => fetchPosts(name.id),
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
      }
    })
  )

  if (names.length === 0) {
    return (
      <Layout className="text-center text-lg font-medium">
        No usernames defined. Please head over to the "Settings" screen and add
        new users.
      </Layout>
    )
  }

  if (results.some((r) => r.isLoading || r.isFetching)) {
    return (
      <Layout className="text-lg">
        <Loading />
      </Layout>
    )
  }

  if (results.some((r) => r.isError)) {
    const first = results.find((r) => r.error)
    return (
      <Layout>
        <ErrorMessage message={first.error.message} />
      </Layout>
    )
  }

  const concenated = results.flatMap((r) => r.data)
  const sorted = concenated.sort((a, b) => {
    // Latest first
    return b.timestamp - a.timestamp
  })

  return (
    <Layout>
      <div
        className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        style={{
          gridGap: design.gapless ? 0 : undefined,
          margin: design.gapless ? '-1.5rem -1.5rem 0 -1.5rem' : undefined,
        }}
      >
        {sorted.map((p) => (
          <Post
            key={`${p.shortcode}-${p.timestamp}`}
            owner={p.owner}
            picture={p.picture}
            description={p.description}
            shortcode={p.shortcode}
            timestamp={p.timestamp}
            dimensions={p.dimensions}
            isMinimal={design.minimal}
            isGapless={design.gapless}
            isVideo={p.isVideo}
            isSidecar={p.isSidecar}
          />
        ))}
      </div>
    </Layout>
  )
}

export default Home
