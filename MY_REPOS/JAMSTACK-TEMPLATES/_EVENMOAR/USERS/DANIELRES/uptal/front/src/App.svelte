<script>
  import Chat from '/Chat/Chat.svelte';
  import Header from '/Header.svelte';
  import UserForm from '/UserForm.svelte';
  import Users from '/Users/Users.svelte';
  let user; //= { age: 18, userName: 'dannnn' };
</script>

<style lang="postcss">
  :global(body) {
    @apply bg-gray-200;
  }
</style>

<div class="container mx-auto">
  <Users />

  {#if user}
    <Header />
    <Chat {user} />
  {/if}

  {#if !user}
    <div class="my-20">
      <UserForm bind:user />
    </div>
  {/if}
</div>
