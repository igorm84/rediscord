"use client";
import { AiFillGift, AiOutlineGif } from "react-icons/ai";
import {
  MessageTypeEmojiBtn,
  MessageTypeItemBtn,
} from "./message-type-item-btn";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { MessageTypePopover } from "./message-type-popover";
import { useMessageType } from "@/state/message-type";

export default function InputMessageBox() {
  const { setType } = useMessageType();
  return (
    <div className="min-h-10 relative my-4 grid max-h-[300px] w-full grid-cols-[16px_1fr_100px] items-start justify-start gap-4 overflow-y-auto rounded-md bg-zinc-700 px-3 py-2">
      <MessageTypePopover />
      <MessageTypeItemBtn>
        <BsFillPlusCircleFill fontSize={24} />
      </MessageTypeItemBtn>
      <span
        contentEditable
        className="reset-input resize-none overflow-y-auto bg-transparent"
      ></span>
      <div className="sticky top-0 z-[100] flex items-center justify-start gap-3">
        <div className=" flex items-center justify-start gap-3">
          <MessageTypeItemBtn onClick={() => setType("stickers")}>
            <AiFillGift fontSize={24} />
          </MessageTypeItemBtn>
          <MessageTypeItemBtn onClick={() => setType("gif")}>
            <AiOutlineGif fontSize={24} />
          </MessageTypeItemBtn>
          <MessageTypeEmojiBtn onClick={() => setType("emoji")} />
        </div>
      </div>
    </div>
  );
}
