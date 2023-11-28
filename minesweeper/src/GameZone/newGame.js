import GameZone from "./GameZone";

export default ( { size, bomb } ) => {
  const gameWrap = document.getElementById('game-wrap');
  while (gameWrap.firstChild) gameWrap.removeChild(gameWrap.firstChild);

  gameWrap.classList.remove('not-click');

  const modal = document.getElementById('modal');
  modal.classList.remove('modal_visible');

  return new GameZone(size, bomb, 0, 0);
}