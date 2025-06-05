export async function searchPlayersByName(name: string) {
  const response = await fetch(
    `https://api.lineup-builder.co.uk/api/25/player?name=${name}`
  );
  const data = await response.json();
  return data.players || [];
}
