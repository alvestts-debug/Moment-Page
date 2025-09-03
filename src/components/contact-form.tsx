"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Send, CheckCircle } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  email: z.string().email("Por favor, insira um email válido."),
  phone: z.string().optional(),
  message: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres."),
});

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const whatsappNumber = "5561000000000"; // IMPORTANTE: Substitua pelo número de WhatsApp desejado.
    const messageText = `Olá, tenho interesse no Moment Noroeste!

*Nome:* ${values.name}
*Email:* ${values.email}
*Telefone:* ${values.phone || "Não informado"}
*Mensagem:* ${values.message}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageText)}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");
    
    // We can still simulate the "submission" success state on the page
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 500); // Short delay to allow the new tab to open
  }

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto bg-card shadow-lg">
        <CardHeader className="items-center text-center p-8">
            <CheckCircle className="h-12 w-12 text-green-500" />
            <CardTitle className="mt-4">Obrigado!</CardTitle>
            <CardDescription>Sua mensagem foi preparada para envio no WhatsApp. Por favor, confirme o envio na nova aba.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card shadow-lg">
      <CardHeader>
        <CardTitle>Fale Conosco</CardTitle>
        <CardDescription>
          Preencha o formulário abaixo para mais informações ou para agendar uma visita.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="seu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone (Opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="(XX) XXXXX-XXXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensagem</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Gostaria de mais informações sobre as unidades de 3 quartos..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Abrindo WhatsApp...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Enviar por WhatsApp
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
