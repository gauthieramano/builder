export const getDisplayableKey = (key: string, isCropped?: true) => {
  const isShort = key.length < 10;

  const dotsQuantity = isShort
    ? key.length
    : isCropped // and has at least 10 characters
      ? 4
      : key.length - 6;

  const dots = new Array(dotsQuantity).fill("•").join("");

  return isShort ? dots : `${key.slice(0, 3)}${dots}${key.slice(-3)}`;
};
