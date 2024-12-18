export function makeid() {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 12) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function toGrayscale(hexColor: string) {
  const r = parseInt(hexColor.slice(0, 2), 16);
  const g = parseInt(hexColor.slice(2, 4), 16);
  const b = parseInt(hexColor.slice(4, 6), 16);

  const grayscale = Math.round(0.299 * r + 0.587 * g + 0.114 * b);

  const grayscaleHex = grayscale.toString(16).padStart(2, "0");

  return `${grayscaleHex}${grayscaleHex}${grayscaleHex}`;
}
