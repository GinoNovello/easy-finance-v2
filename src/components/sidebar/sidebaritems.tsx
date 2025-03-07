"use client";

import { useContext } from "react";
import { cn } from "@/src/lib/utils";
import { SidebarContext } from "./sidebar";

const initialState: SidebarProviderProps = {
  expanded: false,
  setExpanded: () => {},
};

export function SidebarItem({ icon, text, active, alert }: SiberItemProps) {
  const { expanded, setExpanded } = useContext(SidebarContext);

  return (
    <li
      className={cn(
        "relative flex items-center py-2 px-3 my-1 font-medium rounded-md justify-center cursor-pointer transition-colors group",
        active
          ? "bg-linear-to-tr from-indigo-200 z-20 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600",
      )}
      onClick={() => setExpanded(false)}
    >
      {icon}
      <span
        className={cn(
          "overflow-hidden transition-all",
          expanded ? "w-52 ml-3" : "w-0",
        )}
      >
        {text}
      </span>
      {alert && (
        <div
          className={cn(
            "absolute right-2 w-2 h-2 rounded bg-indigo-400",
            expanded ? "" : "top-2",
          )}
        />
      )}
      {!expanded && (
        <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-200 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
          {text}
        </div>
      )}
    </li>
  );
}
