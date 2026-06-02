"use client";

import { useState, useEffect } from "react";
import { useCarouselConfig, DEFAULT_CAROUSEL_CONFIG, CarouselSectionConfig, CarouselConfigMap } from "@/app/hooks/use-carousel-config";
import { Save, RefreshCcw, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

export function CarouselManager() {
  const { config, loading, refetch } = useCarouselConfig();
  const [localConfig, setLocalConfig] = useState<CarouselConfigMap>(DEFAULT_CAROUSEL_CONFIG);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (config) {
      setLocalConfig(config);
    }
  }, [config]);

  const handleInputChange = (section: string, field: keyof CarouselSectionConfig, value: string) => {
    setLocalConfig((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSave = async (section: string) => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/backend/carousel-config/${section}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(localConfig[section]),
      });

      if (!response.ok) throw new Error("Failed to save");
      
      toast({
        title: "Guardado",
        description: `Configuración de ${section} guardada correctamente.`,
      });
      refetch();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error al guardar la configuración",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/backend/carousel-config/bulk`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(localConfig),
      });

      if (!response.ok) throw new Error("Failed to save all");
      
      toast({
        title: "Todo guardado",
        description: "Toda la configuración del carrusel ha sido actualizada.",
      });
      refetch();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error al guardar la configuración global",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading && Object.keys(config).length === 0) return <div className="p-8 text-center">Cargando configuración...</div>;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gestor del Carrusel</h1>
          <p className="text-muted-foreground">Administra las imágenes de las secciones del inicio</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={refetch}>
            <RefreshCcw className="w-4 h-4 mr-2" />
            Refrescar
          </Button>
          <Button onClick={handleSaveAll} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            Guardar Todo
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {Object.entries(DEFAULT_CAROUSEL_CONFIG).map(([section, _]) => {
          const data = localConfig[section] || { section, backgroundImage: "", extraImages: [] };
          return (
            <Card key={section} className="overflow-hidden">
              <CardHeader className="bg-muted/30">
                <CardTitle className="capitalize">{section.replace(/([A-Z])/g, ' $1')}</CardTitle>
                <CardDescription>Configuración de imagen para la sección {section}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor={`${section}-bg`}>Imagen de Fondo (URL)</Label>
                    <div className="flex gap-2">
                      <Input
                        id={`${section}-bg`}
                        value={data.backgroundImage || ""}
                        onChange={(e) => handleInputChange(section, "backgroundImage", e.target.value)}
                        placeholder="https://..."
                        className="font-mono text-sm"
                      />
                      <Button variant="secondary" onClick={() => handleSave(section)} disabled={isSaving}>
                        Guardar
                      </Button>
                    </div>
                  </div>
                </div>
                
                {data.backgroundImage ? (
                  <div className="mt-4 relative aspect-video rounded-lg overflow-hidden border bg-black/5">
                    <img 
                      src={data.backgroundImage} 
                      alt={section} 
                      className="object-cover w-full h-full transition-opacity duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Error+al+cargar+imagen";
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-end p-4">
                      <span className="text-white text-xs bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                        Vista previa
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 aspect-video rounded-lg border border-dashed flex flex-col items-center justify-center text-muted-foreground bg-muted/10">
                    <ImageIcon className="w-10 h-10 mb-2 opacity-20" />
                    <p className="text-sm">Sin imagen configurada</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
