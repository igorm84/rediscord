import StatusBadge from "@/components/ui/badge/status-badge";
import Divider from "@/components/ui/divider";
import { ListItem } from "@/components/ui/list";
import { UserStatuses } from "@/lib/entities/user";
interface UserStatusProps {
  statuses: { value: string }[];
  handleSubmit: (status: UserStatuses) => void;
  setOpen: (open: boolean) => void;
}

function UserStatus({ statuses, handleSubmit, setOpen }: UserStatusProps) {
  return (
    <div className="leading-[16px]">
      {statuses.map((status, index) => (
        <>
          <ListItem
            onClick={() => {
              setOpen(false), handleSubmit(status.value);
            }}
            className="group my-1 min-w-[180px] max-w-[380px] flex-col  !items-start !rounded text-gray-300 hover:!bg-primary"
            key={index}
          >
            <div className="flex items-center">
              <StatusBadge
                customBackgroundColor="bg-black group-hover:!bg-primary"
                className="relative h-[9px]  w-[9px] !border-none group-hover:!bg-white"
                status={status.value}
              />
              <p className="ml-2">
                {status.value.charAt(0).toUpperCase() + status.value.slice(1)}
              </p>
            </div>
            <div className="ml-5 text-[12px]">
              {status.value === "offline" && (
                <p>
                  You won&apos;t appear as available, but you&apos;ll have
                  access to all Discord features.
                </p>
              )}
              {status.value === "dnd" && (
                <p>You will not receive desktop notifications.</p>
              )}
            </div>
          </ListItem>
          <Divider
            className={`my-2 h-[1px] w-full ${
              status.value === "online" ? "block" : "hidden"
            } `}
          />
        </>
      ))}
    </div>
  );
}

export default UserStatus;
