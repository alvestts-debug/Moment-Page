"use server";

import { Resend } from 'resend';

console.log("RESEND_API_KEY:", process.env.RESEND_API_KEY ? "Carregada" : "NÃO CARREGADA");

const resend = new Resend(process.env.RESEND_API_KEY);

// Adicionamos o campo incomeRange à interface
interface ContactData {
  name: string;
  email: string;
  phone: string;
  interestType: 'morar' | 'investir';
  incomeRange: string; // Novo campo
  message?: string;
}

export async function saveContactAction(data: ContactData) {
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: 'Moment Noroeste <onboarding@resend.dev>',
      to: ['alvestts@gmail.com'],
      subject: `Novo Contato no Site: ${data.name}`,
      html: generateEmailHtml(data),
    });

    if (error) {
      console.error("Erro detalhado da Resend:", error);
      return { success: false, error: "Falha ao enviar sua mensagem. Tente novamente." };
    }

    console.log("E-mail enviado com sucesso:", emailData);
    return { success: true };

  } catch (error) {
    console.error("Erro geral ao processar o contato:", error);
    return { success: false, error: "Ocorreu um erro inesperado." };
  }
}

// Atualizamos a função para incluir a faixa de renda no e-mail
function generateEmailHtml(data: ContactData): string {
  const interestTypeText = data.interestType === 'morar' ? 'Para Morar' : 'Para Investir';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Novo Contato - Moment Noroeste</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
        .header { background-color: #253027; color: #f0f0f0; padding: 10px 20px; border-radius: 8px 8px 0 0; text-align: center; }
        .content { padding: 20px 0; }
        .field { margin-bottom: 15px; }
        .field strong { color: #253027; }
        .footer { font-size: 0.9em; color: #777; margin-top: 20px; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Novo Lead Recebido!</h1>
        </div>
        <div class="content">
          <p>Você recebeu um novo contato através do formulário do site Moment Noroeste.</p>
          <div class="field"><strong>Nome:</strong> ${data.name}</div>
          <div class="field"><strong>Email:</strong> ${data.email}</div>
          <div class="field"><strong>Telefone:</strong> ${data.phone}</div>
          <div class="field"><strong>Interesse:</strong> ${interestTypeText}</div>
          <div class="field"><strong>Faixa de Renda:</strong> ${data.incomeRange}</div> {/* Novo campo no e-mail */}
          ${data.message ? `<div class="field"><strong>Mensagem:</strong> ${data.message}</div>` : ''}
        </div>
        <div class="footer">
          <p>Este é um e-mail automático. Por favor, não responda.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
