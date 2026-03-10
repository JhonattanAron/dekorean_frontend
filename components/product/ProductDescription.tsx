"use client";

import { Card } from "@/components/ui/card";
import { getProductDataWithFallback } from "@/lib/product-defaults";

import {
  FileText,
  Sparkles,
  Wrench,
  ListChecks,
  ShoppingCart,
} from "lucide-react";

interface ProductDescriptionProps {
  overview?: string;
  highlights?: string;
  installation?: string;
  installationSteps?: string;
  purchaseInstructions?: string;
}

function Section({
  icon: Icon,
  title,
  content,
}: {
  icon: any;
  title: string;
  content: string;
}) {
  return (
    <Card className="p-6 border-border/50 hover:border-border transition-colors">
      <div className="flex items-start gap-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted">
          <Icon className="w-5 h-5 text-primary" />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
            {content}
          </p>
        </div>
      </div>
    </Card>
  );
}

export function ProductDescription({
  overview,
  highlights,
  installation,
  installationSteps,
  purchaseInstructions,
}: ProductDescriptionProps) {
  const displayOverview = getProductDataWithFallback(overview, "overview");
  const displayHighlights = getProductDataWithFallback(
    highlights,
    "highlights",
  );
  const displayInstallation = getProductDataWithFallback(
    installation,
    "installation",
  );
  const displayInstallationSteps = getProductDataWithFallback(
    installationSteps,
    "installationSteps",
  );
  const displayPurchaseInstructions = getProductDataWithFallback(
    purchaseInstructions,
    "purchaseInstructions",
  );

  return (
    <div className="space-y-6 w-full">
      <Section icon={FileText} title="Overview" content={displayOverview} />

      <Section icon={Sparkles} title="Highlights" content={displayHighlights} />

      <Section
        icon={Wrench}
        title="Installation"
        content={displayInstallation}
      />

      <Section
        icon={ListChecks}
        title="Installation Steps"
        content={displayInstallationSteps}
      />

      <Section
        icon={ShoppingCart}
        title="Purchase Information"
        content={displayPurchaseInstructions}
      />
    </div>
  );
}
