'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface SpecificationItem {
  label: string
  value: string
}

interface ProductSpecsProps {
  specs: SpecificationItem[]
}

export function ProductSpecs({ specs }: ProductSpecsProps) {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-4 bg-secondary hover:bg-muted transition-colors flex items-center justify-between"
      >
        <h3 className="font-semibold text-foreground">Specifications</h3>
        <ChevronDown
          className={`w-5 h-5 transition-transform ${
            expanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {expanded && (
        <div className="divide-y divide-border">
          {specs.map((spec, index) => (
            <div
              key={index}
              className="px-6 py-4 flex justify-between items-center hover:bg-secondary transition-colors"
            >
              <span className="text-muted-foreground font-medium">
                {spec.label}
              </span>
              <span className="text-foreground font-semibold">{spec.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
