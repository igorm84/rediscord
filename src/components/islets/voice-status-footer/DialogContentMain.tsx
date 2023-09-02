import StatusBadge from "@/components/ui/badge/status-badge";
import Button from "@/components/ui/button/button";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import Divider from "@/components/ui/divider";
import { Input } from "@/components/ui/input";
import { ListItem } from "@/components/ui/list";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Time } from "@/lib/entities/time";
import { User, UserStatuses } from "@/lib/entities/user";
import React from "react";
import { FaRegSmileBeam } from "react-icons/fa";

interface DialogContentMainProps {
  currentUser: User;
  statuses: { value: string }[];
}

function DialogContentMain({ currentUser, statuses }: DialogContentMainProps) {
  const timeMappings = [
    { value: Time.FourHours, text: "4 hours" },
    { value: Time.OneHour, text: "1 hour" },
    { value: Time.ThirtyMinutes, text: "30 min" },
    { value: Time.DoNotClean, text: "do not clean" },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ListItem className="mb-2 flex  items-center  !rounded !py-1">
          <FaRegSmileBeam />
          <p className="ml-2">set your own status</p>
        </ListItem>
      </DialogTrigger>
      <DialogContent className=" !rounded text-gray-300">
        <DialogHeader className="text-[12px] font-bold">
          <h2 className="text-center text-lg text-white">
            Set your invidual status
          </h2>
          <p>HOW ARE YOU, {currentUser.username?.toLocaleUpperCase()}?</p>
          <Input
            className="!rounded font-thin"
            placeholder="reinforcements arrived"
          />
        </DialogHeader>
        <DialogDescription>
          <p className="mb-2 text-[12px] font-bold">CLEAN AFTER</p>
          <Select>
            <SelectTrigger className="w-full !border-none">
              <SelectValue placeholder="Today" />
            </SelectTrigger>
            <SelectContent>
              {timeMappings.map((time, index) => (
                <SelectItem key={index} value={time.value}>
                  {time.text}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Divider className="my-4 h-[1px] w-full" />
          <p className="mb-2 text-[12px] font-bold">STATUS</p>
          <Select>
            <SelectTrigger className="w-full !border-none">
              <SelectValue placeholder={currentUser.status} />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status, index) => (
                <SelectItem value={status.value} key={index}>
                  <div className=" flex items-center">
                    <StatusBadge
                      className="relative h-[10px] w-[10px] !border-none group-hover:!bg-white"
                      status={status.value as UserStatuses}
                    />
                    <p className="ml-2">
                      {status.value.charAt(0).toUpperCase() +
                        status.value.slice(1)}
                    </p>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className=" flex w-full justify-end">
            <Button className="mr-2" bg={false}>
              Cancel
            </Button>
            <Button>Save</Button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export default DialogContentMain;
