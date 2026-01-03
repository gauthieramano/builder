import type {
  TextUIPart,
  UIDataTypes,
  UIMessage,
  UIMessagePart,
  UITools,
} from "ai";
import { REGEX } from "./constants";

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

const isDoneTextUIPart = (
  part: UIMessagePart<UIDataTypes, UITools>,
): part is TextUIPart => part.type === "text" && part.state === "done";

export const getJsx = (message: UIMessage<unknown, UIDataTypes, UITools>) => {
  const doneTextUIPart = message.parts.find(isDoneTextUIPart);

  const result =
    doneTextUIPart?.text.match(REGEX.JSX_TEXT) ||
    doneTextUIPart?.text.match(REGEX.JSX_CODE);

  return result?.[1];
};
