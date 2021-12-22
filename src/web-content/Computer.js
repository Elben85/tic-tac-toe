const EMPTY = 0;

export function computerPlay({ grid }) {
  const notChosen = grid.filter((square) => square.image === EMPTY);
  const randomIndex = Math.floor(Math.random() * notChosen.length);

  return notChosen[randomIndex];
}
