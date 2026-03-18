"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Minus, Coins } from "lucide-react";

interface CreditCounterProps {
  initialCredits?: number;
  onChange?: (credits: number) => void;
}

export function CreditCounter({
  initialCredits = 2,
  onChange,
}: CreditCounterProps) {
  const [credits, setCredits] = useState(initialCredits);

  const updateCredits = (value: number) => {
    const newCredits = Math.max(0, value);
    setCredits(newCredits);
    onChange?.(newCredits);
  };

  const increment = () => updateCredits(credits + 1);
  const decrement = () => updateCredits(credits - 1);

  return (
    <Card className="p-4 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl shadow-xl">
      <div className="flex items-center justify-between">
        {/* Label */}
        <div className="flex items-center gap-2 text-slate-200">
          <Coins className="w-5 h-5 text-yellow-400" />
          <span className="font-semibold">Créditos</span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-white min-w-[40px] text-center">
            {credits}
          </span>
        </div>
      </div>
    </Card>
  );
}
