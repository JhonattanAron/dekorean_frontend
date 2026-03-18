"use client";

import { useState, useEffect } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Category } from "@/app/admin/[admin]/categories/page";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  category: Category | null;
  onUpdated?: (cat: Category) => void;
}

export function EditCategoryModal({
  open,
  setOpen,
  category,
  onUpdated,
}: Props) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("📦");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetState = () => {
    setIcon("📦");
    setSuccess(false);
    setLoading(false);
  };

  const handleUpdate = async () => {
    if (!category) return;

    try {
      setLoading(true);

      const body = {
        name,
        icon,
      };

      const res = await fetch(`/api/backend/categories/${category._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      setSuccess(true);
      setLoading(false);

      onUpdated?.(data);

      setTimeout(() => {
        setOpen(false);
        resetState();
      }, 1200);
    } catch (error) {
      console.error("error actualizando categoria", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (category && open) {
      setName(category.name);
      setIcon(category.icon);
    }
  }, [category, open]);

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setIcon(emojiData.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) resetState();
      }}
    >
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Editar Categoría</DialogTitle>
        </DialogHeader>

        {!success ? (
          <>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Nombre de la categoría
                </label>

                <Input
                  placeholder="Ej: Electrónica"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Icono</label>

                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="flex items-center gap-3 border rounded-md px-3 h-10 text-lg"
                >
                  <span>{icon}</span>
                  <span className="text-sm text-muted-foreground">
                    Seleccionar emoji
                  </span>
                </button>

                {showEmojiPicker && (
                  <div className="border rounded-md">
                    <EmojiPicker onEmojiClick={onEmojiClick} />
                  </div>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>

              <Button onClick={handleUpdate} disabled={loading || !name}>
                {loading ? "Actualizando..." : "Actualizar"}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
            <div className="text-5xl">✅</div>

            <h2 className="text-xl font-semibold text-green-600">
              Categoría actualizada
            </h2>

            <p className="text-sm text-muted-foreground">
              Los cambios se han guardado correctamente.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
