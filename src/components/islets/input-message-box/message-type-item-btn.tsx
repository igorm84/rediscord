import HybridButton, {
  HybridButtonProps,
} from "@/components/ui/hybrid/hybrid-button";
import clsx from "@/lib/clsx";
import { emojiList } from "@/lib/utils/mock";
import { useState } from "react";

type MessageTypeItemBtnProps = HybridButtonProps;
export const MessageTypeItemBtn = ({
  children,
  className,
  ...props
}: MessageTypeItemBtnProps) => (
  <HybridButton
    className={clsx(
      "sticky top-0 z-[100] text-gray-300 hover:text-gray-200",
      className,
    )}
    {...props}
  >
    {children}
  </HybridButton>
);

export const MessageTypeEmojiBtn = ({
  className,
  ...props
}: MessageTypeItemBtnProps) => {
  const [emojiIdx, setEmojiIdx] = useState(0);
  const [canChange, setCanChange] = useState(true);

  const hoverHandler = () => {
    if (canChange) {
      setEmojiIdx((v) => (v + 1) % emojiList.length);
      setCanChange(false);
    }
  };

  const EmojiComponent = emojiList[emojiIdx];
  return (
    <HybridButton
      onMouseEnter={hoverHandler}
      onMouseLeave={() => setCanChange(true)}
      className={clsx("text-gray-300 hover:text-gray-200", className)}
      {...props}
      data-testid="message-type-emoji-btn"
    >
      <EmojiComponent fontSize={24} />
    </HybridButton>
  );
};
