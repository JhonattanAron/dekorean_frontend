"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SearchModal } from "./seach-modal";

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <div className="relative w-full my-6">
        <div className="relative group">
          {/* Icon */}
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2  transition-colors group-focus-within:text-primary" />

          <Input
            placeholder="Buscar productos..."
            value={query}
            onChange={handleChange}
            onFocus={handleFocus}
            className="
        pl-12 pr-12 h-14 text-base
        rounded-2xl
        bg-background/60 backdrop-blur-xl
        border border-border
        shadow-sm
        transition-all duration-300
        focus:ring-2
       
        focus:shadow-lg
      "
          />

          {/* Clear Button */}
          {query && (
            <button
              onClick={() => {
                handleChange({ target: { value: "" } } as any);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <SearchModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        searchQuery={query}
      />
    </>
  );
}
