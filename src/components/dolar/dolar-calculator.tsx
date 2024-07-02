"use client";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { cn } from "@/src/lib/utils";
import { ArrowRightLeft } from "lucide-react";

import { useEffect, useState } from "react";

interface Props {
  dolarValues: DolarResponse[];
  country: string;
}

export default function DolarCalculator({
  dolarValues,
  country = "AR",
}: Props) {
  const [dolarFirst, setDolarFirst] = useState(true);
  const [dolarInfo, setDolarInfo] = useState<DolarResponse>();
  const [comboValues, setComboValues] = useState<DolarResponse[] | undefined>(
    dolarValues,
  );

  useEffect(() => {
    if (!dolarValues) return;

    if (dolarValues.length > 1) {
      setComboValues(dolarValues);
    } else {
      setComboValues(undefined);
      setDolarInfo(dolarValues[0]);
    }
  }, [dolarValues]);

  return (
    <section className="w-full flex flex-col items-center border rounded-md p-10">
      <h2>Calcular</h2>
      <div className="flex items-end h-fit gap-4">
        <div className={cn(" flex flex-col gap-2 order-1")}>
          <Label className="uppercase">{dolarFirst ? "USD" : country}</Label>
          <Input />
        </div>
        <div className={cn(" flex flex-col gap-2 order-3")}>
          <Label className="uppercase">{dolarFirst ? country : "USD"}</Label>
          <Input />
        </div>
        <Button
          variant="ghost"
          className="order-2"
          onClick={() => setDolarFirst(!dolarFirst)}
        >
          <ArrowRightLeft />
        </Button>
      </div>
    </section>
  );
}
