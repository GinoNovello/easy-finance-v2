"use client";
import { usePathname } from "next/navigation";
import { Sidebar } from "./sidebar";
import { SidebarItem } from "./sidebaritems";
import Link from "next/link";
import { HomeIcon, SettingsIcon, BarChart4Icon } from "lucide-react";

export function ClientSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <Link href="/dashboard">
        <SidebarItem
          icon={<HomeIcon />}
          text="Home"
          active={pathname === "/dashboard"}
        />
      </Link>
      <Link href="/metrics">
        <SidebarItem
          icon={<BarChart4Icon />}
          text="Metrics"
          active={pathname === "/metrics"}
        />
      </Link>
      <Link href="/settings">
        <SidebarItem
          icon={<SettingsIcon />}
          text="Settings"
          active={pathname === "/settings"}
        />
      </Link>
    </Sidebar>
  );
}
