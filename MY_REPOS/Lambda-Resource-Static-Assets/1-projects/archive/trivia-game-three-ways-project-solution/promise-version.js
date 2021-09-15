export function getClue() {
  return fetch("https://jservice.xyz/api/random-clue").then((response) => {
    if (!response.ok) throw new Error(response.status);

    return response.json();
  });
}
