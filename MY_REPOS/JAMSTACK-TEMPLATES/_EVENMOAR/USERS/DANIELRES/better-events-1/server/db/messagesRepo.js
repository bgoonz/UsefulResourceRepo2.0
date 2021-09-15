var messages = [];

const saveMessage = (message) => (messages = [...messages, message]);

const getMessagesByDiscussionId = (discussionId) =>
  messages.filter((m) => m.discussionId === discussionId);

module.exports = {
  getMessagesByDiscussionId,
  saveMessage,
};
