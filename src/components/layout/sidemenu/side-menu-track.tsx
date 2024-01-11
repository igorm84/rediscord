"use client";

import React, { memo, useCallback, useMemo, useState } from "react";
import { ListedServer } from "@/lib/entities/server";
import SideMenuItem from "./side-menu-item";
import { clsx } from "@/lib/utils";
import { BsDiscord } from "react-icons/bs";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import Divider from "@/components/ui/divider";
import { useParams } from "next/navigation";
import useNotificationCount from "@/lib/hooks/useNotificationCount";

type SideMenuTrackProps = {
  servers: ListedServer[];
};

type ServerMenuItemProps = {
  server: ListedServer;
  isActive: boolean;
} & React.ComponentProps<typeof SideMenuItem>;

type ServersListProps = {
  servers: ListedServer[];
  activeId: string;
  changeActiveServer: (id: string) => void;
};

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

const ServersList = memo(
  ({ servers, activeId, changeActiveServer }: ServersListProps) =>
    servers?.map((server) => (
      <ServerMenuItem
        href={`/server/${server.id}/`}
        key={server.id}
        server={server}
        isActive={activeId === server.id}
        onClick={() => {
          changeActiveServer(server.id);
        }}
      />
    )),
);

export default function SideMenuTrack({ servers }: SideMenuTrackProps) {
  const params = useParams();
  const defaultActive = useMemo(
    () => servers.find(({ id }) => params?.id === id)?.id ?? "default",
    [params?.id, servers],
  );
  const [active, setActive] = useState<string>(defaultActive);
  const changeActiveServer = useCallback((id: string) => setActive(id), []);
  const notificationCount = useNotificationCount();
  return (
      <TooltipProvider>
        {/*
          Direct messages side menu button
        */}
        <SideMenuItem
          href="/me"
          onClick={() => setActive("default")}
          tooltipContent={<div className="font-semibold">Direct messages</div>}
          notificationCount={notificationCount}
          className={clsx(
            "mx-auto mb-2 flex items-center justify-center bg-foreground",
            active === "default" ? "bg-primary text-white" : "text-gray-300",
          )}
          isActive={active === "default"}
        >
          <BsDiscord fontSize={26} />
        </SideMenuItem>

        <Divider className="w-8" />
        <ServersList
          servers={servers}
          activeId={active}
          changeActiveServer={changeActiveServer}
        />
      </TooltipProvider>
  );
}
