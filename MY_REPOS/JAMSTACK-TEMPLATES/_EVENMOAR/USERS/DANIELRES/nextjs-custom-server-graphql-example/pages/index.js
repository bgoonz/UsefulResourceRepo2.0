import useSWR from "swr";

const GET_USERS = /* GraphQL */ `
  {
    users {
      name
    }
  }
`;

const fetcher = (query) =>
  fetch("/api/graphql", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => json.data);

export default function Index() {
  const { data, error } = useSWR(GET_USERS, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const { users } = data;

  return (
    <div>
      {users.map((user, i) => (
        <div key={i}>{user.name}</div>
      ))}
    </div>
  );
}
