"use client";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { cn } from "@/src/lib/utils";
import { ArrowRightLeft } from "lucide-react";
import { useState } from "react";

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
      console.log(
        "resultado2",
        ((numericValue * 1000) / dolarValueFiltered).toFixed(2),
      );
    }
  };
  const handleSwap = () => {
    setDolarFirst(!dolarFirst);
    // Swap values
    setValor(result);
    setResult(valor);
  };

  return (
    <section className="flex flex-col items-center border rounded-md p-10 absolute">
      <h2>Calcular</h2>
      <div className="flex w-full items-end h-fit gap-4 relative">
        <div className={cn("flex flex-col gap-2 order-1 text-green-300")}>
          <Label className="uppercase">{dolarFirst ? "USD" : country}</Label>
          <Input
            id="usd"
            type="text"
            value={dolarFirst ? valor : result}
            onChange={handleExchange}
          />
        </div>
        <div className={cn("flex flex-col gap-2 order-3")}>
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
        <Button
          disabled
          variant="ghost"
          className="order-2"
          onClick={handleSwap}
        >
          <ArrowRightLeft />
        </Button>
      </div>
    </section>
  );
}
