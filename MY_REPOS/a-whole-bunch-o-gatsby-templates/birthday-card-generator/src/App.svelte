<script lang="ts">
  import 'focus-visible';
  import { quintOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';
  import Canvas from './Canvas.svelte';
  import Form from './Form.svelte';

  let isFormVisible = true;

  function toggleForm() {
    isFormVisible = !isFormVisible;
    console.log('visible', isFormVisible);
  }
</script>

<style>
  main {
    height: 100vh;
    margin: 0 auto;
    display: flex;
    align-content: center;
    text-align: center;
  }

  section {
    flex: 1;
  }

  button {
    max-width: 130px;
  }

  aside {
    width: 400px;
    height: 100%;
    padding: 1rem;
    background: #d1d8e0;
    transition: all 0.5s;
  }

  h1,
  h2 {
    margin: 2rem;
    color: #4b7bec;
    text-transform: uppercase;
  }

  h1 {
    font-size: 4rem;
    font-weight: 400;
  }

  h2 {
    font-size: 2rem;
    font-weight: 400;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  {#if isFormVisible}
    <aside
      transition:fly={{ delay: 250, duration: 300, x: -400, y: 0, opacity: 0.5, easing: quintOut }}>
      <h2>Configuration</h2>
      <Form />
    </aside>
  {/if}
  <section>
    <h1>Birthday Card Generator</h1>
    <div>
      <button color="primary" title="Simple button" on:click={toggleForm}>
        Toggle Form
      </button>
    </div>
    <Canvas />
  </section>
</main>
