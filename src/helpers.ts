export function getContrastColor(hex: string): '#000' | '#fff' {
  const threshold = 130;

  function cutHex(h) { return (h.charAt(0) === '#') ? h.substring(1, 7) : h; }
  function hexToRed(h) { return parseInt((cutHex(h)).substring(0, 2), 16); }
  function hexToGreen(h) { return parseInt((cutHex(h)).substring(2, 4), 16); }
  function hexToBlue(h) { return parseInt((cutHex(h)).substring(4, 6), 16); }

  const brightness = ((hexToRed(hex) * 299) + (hexToGreen(hex) * 587) + (hexToBlue(hex) * 114)) / 1000;

  return brightness > threshold ? '#000' : '#fff';
}

export function formatCardNumber(value: string): string {
  const matches = value.replace(/\s+/g, '').match(/\d{4,16}/g);
  const match = matches ? matches[0] : '';
  const parts = [];
  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  return parts.length ? parts.join(' ') : value;
}


export function getRandomArrayEntry<T>(arr: T[]): T {
  const random = Math.round(Math.random() * arr.length);
  const index = Math.min(arr.length - 1, Math.max(random, 0));
  return arr[index];
}
