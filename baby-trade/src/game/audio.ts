import newsSfx from '../assets/audio/new_news_item.mp3';

export function playNewsSound() {
  const audio = new Audio(newsSfx);
  audio.play();
}
