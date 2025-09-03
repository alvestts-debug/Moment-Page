
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BedDouble, Building2, MapPin, Sparkles, Trees, UtensilsCrossed } from "lucide-react";
import ContactForm from "@/components/contact-form";
import DynamicSummary from "@/components/dynamic-summary";

// Navigation links.
const navLinks = [
  { href: "#detalhes", label: "O Empreendimento" },
  { href: "#galeria", label: "Galeria" },
  { href: "#contato", label: "Contato" },
];

// Property features data.
const features = [
  {
    icon: <BedDouble className="h-8 w-8 text-primary" />,
    title: "2 e 3 Quartos",
    description: "Apartamentos com plantas inteligentes e acabamentos de alto padrão.",
  },
  {
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    title: "Lazer na Cobertura",
    description: "Piscina com vista panorâmica, academia e espaço gourmet.",
  },
  {
    icon: <MapPin className="h-8 w-8 text-primary" />,
    title: "Localização Nobre",
    description: "No coração do Noroeste, próximo a parques, comércios e serviços.",
  },
  {
    icon: <Building2 className="h-8 w-8 text-primary" />,
    title: "Arquitetura Sofisticada",
    description: "Design moderno com fachada imponente em granito e vidro.",
  },
  {
    icon: <Trees className="h-8 w-8 text-primary" />,
    title: "Sustentabilidade",
    description: "Soluções ecológicas como aquecimento solar e reuso de água.",
  },
  {
    icon: <UtensilsCrossed className="h-8 w-8 text-primary" />,
    title: "Varanda Gourmet",
    description: "Espaços amplos e integrados para momentos especiais.",
  },
];

// Gallery images data.
const galleryImages = [
  { src: "https://i.imgur.com/eWcADeW.jpeg", alt: "Fachada perspectiva 1", hint: "living area perspective" },
  { src: "https://i.imgur.com/q0FFXgt.jpeg", alt: "Fachada perspectiva 2", hint: "apartment perspective" },
  { src: "https://i.imgur.com/gzaL35d.jpeg", alt: "Cozinha", hint: "modern kitchen" },
  { src: "https://i.imgur.com/eLS6cMU.jpeg", alt: "Suíte Master", hint: "master suite" },
  { src: "https://i.imgur.com/sfMVYuP.jpeg", alt: "Perspectiva Piscina", hint: "rooftop pool" },
  { src: "https://i.imgur.com/A2dflVy.jpeg", alt: "Perspectiva Academia", hint: "gym" },
  { src: "https://i.imgur.com/vZXPDz2.jpeg", alt: "Perspectiva Área de Lazer", hint: "leisure area" },
  { src: "https://i.imgur.com/UN5wyDM.jpeg", alt: "Perspectiva Churrasqueira", hint: "barbecue area" },
  { src: "https://i.imgur.com/LIbagMB.jpeg", alt: "Fachada Noturna", hint: "night facade" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-secondary text-foreground">
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 text-primary-foreground backdrop-blur-sm shadow-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <a href="#" className="flex items-center">
            <Image src="https://i.imgur.com/cSRvYaG.png" alt="Moment Noroeste Logo" width={150} height={40} style={{ filter: 'brightness(0) invert(1)' }}/>
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-gray-300"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <Button asChild className="hidden md:flex bg-gray-50 text-gray-900 hover:bg-gray-200" size="sm">
            <a href="#contato">Agende uma Visita</a>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section id="hero" className="relative h-[50vh] w-full">
          <Image
            src="https://i.imgur.com/LIbagMB.jpeg"
            alt="Fachada do empreendimento Moment Noroeste"
            fill
            className="object-cover"
            priority
            data-ai-hint="modern building exterior"
          />
        </section>

        {/* Property Details Section */}
        <section id="detalhes" className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Um novo conceito de viver bem</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Cada detalhe do Moment Noroeste foi pensado para oferecer uma experiência única de moradia, unindo luxo, conforto e praticidade.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} className="bg-card text-card-foreground border-border/50 shadow-md transition-all hover:shadow-xl hover:-translate-y-1">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    {feature.icon}
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Dynamic Summary Section */}
        <section id="resumo-ia" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
             <DynamicSummary />
          </div>
        </section>

        {/* Image Gallery Section */}
        <section id="galeria" className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Galeria de Imagens</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Inspire-se com os ambientes e a arquitetura do seu futuro lar.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {galleryImages.map((image, index) => (
                <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    data-ai-hint={image.hint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <p className="text-white font-semibold">{image.alt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section id="video" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Tour Virtual</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Faça um tour pelo apartamento decorado e sinta a experiência de morar no Moment Noroeste.
              </p>
            </div>
            <div className="mt-12 mx-auto max-w-sm aspect-[9/16] overflow-hidden rounded-lg shadow-2xl">
              <iframe
                src="https://player.vimeo.com/video/1115548444?loop=1&autoplay=1&muted=1"
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contato" className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground">
        <div className="container mx-auto flex h-16 items-center justify-center px-4 md:px-6">
          <p className="text-sm flex items-center gap-2">
            &copy; {new Date().getFullYear()} 
            <Image src="https://i.imgur.com/cSRvYaG.png" alt="Moment Noroeste Logo" width={120} height={32} style={{ filter: 'brightness(0) invert(1)' }} />
            Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
