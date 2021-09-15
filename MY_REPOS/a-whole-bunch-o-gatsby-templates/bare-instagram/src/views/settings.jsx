import * as React from 'react'
import Layout from '../components/layout'
import useDesign from '../hooks/use-design'
import Checkbox from '../components/checkbox'
import Iconography from '../components/iconography'
import UsernamesForm from '../components/settings/usernames-form'
import UsernamesList from '../components/settings/usernames-list'
import Debug from '../components/settings/debug'

const Settings = () => {
  const [design, setDesign] = useDesign()

  const handleDesignChange = (e) => {
    setDesign({ ...design, [e.target.name]: e.target.checked })
  }

  return (
    <Layout>
      <h2 className="sr-only">Usernames settings</h2>
      <UsernamesForm />
      <UsernamesList />
      <hr className="mt-12 mb-6 dark:border-gray-700" />
      <h2 className="mb-2 font-medium text-black text-xl dark:text-white">
        Design
      </h2>
      <div className="flex flex-col space-y-3">
        <Checkbox
          desc="Hide post information"
          onChange={handleDesignChange}
          checked={design.minimal}
          name="minimal"
        />
        <Checkbox
          desc="Remove gap between posts"
          onChange={handleDesignChange}
          checked={design.gapless}
          name="gapless"
        />
      </div>
      <hr className="mt-12 mb-6 dark:border-gray-700" />
      <h2 className="mb-2 font-medium text-black text-xl dark:text-white">
        Information
      </h2>
      <p>
        This application is not affiliated with Instagram and solely for
        educational purposes.{' '}
        <a
          className="underline"
          href="https://github.com/LekoArts/bare-instagram"
          target="_blank"
          rel="noreferrer nofollow noopener"
        >
          Source code at GitHub
        </a>
        .
      </p>
      <h3 className="mt-4 mb-2 font-medium text-black text-lg dark:text-white">
        Iconography
      </h3>
      <Iconography />
      <h3 className="mt-4 mb-2 font-medium text-black text-lg dark:text-white">
        Debugging
      </h3>
      <Checkbox
        desc="Show debug information"
        onChange={handleDesignChange}
        checked={design.debug}
        name="debug"
      />
      {design.debug && <Debug />}
    </Layout>
  )
}

export default Settings
