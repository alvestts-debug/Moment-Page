import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import WhatsAppButton from "@/components/whatsapp-button"; // Importe o novo componente
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Moment Noroeste',
  description: 'Descubra o seu novo lar no coração do Noroeste.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`scroll-smooth ${inter.variable}`}>
      <head>
        {/* Removido as tags <link> do Google Fonts, pois não são mais necessárias */}
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
        <WhatsAppButton /> {/* Adicione o botão aqui */}
      </body>
    </html>
  );
}
