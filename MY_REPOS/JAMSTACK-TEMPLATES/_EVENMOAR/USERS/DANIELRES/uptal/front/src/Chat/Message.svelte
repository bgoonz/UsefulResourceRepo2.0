<script>
  import { distanceInWords, format } from 'date-fns';
  import { fade } from 'svelte/transition';

  export let message;
</script>

<div class="card" transition:fade>
  <div>
    <small title={format(new Date(message.createdAt), 'MM/DD/YYYY HH:mm:ss')}>
      {distanceInWords(new Date(message.createdAt), new Date())} ago by
    </small>
    {message.author}
  </div>
  {message.text}
</div>
