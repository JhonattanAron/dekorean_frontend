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

interface Category {
  _id: string;
  name: string;
}

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  onCreated?: (cat: Category) => void;
}

export function CreateCategoryModal({ open, setOpen, onCreated }: Props) {
  const [type, setType] = useState("main");
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");

  const [icon, setIcon] = useState("📦");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [mainCategories, setMainCategories] = useState<Category[]>([]);

  const resetState = () => {
    setType("main");
    setName("");
    setParent("");
    setIcon("📦");
    setSuccess(false);
    setLoading(false);
  };

  const handleCreate = async () => {
    try {
      setLoading(true);

      const body = {
        name,
        icon,
        parent: type === "sub" ? parent : null,
      };
      console.log(body);

      const res = await fetch("/api/backend/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      setSuccess(true);
      setLoading(false);

      onCreated?.(data);

      setTimeout(() => {
        setOpen(false);
        resetState();
      }, 1200);
    } catch (error) {
      console.error("error creando categoria", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open) return;

    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/backend/categories/main");
        const data = await res.json();
        setMainCategories(data);
      } catch (error) {
        console.error("error cargando categorias", error);
      }
    };

    fetchCategories();
  }, [open]);

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
          <DialogTitle>Crear Categoría</DialogTitle>
        </DialogHeader>

        {!success ? (
          <>
            <div className="space-y-4 py-2">
              {/* nombre */}

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

              {/* icon selector */}

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

              {/* tipo */}

              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo de categoría</label>

                <select
                  className="w-full h-10 border rounded-md px-3 text-sm"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="main">Categoría principal</option>
                  <option value="sub">Subcategoría</option>
                </select>
              </div>

              {/* categoria padre */}

              {type === "sub" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Categoría padre</label>

                  <select
                    className="w-full h-10 border rounded-md px-3 text-sm"
                    value={parent}
                    onChange={(e) => setParent(e.target.value)}
                  >
                    <option value="">Seleccionar</option>

                    {mainCategories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>

              <Button onClick={handleCreate} disabled={loading || !name}>
                {loading ? "Creando..." : "Crear categoría"}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
            <div className="text-5xl">✅</div>

            <h2 className="text-xl font-semibold text-green-600">
              Categoría creada con éxito
            </h2>

            <p className="text-sm text-muted-foreground">
              La categoría ya está disponible para usar.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
