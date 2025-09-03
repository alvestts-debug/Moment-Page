"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getDynamicSummaryAction } from "@/app/actions";
import { Loader2, Wand2 } from "lucide-react";

const formSchema = z.object({
  interests: z.string().min(5, {
    message: "Descreva seus interesses com pelo menos 5 caracteres.",
  }),
});

export default function DynamicSummary() {
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interests: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setSummary("");
    const result = await getDynamicSummaryAction(values.interests);
    setSummary(result);
    setIsLoading(false);
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="text-primary" />
              Resumo Personalizado com IA
            </CardTitle>
            <CardDescription>
              Diga-nos o que você mais valoriza em um imóvel (ex: 'espaço para família', 'lazer completo', 'investimento') e nossa IA criará um resumo do Moment Noroeste para você.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seus Interesses</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Lazer para crianças e segurança" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isLoading && (
              <div className="mt-4 flex items-center justify-center text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Gerando resumo...
              </div>
            )}
            {summary && !isLoading && (
              <div className="mt-6 rounded-lg border bg-secondary p-4 text-sm">
                <p>{summary}</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Gerando...
                </>
              ) : (
                "Gerar Resumo"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
