"use client";
import { usePathname } from "next/navigation";
import { Sidebar } from "./sidebar";
import { SidebarItem } from "./sidebaritems";
import Link from "next/link";
import { HomeIcon, UserIcon, SettingsIcon } from "lucide-react";

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
      <SidebarItem
        icon={<UserIcon />}
        text="Profile"
        active={pathname === "/profile"}
      />
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
