const nock = require('nock')
const { GitHubAPI } = require('probot/lib/github')
const enablePages = require('./')
const mockContext = require('../../tests/mockContext')

describe('enablePages', () => {
  let context, nocked

  beforeEach(() => {
    context = mockContext({}, new GitHubAPI())
    const { owner, repo } = context.repo()
    nocked = nock('https://api.github.com')
      .post(`/repos/${owner}/${repo}/pages`)
      .reply(201, function (url, opts) {
        return { url, opts, headers: this.req.headers }
      })
  })

  it('responds with a 201', async () => {
    const result = await enablePages(context, { })
    expect(nocked.isDone()).toBe(true)
    expect(result.status).toBe(201)
  })

  it('responds with the correct options when passed a branch', async () => {
    const result = await enablePages(context, { branch: 'pizza' })
    expect(nocked.isDone()).toBe(true)
    expect(result.status).toBe(201)
    expect(result.data.headers.accept).toEqual(['application/vnd.github.switcheroo-preview+json'])
    expect(result.data.opts.source.branch).toBe('pizza')
    expect(result.data.opts.source.path).toBe('/')
  })

  it('responds with the correct options when passed a branch and a path', async () => {
    const result = await enablePages(context, { path: '/docs' })
    expect(nocked.isDone()).toBe(true)
    expect(result.status).toBe(201)
    expect(result.data.opts.source.branch).toBe('main')
    expect(result.data.opts.source.path).toBe('/docs')
  })
})
