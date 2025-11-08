"use client";

import { X } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
}

export default function ImageModal({ isOpen, onClose, imageSrc, imageAlt }: ImageModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Visualização de Imagem</DialogTitle>
          <DialogDescription>Imagem do apartamento em tamanho ampliado.</DialogDescription>
        </DialogHeader>
        <div className="relative w-full h-full flex items-center justify-center bg-black">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 rounded-full bg-white/80 p-2 text-black transition-colors hover:bg-white"
            aria-label="Fechar imagem"
          >
            <X className="h-4 w-4" />
          </button>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain"
            quality={100}
            priority
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
