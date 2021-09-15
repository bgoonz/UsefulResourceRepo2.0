export function getClue() {
  let randomQuestion = fetch("https://jservice.xyz/api/random-clue");
  return randomQuestion.then((res) => {
    if (!res.ok) throw new Error(res.status);
    return res.json();
  });
}
