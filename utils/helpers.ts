import type {
  TextUIPart,
  UIDataTypes,
  UIMessage,
  UIMessagePart,
  UITools,
} from "ai";
import { REGEX } from "./constants";

const DOTS_MIN_QUANTITY = 4;
const UNMASKED_PADDING = 3;
const UNMASKED_CHARS_QUANTITY = 2 * UNMASKED_PADDING;

export const getDisplayableKey = (key: string, isCropped?: true) => {
  const isShort = key.length < 10;

  const dotsQuantity = isShort
    ? key.length
    : isCropped // and has at least 10 characters
      ? DOTS_MIN_QUANTITY
      : key.length - UNMASKED_CHARS_QUANTITY;

  const dots = new Array(dotsQuantity).fill("•").join("");

  return isShort
    ? dots
    : `${key.slice(0, UNMASKED_PADDING)}${dots}${key.slice(-UNMASKED_PADDING)}`;
};

const isDoneTextUiPart = (
  part: UIMessagePart<UIDataTypes, UITools>,
): part is TextUIPart => part.type === "text" && part.state === "done";

export const getJsx = (message: UIMessage<unknown, UIDataTypes, UITools>) => {
  const doneTextUiPart = message.parts.find(isDoneTextUiPart);

  const result =
    doneTextUiPart?.text.match(REGEX.jsxText) ||
    doneTextUiPart?.text.match(REGEX.jsxCode);

  return result?.[1];
};

export const getProperText = (text: string) => {
  const result = text.match(REGEX.jsxText) || text.match(REGEX.jsxCode);

  return result ? `\`\`\`jsx\n${result[1]}\n\`\`\`` : text;
};
