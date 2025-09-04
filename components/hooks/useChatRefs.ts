import type { ChatStatus, UIDataTypes, UIMessage, UITools } from "ai";
import { useRef } from "react";
import { LOADING_STATUSES } from "@/lib/constants";

type MessageChat = UIMessage<unknown, UIDataTypes, UITools>;

type Args = ReturnType<typeof useInitChatRefs> & {
  messages: MessageChat[];
  status: ChatStatus;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  setMessages: (messages: MessageChat[]) => void;
};

/* **********************************************
 *                useInitChatRef                *
 ********************************************** */

export const useInitChatRefs = () => ({
  /** The history of the generated JSX files */
  jsxs: useRef<string[]>([]),

  /**
   * - `0` for a step with no inappropriate message
   * - `positif number` for the quantity of inappropriate messages related to
   *   a step
   */
  steps: useRef<number[]>([]),

  /**
   * - `-1` at the initial state
   * - `0` or `positive number` when there is an history of steps
   */
  stepIndex: useRef(-1),

  /** Useful to redo */
  stashedMessages: useRef<MessageChat[]>([]),
});

/* **********************************************
 *                 useChatRefs                  *
 ********************************************** */

const useChatRefs = ({
  jsxs,
  messages,
  stashedMessages,
  status,
  stepIndex,
  steps,
  setCode,
  setMessages,
}: Args) => {
  /* **************************
   *        cleanRefs         *
   ************************** */

  const cleanRefs = () => {
    stashedMessages.current = [];
    steps.current.length = stepIndex.current + 1;
    jsxs.current.length = stepIndex.current + 1;
  };

  /* **************************
   *           undo           *
   ************************** */

  const undo = () => {
    const nextMessages = [...messages];

    const quantityToPop = 2 * steps.current[stepIndex.current];

    // Get rid of inappropriate messages
    [...new Array(quantityToPop)].forEach(() => {
      nextMessages.pop();
    });

    // Transfer the proper messages of the last step
    [...new Array(2)].forEach(() => {
      stashedMessages.current.push(nextMessages.pop() as MessageChat);
    });

    // Indicate that the current step doesn't contain any inappropriate message
    // because they won't be displayed on redo
    steps.current[stepIndex.current] = 0;
    stepIndex.current--;

    const jsx = stepIndex.current >= 0 ? jsxs.current[stepIndex.current] : "";

    setMessages(nextMessages);
    setCode(jsx);
  };

  /* **************************
   *           redo           *
   ************************** */

  const redo = () => {
    const nextMessages = [...messages];

    // Transfer the last 2 stashed messages
    [...new Array(2)].forEach(() => {
      nextMessages.push(stashedMessages.current.pop() as MessageChat);
    });

    stepIndex.current++;

    const jsx = jsxs.current[stepIndex.current];

    setMessages(nextMessages);
    setCode(jsx);
  };

  const hasLoader = LOADING_STATUSES.includes(status);

  return {
    canRedo: !hasLoader && stepIndex.current < steps.current.length - 1,
    canUndo: !hasLoader && stepIndex.current >= 0,
    hasLoader,
    cleanRefs,
    redo,
    undo,
  };
};

export default useChatRefs;
