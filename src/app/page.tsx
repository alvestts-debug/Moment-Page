import type { Metadata } from 'next'; // <-- Corrigido: faltava o sinal '>'
import HomeContent from '@/components/home-content'; // Importa o novo componente

// Este é um Server Component, então pode exportar metadados
export const metadata: Metadata = {
  title: 'Moment Noroeste - Apartamentos de 3 Quartos no Coração do Noroeste',
  description: 'Descubra o seu novo lar no Moment Noroeste. Apartamentos com 3 quartos, lazer na cobertura e localização privilegiada. Agende sua visita.',
  openGraph: {
    title: 'Moment Noroeste - Um novo conceito de viver bem',
    description: 'Apartamentos de 3 quartos com arquitetura sofisticada e lazer completo no coração do Noroeste. Conheça.',
    images: [
      { 
        url: 'https://i.imgur.com/eWcADeW.jpeg',
        width: 1200,
        height: 630,
        alt: 'Fachada do empreendimento Moment Noroeste'
      }
    ],
    type: 'website',
  },
};

// A página agora apenas renderiza o conteúdo interativo
export default function HomePage() {
  return <HomeContent />;
}
