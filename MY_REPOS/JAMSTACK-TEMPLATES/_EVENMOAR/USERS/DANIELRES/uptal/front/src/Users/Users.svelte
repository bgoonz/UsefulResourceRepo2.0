<script>
  import ApolloClient from 'apollo-boost';
  import { gql } from 'apollo-boost';
  import { query } from 'svelte-apollo';
  import { setClient } from 'svelte-apollo';

  import config from '/config';

  const client = new ApolloClient({ uri: config.serverUrl + '/graphql' });
  setClient(client);

  const GET_USERS = gql`
    {
      User {
        name
        taggings {
          Tag {
            name
          }
        }
      }
    }
  `;

  const users = query(client, { query: GET_USERS });
  $users.then(resp => console.log({ resp }));
</script>

<style lang="postcss">

</style>

{#await $users}
  Loading...
{:then result}
  <ul>
    {#each result.data.User as user}
      <li>
        {user.name}
        {#each user.taggings as tagging}{tagging.Tag.name},{/each}
      </li>
    {/each}
  </ul>
{:catch error}
  Error: {error}
{/await}
