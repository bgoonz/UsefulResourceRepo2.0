<script>
  export let errors;
  export let placeholder;
  export let value = '';
  let className;
  export { className as class };

  let touched = false;
  $: value ? (touched = true) : null;
</script>

<style>
  input {
    @apply appearance-none shadow border w-full p-4 text-gray-700;
  }

  .valid input {
    outline-color: #11cc11;
  }
  .invalid input {
    outline-color: red;
  }
  .error {
    color: red;
    @apply text-sm;
  }
</style>

<div class={className} class:invalid={touched && errors} class:valid={!errors}>
  <input bind:value {placeholder} />

  {#if touched && errors}
    <div class="error">{errors}</div>
  {/if}
</div>
