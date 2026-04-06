"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Upload,
  Trash2,
  Copy,
  CheckCircle2,
  Music,
  File,
  X,
} from "lucide-react";
import AdminLayout from "@/components/admin/admin-layout";

type FileItem = {
  key: string;
  url: string;
  size: number;
};

type UploadingFile = {
  id: string;
  name: string;
  progress: number;
  status: "uploading" | "completed" | "error";
};

export default function StorageGallery() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [copied, setCopied] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await fetch("/api/backend/storage/files");
      const data = await res.json();
      setFiles(data.files || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (filesToUpload: File[]) => {
    const uploadBatch = filesToUpload.map((file) => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      progress: 0,
      status: "uploading" as const,
    }));

    setUploadingFiles((prev) => [...prev, ...uploadBatch]);

    for (let i = 0; i < filesToUpload.length; i++) {
      const file = filesToUpload[i];
      const uploadId = uploadBatch[i].id;

      const formData = new FormData();
      formData.append("file", file);

      try {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/backend/storage/upload");

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = (event.loaded / event.total) * 100;
            setUploadingFiles((prev) =>
              prev.map((f) =>
                f.id === uploadId ? { ...f, progress: Math.round(percent) } : f,
              ),
            );
          }
        };

        xhr.onload = () => {
          setUploadingFiles((prev) =>
            prev.map((f) =>
              f.id === uploadId ? { ...f, status: "completed" } : f,
            ),
          );
          // Remover del listado después de 2 segundos
          setTimeout(() => {
            setUploadingFiles((prev) => prev.filter((f) => f.id !== uploadId));
          }, 2000);
        };

        xhr.onerror = () => {
          setUploadingFiles((prev) =>
            prev.map((f) =>
              f.id === uploadId ? { ...f, status: "error" } : f,
            ),
          );
        };

        xhr.send(formData);
      } catch (err) {
        console.error(err);
        setUploadingFiles((prev) =>
          prev.map((f) => (f.id === uploadId ? { ...f, status: "error" } : f)),
        );
      }
    }

    // Recargar archivos después de que todos terminen
    setTimeout(() => {
      fetchFiles();
    }, 1000);
  };

  const deleteFile = async (key: string) => {
    const confirmDelete = confirm("¿Eliminar este archivo?");
    if (!confirmDelete) return;

    await fetch(`/api/backend/storage/delete?key=${key}`, {
      method: "DELETE",
    });

    setSelectedFile(null);
    fetchFiles();
  };

  const isImage = (url: string) => /\.(jpg|jpeg|png|webp|gif|avif)$/i.test(url);
  const isVideo = (url: string) => /\.(mp4|webm|mov)$/i.test(url);
  const isAudio = (url: string) => /\.(mp3|wav|m4a|ogg)$/i.test(url);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredFiles = files.filter((file) =>
    file.key.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getFileIcon = (url: string) => {
    if (isAudio(url)) return <Music className="w-8 h-8 text-blue-500" />;
    if (isVideo(url)) return <File className="w-8 h-8 text-purple-500" />;
    return <File className="w-8 h-8 text-gray-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const getFileName = (key: string) => {
    return key.split("/").pop() || key;
  };

  // Drag and Drop handlers
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleUpload(files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleUpload(files);
    }
  };

  return (
    <AdminLayout>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Galería de Archivos
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gestiona todos tus archivos e imágenes en el storage
          </p>
        </div>

        {/* Upload Section with Drag and Drop */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`mb-8 p-8 rounded-2xl border-2 border-dashed transition-all duration-200 ${
            dragActive
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
              : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900"
          }`}
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <Upload className="w-10 h-10 text-gray-400" />
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Arrastra archivos aquí
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                o haz clic para seleccionar múltiples archivos
              </p>
            </div>
            <label className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl cursor-pointer hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium">
              Seleccionar archivos
              <input
                type="file"
                hidden
                multiple
                onChange={handleFileInputChange}
              />
            </label>
          </div>
        </div>

        {/* Uploading Files Progress */}
        {uploadingFiles.length > 0 && (
          <div className="mb-8 space-y-3 bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Subidas en progreso ({uploadingFiles.length})
            </h3>
            {uploadingFiles.map((uploadFile) => (
              <div key={uploadFile.id} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {uploadFile.name}
                    </span>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {uploadFile.status === "completed"
                        ? "✓"
                        : uploadFile.status === "error"
                          ? "✕"
                          : `${uploadFile.progress}%`}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        uploadFile.status === "completed"
                          ? "bg-green-500"
                          : uploadFile.status === "error"
                            ? "bg-red-500"
                            : "bg-gradient-to-r from-blue-500 to-blue-600"
                      }`}
                      style={{ width: `${uploadFile.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar archivos por nombre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          {searchQuery && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {filteredFiles.length}{" "}
              {filteredFiles.length === 1 ? "resultado" : "resultados"}{" "}
              encontrados
            </p>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              Cargando archivos...
            </p>
          </div>
        )}

        {/* Grid Gallery */}
        {!loading && (
          <>
            {filteredFiles.length === 0 && !searchQuery && (
              <div className="text-center py-16">
                <Upload className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  No hay archivos. Comienza subiendo uno.
                </p>
              </div>
            )}

            {filteredFiles.length === 0 && searchQuery && (
              <div className="text-center py-16">
                <Search className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  No se encontraron archivos para "{searchQuery}"
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredFiles.map((file) => (
                <div
                  key={file.key}
                  onClick={() => setSelectedFile(file)}
                  className="group cursor-pointer rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Preview Container */}
                  <div className="relative w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 overflow-hidden flex items-center justify-center">
                    {isImage(file.url) && (
                      <img
                        src={file.url}
                        alt={getFileName(file.key)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    )}

                    {isVideo(file.url) && (
                      <video
                        src={file.url}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Ver detalles
                      </span>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate mb-1">
                      {getFileName(file.key)}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Modal */}
        {selectedFile && (
          <div
            onClick={() => setSelectedFile(null)}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Detalles del Archivo
                </h3>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Preview */}
                <div className="mb-8 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 overflow-hidden flex items-center justify-center min-h-64">
                  {isImage(selectedFile.url) && (
                    <img
                      src={selectedFile.url}
                      alt={getFileName(selectedFile.key)}
                      className="w-full h-auto object-contain max-h-96"
                    />
                  )}

                  {isVideo(selectedFile.url) && (
                    <video
                      src={selectedFile.url}
                      controls
                      className="w-full h-auto object-contain max-h-96"
                    />
                  )}

                  {isAudio(selectedFile.url) && (
                    <div className="flex flex-col items-center gap-4 py-12">
                      <Music className="w-16 h-16 text-blue-500" />
                      <audio
                        src={selectedFile.url}
                        controls
                        className="w-full max-w-xs"
                      />
                    </div>
                  )}
                </div>

                {/* File Info */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 font-medium">
                        Nombre
                      </p>
                      <p className="text-gray-900 dark:text-white break-all">
                        {getFileName(selectedFile.key)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 font-medium">
                        Tamaño
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        {formatFileSize(selectedFile.size)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* URL Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    URL del archivo
                  </label>
                  <div className="flex gap-2">
                    <input
                      value={selectedFile.url}
                      readOnly
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => copyToClipboard(selectedFile.url)}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200"
                    >
                      {copied ? (
                        <>
                          <CheckCircle2 className="w-5 h-5" />
                          Copiado
                        </>
                      ) : (
                        <>
                          <Copy className="w-5 h-5" />
                          Copiar
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => deleteFile(selectedFile.key)}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition-colors duration-200"
                  >
                    <Trash2 className="w-5 h-5" />
                    Eliminar
                  </button>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="flex-1 px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
