"use client";
import React, { useMemo, useState } from "react";
import { ListedServer } from "@/lib/entities/server";
import SideMenuItem from "./side-menu-item";
import { clsx } from "@/lib/utils";
import { BsDiscord } from "react-icons/bs";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import Divider from "@/components/ui/divider";
import { useParams } from "next/navigation";

type SideMenuTrackProps = {
  servers: ListedServer[];
};

type ServerMenuItemProps = {
  server: ListedServer;
  isActive: boolean;
} & React.ComponentProps<typeof SideMenuItem>;

const ServerMenuItem = ({
  server,
  isActive,
  ...props
}: Omit<ServerMenuItemProps, "tooltipContent">) => {
  return (
    <SideMenuItem
      isActive={isActive}
      notificationCount={server.messages}
      tooltipContent={<div className="font-semibold">{server.name}</div>}
      className="mx-auto my-2"
      image={{
        url: server.photo,
        alt: server.name,
      }}
      {...props}
    />
  );
};

export default function SideMenuTrack({ servers }: SideMenuTrackProps) {
  const params = useParams();
  const defaultActive = useMemo(
    () => servers.find(({ id }) => params?.id === id)?.id ?? "default",
    [servers],
  );
  const [active, setActive] = useState<string>(defaultActive);

  return (
    <>
      <TooltipProvider>
        {/*
          Direct messages side menu button
        */}
        <SideMenuItem
          href="/me"
          onClick={() => setActive("default")}
          tooltipContent={<div className="font-semibold">Direct messages</div>}
          notificationCount={432}
          className={clsx(
            "mx-auto mb-2 flex items-center justify-center bg-foreground",
            active === "default" ? "bg-primary text-white" : "text-gray-300",
          )}
          isActive={active === "default"}
        >
          <BsDiscord fontSize={26} />
        </SideMenuItem>

        <Divider className="w-8" />
        {servers?.map((server) => (
          <ServerMenuItem
            href={`/server/${server.id}/`}
            key={server.id}
            server={server}
            isActive={active === server.id}
            onClick={() => {
              setActive(server.id);
            }}
          />
        ))}
      </TooltipProvider>
    </>
  );
}
