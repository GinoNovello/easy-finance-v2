"use client";

import { cn } from "@/src/lib/utils";
import { authSchema, AuthValues } from "@/src/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Icons } from "../ui/icons";
import { Input } from "../ui/input";
import { ThemeSwitch } from "../settings/theme-switch";

export function UserAuthForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sheetUrl, setSheetUrl] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AuthValues>({
    resolver: zodResolver(authSchema),
  });

  const sheetNameValue = watch("sheetName");
  const sheetUrlValue = watch("sheetUrl");

  const onSubmit = async (values: AuthValues) => {
    setIsLoading(true);

    await fetch("/api/cookieinfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sheetUrl: values.sheetUrl,
        sheetName: values.sheetName,
      }),
    });
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <span className="text-2xl pt-12 font-bold">LOGIN</span>
      <div className={cn("grid gap-6 rounded-lg p-5 pt-7")}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-14">
            <div className="relative w-full">
              <Label
                className={cn(
                  nameFocused || sheetNameValue
                    ? "-translate-y-5 bg-background px-1 text-xs"
                    : "",
                  "absolute left-3 top-3 text-primary transition-all duration-200",
                )}
                htmlFor="sheetName"
              >
                Nombre
              </Label>
              <Input
                {...register("sheetName")}
                id="sheetName"
                required
                className="min-w-full"
                onBlur={() => setNameFocused(false)}
                onFocus={() => setNameFocused(true)}
                disabled={isLoading}
              />
              {errors.sheetName && (
                <h2 className="text-red-500 text-sm text-center">
                  {errors.sheetName.message}
                </h2>
              )}
            </div>
            <div className="grid gap-2 justify-center items-center">
              <div className="relative w-full">
                <Label
                  className={cn(
                    sheetUrl || sheetUrlValue
                      ? "-translate-y-5 bg-background px-1 text-xs"
                      : "",
                    "absolute left-3 top-3 text-primary transition-all duration-200",
                  )}
                  htmlFor="sheetUrl"
                >
                  URL spreadsheet.tsv
                </Label>
                <Input
                  {...register("sheetUrl")}
                  id="sheetUrl"
                  className="min-w-full"
                  required
                  onBlur={() => setSheetUrl(false)}
                  onFocus={() => setSheetUrl(true)}
                  disabled={isLoading}
                />
              </div>
              {errors.sheetUrl && (
                <h2 className="text-red-500 text-sm text-center">
                  {errors.sheetUrl.message}
                </h2>
              )}
            </div>
            <Button type="submit" variant="default">
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Ingresar
            </Button>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center"></div>
        </div>
        <ThemeSwitch />
      </div>
    </div>
  );
}
