<script>
  import { boardingCard } from './store.js';
</script>

<style>
  label {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-self: start;

    font-size: 1rem;
    font-weight: bold;
    color: #4b7bec;
  }

  label > input,
  label > textarea {
    margin-top: 0.5rem;
    width: 100%;
  }

  textarea {
    resize: vertical;
  }
</style>

<label>
  Name
  <input
    type="text"
    bind:value={$boardingCard.host}
    required
    autocomplete="off" />
</label>
<label>
  Guest
  <input
    type="text"
    bind:value={$boardingCard.guest}
    required
    autocomplete="off" />
</label>
<label>
  Occasion
  <input
    type="text"
    bind:value={$boardingCard.occasion}
    required
    autocomplete="off" />
</label>
<label>
  Location
  <textarea bind:value={$boardingCard.location} rows="4" />
</label>

<label>
  Directions
  <input
    type="text"
    bind:value={$boardingCard.directions}
    required
    autocomplete="off" />
</label>
<label>
  Telephone
  <input
    type="text"
    bind:value={$boardingCard.phone}
    required
    autocomplete="off" />
</label>
<label for="meeting-time">
  Date and Starting Time:
  <input type="datetime-local" bind:value={$boardingCard.dateTime} />
</label>

<p>{JSON.stringify($boardingCard, 0, 2)}</p>
