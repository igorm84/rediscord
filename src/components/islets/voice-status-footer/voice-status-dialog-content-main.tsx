import StatusBadge from "@/components/ui/badge/status-badge";
import Button from "@/components/ui/button/button";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { CustomStatus, User, StaticUserStatuses } from "@/lib/entities/user";
import {
  createCustomStatus,
  getActiveCustomStatus,
} from "@/lib/utils/custom-status";
import React from "react";
import { BsXLg } from "react-icons/bs";
import { FaRegSmileBeam } from "react-icons/fa";

interface DialogContentMainProps {
  currentUser: User;
  statuses: { value: StaticUserStatuses }[];
  handleSubmit: (
    status: StaticUserStatuses,
    customStatus: CustomStatus | null,
  ) => void;
}

const getInitialFormData = (user: User) => {
  const customStatus = getActiveCustomStatus(user.customStatus);
  return {
    statusValue: customStatus?.text ?? "",
    cleanStatus: customStatus?.clearAfter ?? Time.Today,
    status: user.status,
  };
};

function DialogContentMain({
  currentUser,
  statuses,
  handleSubmit,
}: DialogContentMainProps) {
  const [open, setOpen] = React.useState(false);
  const statusInputId = React.useId();
  const [formData, setFormData] = React.useState(() =>
    getInitialFormData(currentUser),
  );

  const handleStatusTextChange = (value: string) => {
    setFormData((prev) => ({ ...prev, statusValue: value }));
  };

  const timeMappings = [
    { value: Time.Today, text: "Today" },
    { value: Time.FourHours, text: "4 hours" },
    { value: Time.OneHour, text: "1 hour" },
    { value: Time.ThirtyMinutes, text: "30 min" },
    { value: Time.DoNotClean, text: "do not clean" },
  ];

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (isOpen) {
          setFormData(getInitialFormData(currentUser));
        }
        setOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>
        <ListItem className="mb-2 flex  items-center  !rounded !py-1 active:!bg-primary">
          <FaRegSmileBeam />
          <p className="ml-2">set your own status</p>
        </ListItem>
      </DialogTrigger>
      <DialogContent className=" !rounded text-gray-300">
        <DialogHeader className="text-[12px] font-bold">
          <DialogTitle className="text-center text-lg font-bold text-white">
            Set your individual status
          </DialogTitle>
          <DialogDescription className="sr-only">
            Set a custom status message, choose when it clears and pick your
            online status.
          </DialogDescription>
          <label htmlFor={statusInputId}>
            HOW ARE YOU, {currentUser.username?.toLocaleUpperCase()}?
          </label>
          <InputField>
            <Input
              id={statusInputId}
              value={formData.statusValue}
              onChange={(e) => {
                handleStatusTextChange(e.target.value);
              }}
              className="!rounded font-thin"
              placeholder="reinforcements arrived"
            />
            <button
              type="button"
              aria-label="Clear custom status"
              className={clsx(
                "absolute  right-4 top-1/2 -translate-y-1/2 outline-none transition-all",
                formData.statusValue
                  ? "rotate-0 opacity-100"
                  : "rotate-90 opacity-0",
              )}
              onClick={() => handleStatusTextChange("")}
            >
              <BsXLg />
            </button>
          </InputField>
        </DialogHeader>
        <div className="text-sm">
          <p className="mb-2 text-[12px] font-bold">CLEAN AFTER</p>
          <Select
            value={formData.cleanStatus}
            onValueChange={(value) => {
              const selected = timeMappings.find(
                (time) => time.value === value,
              );
              if (selected)
                setFormData((prev) => ({
                  ...prev,
                  cleanStatus: selected.value,
                }));
            }}
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
            value={formData.status}
            onValueChange={(value) => {
              const selected = statuses.find(
                (status) => status.value === value,
              );
              if (selected)
                setFormData((prev) => ({ ...prev, status: selected.value }));
            }}
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
            <Button onClick={() => setOpen(false)} className="mr-2" bg={false}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
                handleSubmit(
                  formData.status,
                  createCustomStatus(
                    formData.statusValue,
                    formData.cleanStatus,
                  ),
                );
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DialogContentMain;
