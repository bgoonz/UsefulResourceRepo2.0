import * as React from "react"
import Wrapper from "../../components/wrapper"

const GreetingPage = ({ params }) => {
  const { name } = params
  return (
    <Wrapper>
      <main className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none sm:max-w-none lg:max-w-none xl:max-w-none">
        <h1>Hello {name} 👋🏻</h1>
        <p>
          You're on a client-only page that is only rendered on the client, not at build time by Gatsby. This allows for
          dynamic segments of your app (e.g. logged-in state).
        </p>
      </main>
    </Wrapper>
  )
}

export default GreetingPage
