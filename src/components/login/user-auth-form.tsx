"use client";

import { cn } from "@/src/lib/utils";
import { authSchema, AuthValues } from "@/src/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Icons } from "../ui/icons";

export function UserAuthForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthValues>({
    resolver: zodResolver(authSchema),
  });

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
      <span className="text-2xl pt-12 font-bold text-primary">LOGIN</span>
      <div
        className={cn(
          "grid gap-6 border border-secondary rounded-lg p-5 pt-7 h-[380px] w-[360px]",
        )}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-14">
            <div className="grid gap-2 justify-center items-center ">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                {...register("sheetName")}
                id="sheetName"
                required
                className="text-green-300 min-w-full"
                placeholder="Nombre de la tabla"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
              />
              {errors.sheetName && (
                <h2 className="text-red-500 text-sm text-center">
                  {errors.sheetName.message}
                </h2>
              )}
            </div>
            <div className="grid gap-2 justify-center items-center">
              <div className="grid gap-2 justify-center items-center ">
                <Label className="sr-only" htmlFor="email"></Label>
                <Input
                  {...register("sheetUrl")}
                  id="sheetUrl"
                  className="text-green-300 min-w-full"
                  required
                  placeholder="URL spreadsheet.tsv"
                  autoCapitalize="none"
                  autoCorrect="off"
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
      </div>
    </div>
  );
}
