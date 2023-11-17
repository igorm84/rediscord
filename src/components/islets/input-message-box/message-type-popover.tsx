import { Popover, PopoverContent } from "@/components/ui/popover";
import clsx from "@/lib/clsx";
import { messageTypes } from "@/lib/utils/mock";
import { MessageTypeItem, useMessageType } from "@/state/message-type";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { motion } from "framer-motion";

export const MessageTypePopover = () => {
  const { type: activeType, setType } = useMessageType((state) => state);
  return (
    <Popover open={!!activeType} onOpenChange={(v) => !v && setType(null)}>
      <PopoverTrigger asChild>
        <div className="absolute left-0 top-0 z-[-1000] h-full  w-full"></div>
      </PopoverTrigger>
      <PopoverContent side="top" align="end" asChild>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1] }}
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
      </PopoverContent>
    </Popover>
  );
};
