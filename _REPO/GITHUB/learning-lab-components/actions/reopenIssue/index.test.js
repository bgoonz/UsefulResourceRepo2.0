const reopenIssue = require('./')
const mockContext = require('../../tests/mockContext')

describe('reopenIssue', () => {
  let context

  beforeEach(() => {
    context = mockContext({
      issue: {
        number: 1
      }
    }, {
      issues: {
        update: jest.fn()
      },
      search: {
        issues: jest.fn(() => Promise.resolve({
          data: {
            items: [{ title: 'My issue', number: 2 }]
          }
        }))
      }
    })
  })

  it('reopens the issue from the webhook payload', async () => {
    await reopenIssue(context, {})
    expect(context.github.issues.update).toHaveBeenCalled()
    expect(context.github.issues.update.mock.calls).toMatchSnapshot()
  })

  it('reopens an issue with an issue string', async () => {
    await reopenIssue(context, { issue: 'My issue' })
    expect(context.github.issues.update).toHaveBeenCalled()
    expect(context.github.issues.update.mock.calls).toMatchSnapshot()
  })

  it('reopens an issue with an issue number', async () => {
    await reopenIssue(context, { issue: 2 })
    expect(context.github.issues.update).toHaveBeenCalled()
    expect(context.github.issues.update.mock.calls).toMatchSnapshot()
  })

  it('throws an error if the issue cannot be found', async () => {
    try {
      await reopenIssue(context, { issue: 'My issue' })
    } catch (err) {
      expect(err).toMatchSnapshot()
    }
  })
})
