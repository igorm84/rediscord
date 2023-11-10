import clsx from "@/lib/clsx";
import { messageTypes } from "@/lib/utils/mock";
import { MessageTypeItem, useMessageType } from "@/state/message-type";
import { motion } from "framer-motion";
import * as Popover from "@radix-ui/react-popover";

export const MessageTypePopover = () => {
  const { type: activeType, setType } = useMessageType((state) => state);
  return (
    <Popover.Root open={!!activeType} onOpenChange={(v) => !v && setType(null)}>
      <Popover.Trigger asChild>
        <div className="absolute left-0 top-0 z-[-1000] h-full  w-full"></div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content side="top" align="end" asChild>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-[400px] w-[400px] rounded-xl bg-neutral-800 p-4 transition-all
                duration-200 ease-in-out"
          >
            <div className="flex gap-3 text-gray-400">
              {messageTypes.map(({ type, text }) => (
                <span
                  onClick={() => setType(type as MessageTypeItem)}
                  className={clsx(
                    activeType == type && "rounded-md bg-zinc-700 text-white",
                    "cursor-pointer p-1",
                  )}
                  key={type}
                >
                  {text}
                </span>
              ))}
            </div>
          </motion.div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
