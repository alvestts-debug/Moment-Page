"use client";

import { MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Número de telefone para o qual a mensagem será enviada
  const phoneNumber = "5561986339057";

  // Mensagem padrão que aparecerá no campo de texto do WhatsApp
  const message = encodeURIComponent("Olá! Tenho interesse nos apartamentos do Moment Noroeste. Podem me ajudar?");

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000); // O botão aparece após 2 segundos

    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      aria-label="Fale conosco no WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
