<script>
  import io from 'socket.io-client';

  import config from '/config';
  import Message from './Message.svelte';
  import MessageForm from './MessageForm.svelte';

  export let user;
  let messages = [];
  let messagesDiv;

  const socket = io(config.serverUrl);

  const submitMessage = text =>
    socket.emit('chat message', { author: user.userName, text });

  const scrollToBottom = () => {
    messagesDiv = document.getElementById('messages');
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  };

  socket.on('chat message', m => {
    messages = [...messages, m];
    setTimeout(scrollToBottom, 10);
  });
</script>

<style lang="postcss">
  .bottom {
    position: fixed;
    bottom: 0;
  }

  #messages {
    height: calc(100vh - 190px);
    overflow-y: auto;
  }
</style>

<div class="bottom container">
  <MessageForm onSubmit={submitMessage} />
</div>

<div id="messages">
  {#each messages as message}
    <hr />
    <Message {message} />
  {/each}
</div>
