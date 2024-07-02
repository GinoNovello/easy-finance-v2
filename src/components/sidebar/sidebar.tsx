"use client";

import { Squeeze as Hamburger } from "hamburger-react";
import { MoreVertical } from "lucide-react";
import { createContext } from "react";
import { useClickOutside } from "@/src/hooks/useClickOutside";
import { cn } from "@/src/lib/utils";

const initialState: SidebarProviderProps = {
  expanded: false,
  setExpanded: () => {},
};

export const SidebarContext = createContext<SidebarProviderProps>(initialState);

export function Sidebar({ children }: SidebarProps) {
  const { divRef: sidebarRef, expanded, setExpanded } = useClickOutside();

  return (
    <aside ref={sidebarRef} className="h-screen">
      <nav className="h-full flex flex-col bg-neutral-950 shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <div
            className={cn(
              "overflow-hidden transition-all duration-500",
              expanded ? "w-32" : "w-0",
            )}
          >
            {/* <Image alt="" src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true" width={50} height={20} /> */}
          </div>
          <Hamburger
            color="white"
            toggled={expanded}
            onToggle={() => setExpanded((curr) => !curr)}
          />
        </div>

        <SidebarContext.Provider value={{ expanded, setExpanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          {/* <Image
                        alt=""
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-md"
                        src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                    /> */}
          <div
            className={cn(
              "flex justify-between items-center overflow-hidden transition-all duration-500",
              expanded ? "w-52 ml-3" : "w-0",
            )}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}
