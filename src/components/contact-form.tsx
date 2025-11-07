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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Importe o Select
import ReactInputMask from "react-input-mask";

const formSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  email: z.string().email("Por favor, insira um email válido."),
  phone: z.string().min(14, "Por favor, insira um telefone válido.").max(15, "O telefone parece longo demais."),
  interestType: z.enum(["morar", "investir"], {
    required_error: "Você precisa selecionar um objetivo.",
  }),
  incomeRange: z.string({ required_error: "Selecione uma faixa de renda." }), // Novo campo
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
      interestType: undefined, // Deixe como undefined para forçar a escolha
      incomeRange: "", // Novo campo
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const result = await saveContactAction(values);
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
            <FormField
              control={form.control}
              name="interestType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Qual seu objetivo?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="morar" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Morar
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="investir" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Investir
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="incomeRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Faixa de Renda</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma faixa de renda" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="5k-9k">R$ 5.000 a R$ 9.000</SelectItem>
                      <SelectItem value="10k-15k">R$ 10.000 a R$ 15.000</SelectItem>
                      <SelectItem value="16k+">R$ 16.000 ou mais</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
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
