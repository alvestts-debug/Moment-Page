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
import { saveContactAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import ReactInputMask from "react-input-mask";

// ATENÇÃO: O campo 'interestType' foi removido do schema por enquanto
const formSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  email: z.string().email("Por favor, insira um email válido."),
  phone: z.string().min(14, "Por favor, insira um telefone válido.").max(15, "O telefone parece longo demais."),
  message: z.string().optional(),
});

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Temporariamente, adicionamos um valor fixo para o interesse
    const dataToSend = { ...values, interestType: 'morar' as const };
    const result = await saveContactAction(dataToSend);
    setIsLoading(false);

    if (result.success) {
      setIsSubmitted(true);
      form.reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } else {
      toast({
        variant: "destructive",
        title: "Erro ao enviar",
        description: result.error || "Não foi possível enviar sua mensagem. Tente novamente mais tarde.",
      });
    }
  }

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto bg-card shadow-lg">
        <CardHeader className="items-center text-center p-8">
            <CheckCircle className="h-12 w-12 text-green-500" />
            <CardTitle className="mt-4">Obrigado pelo seu interesse!</CardTitle>
            <CardDescription>Recebemos sua mensagem e entraremos em contato em breve.</CardDescription>
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
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <FormLabel>Telefone com DDD</FormLabel>
                    <FormControl>
                      <ReactInputMask
                        mask="(99) 99999-9999"
                        value={field.value}
                        onChange={field.onChange}
                      >
                        {(inputProps) => <Input placeholder="(XX) XXXXX-XXXX" {...inputProps} />}
                      </ReactInputMask>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* A SEÇÃO DO RADIOGROUP FOI COMENTADA/REMOVIDA */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensagem (Opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Gostaria de mais informações sobre..."
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
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Enviar Mensagem
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
