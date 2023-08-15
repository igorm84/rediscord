"use client";

import { useState } from "react";
import Badge from "@/components/ui/badge";
import TabGroup from "@/components/ui/tab-group";
import TabGroupButton from "@/components/ui/tab-group/tab-group-button";

const tabList = [
  {
    name: "Available",
  },
  {
    name: "All",
  },
  {
    name: "Pending",
    count: 1,
  },
  {
    name: "Blocked",
  },
];
export default function FriendsTabGroup() {
  const [active, setActive] = useState<string>("Available");
  return (
    <TabGroup>
      {tabList.map((item) => (
        <TabGroupButton
          active={active === item.name}
          onClick={() => setActive(item.name)}
          key={item.name}
        >
          {item.name} <Badge className="ml-1" count={item.count} />
        </TabGroupButton>
      ))}
    </TabGroup>
  );
}
