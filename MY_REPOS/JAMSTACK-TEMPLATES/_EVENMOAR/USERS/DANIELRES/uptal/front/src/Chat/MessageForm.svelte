<script>
  // import Button from "/forms/Button.svelte";
  import Field from '/forms/Field.svelte';
  export let onSubmit;

  let text = '';
  $: isValid = text.length > 0;
</script>

<style lang="postcss">
  button {
    @apply h-16 w-full shadow-md;
  }
  * :global(input) {
    @apply h-16 w-full shadow-md;
  }
</style>

<form
  class="py-4"
  on:submit|preventDefault={() => {
    onSubmit(text);
    text = '';
  }}>
  <div class="flex ">
    <div class="w-10/12 field">
      <div class="pr-2">
        <Field bind:value={text} placeholder="enter your message" />
      </div>
    </div>
    <div class="w-2/12">
      <button disabled={!isValid}>Send</button>
    </div>
  </div>
</form>
