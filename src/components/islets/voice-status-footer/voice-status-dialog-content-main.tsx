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
import InputField from "@/components/ui/input/input-field";
import { ListItem } from "@/components/ui/list";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import clsx from "@/lib/clsx";
import { Time } from "@/lib/entities/time";
import { User, UserStatuses } from "@/lib/entities/user";
import React from "react";
import { BsXLg } from "react-icons/bs";
import { FaRegSmileBeam } from "react-icons/fa";

interface DialogContentMainProps {
  currentUser: User;
  statuses: { value: string }[];
  handleSubmit: (status: UserStatuses) => void;
}

function DialogContentMain({
  currentUser,
  statuses,
  handleSubmit,
}: DialogContentMainProps) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    statusValue: "",
    cleanStatus: "",
    status: "",
  });
  const formNames = Object.keys(formData);

  const handleValueChange = (value: string, name: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const timeMappings = [
    { value: Time.FourHours, text: "4 hours" },
    { value: Time.OneHour, text: "1 hour" },
    { value: Time.ThirtyMinutes, text: "30 min" },
    { value: Time.DoNotClean, text: "do not clean" },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ListItem className="mb-2 flex  items-center  !rounded !py-1 active:!bg-primary">
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
          <InputField>
            <Input
              value={formData.statusValue}
              onChange={(e) => {
                handleValueChange(e.target.value, formNames[0]);
              }}
              className="!rounded font-thin"
              placeholder="reinforcements arrived"
            />
            <button
              className={clsx(
                "absolute  right-4 top-1/2 -translate-y-1/2 outline-none transition-all",
                formData.statusValue
                  ? "rotate-0 opacity-100"
                  : "rotate-90 opacity-0",
              )}
              onClick={() => handleValueChange("", formNames[0])}
            >
              <BsXLg />
            </button>
          </InputField>
        </DialogHeader>
        <DialogDescription>
          <p className="mb-2 text-[12px] font-bold">CLEAN AFTER</p>
          <Select
            onValueChange={(value) => handleValueChange(value, formNames[1])}
          >
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
          <Select
            onValueChange={(value) => handleValueChange(value, formNames[2])}
          >
            <SelectTrigger className="w-full !border-none">
              <SelectValue placeholder={currentUser.status} />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status, index) => (
                <SelectItem className="group" value={status.value} key={index}>
                  <div className=" flex items-center">
                    <StatusBadge
                      customBackgroundColor="bg-midground group-hover:!bg-foreground "
                      className="relative h-[9px] w-[9px] !border-none group-hover:!bg-white"
                      status={status.value}
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
            <Button
              onClick={() => setOpen((prev) => !prev)}
              className="mr-2"
              bg={false}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setOpen((prev) => !prev);
                handleSubmit(formData.status);
                // handleSubmit(formData.statusValue.trim() || formData.status);
              }}
            >
              Save
            </Button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export default DialogContentMain;
