"use client";

import {
  ArgentinaLogo,
  ChileLogo,
  MexicoLogo,
  UruguayLogo,
} from "@/src/assets/flags";
import { ChevronsUpDown } from "lucide-react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

const countries = [
  {
    value: "ar",
    label: (
      <span className="flex items-center gap-2">
        <ArgentinaLogo /> Argentina
      </span>
    ),
  },
  {
    value: "uy",
    label: (
      <span className="flex items-center gap-2">
        <UruguayLogo /> Uruguay
      </span>
    ),
  },
  {
    value: "cl",
    label: (
      <span className="flex items-center gap-2">
        <ChileLogo /> Chile{" "}
      </span>
    ),
  },
  {
    value: "mx",
    label: (
      <span className="flex items-center gap-2">
        <MexicoLogo /> Mexico
      </span>
    ),
  },
];

export function Combobox() {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (country) {
      params.set("country", country);
    } else {
      params.delete("country");
    }

    replace(`${pathname}?${params.toString()}`);
  }, [country]);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="z-10">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {country
              ? countries.find((pais) => pais.value === country)?.label
              : "Seleccionar país..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Buscar país..." />
            <CommandList>
              <CommandEmpty>País no soportado.</CommandEmpty>
              <CommandGroup>
                {countries.map((pais) => (
                  <CommandItem
                    key={pais.value}
                    value={pais.value}
                    onSelect={(currentValue) => {
                      setCountry(currentValue);
                      setOpen(false);
                    }}
                  >
                    {pais.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
