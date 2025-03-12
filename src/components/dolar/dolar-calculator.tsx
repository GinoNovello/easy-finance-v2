"use client";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { cn } from "@/src/lib/utils";
import { ArrowRightLeft } from "lucide-react";
import { useState } from "react";
import { Combobox } from "./combo-box";

interface Props {
  dolarValues: DolarResponse[];
  country: string;
}

export default function DolarCalculator({
  dolarValues,
  country = "AR",
}: Props) {
  const [dolarFirst, setDolarFirst] = useState(true);

  const [valor, setValor] = useState<number | string>("");
  const [result, setResult] = useState<number | string>("");

  const handleExchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValor(value);

    if (dolarValues) {
      const numericValue = parseFloat(value);
      const dolarValueFiltered =
        dolarValues?.length > 1 ? dolarValues[1].venta : dolarValues[0].venta;
      if (!isNaN(numericValue)) {
        if (dolarFirst) {
          setResult((numericValue * dolarValueFiltered).toFixed(2));
        } else {
          setResult((numericValue / dolarValueFiltered).toFixed(2));
        }
      } else {
        setResult("");
      }
    }
  };
  const handleSwap = () => {
    setDolarFirst(!dolarFirst);
    // Swap values
    setValor(result);
    setResult(valor);
  };

  return (
    <section className="flex flex-col items-center relative justify-center border rounded-md p-10 h-fit">
      <div className="absolute top-0 left-0">
        <Combobox />
      </div>
      <div className="flex w-full items-end h-fit gap-4 relative my-5">
        <div className={cn("flex flex-col gap-2  text-green-300")}>
          <Label className="uppercase">{dolarFirst ? "USD" : country}</Label>
          <Input
            id="usd"
            type="text"
            value={dolarFirst ? valor : result}
            onChange={handleExchange}
          />
        </div>
        <div className="flex flex-col">
          <h2>Calcular</h2>
          <Button disabled variant="ghost" className="" onClick={handleSwap}>
            <ArrowRightLeft />
          </Button>
        </div>
        <div className={cn("flex flex-col gap-2 ")}>
          <Label className="uppercase text-green-100">
            {dolarFirst ? country : "USD"}
          </Label>
          <Input
            size={12}
            type="text"
            disabled
            value={dolarFirst ? result : valor}
            onChange={handleExchange}
          />
        </div>
      </div>
    </section>
  );
}
