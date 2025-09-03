"use server";

import { generateDynamicPropertySummary } from "@/ai/flows/generate-dynamic-property-summary";

const propertyDetails = `
📍 Empreendimento: MOMENT NOROESTE

Localização: SQNW 104 F, Noroeste, Brasília-DF
Status da Obra: Fundação concluída e estrutura em andamento (Atualizado em 03/09/2025).
Previsão de Entrega: Fevereiro/2028 (Fonte: APEX Engenharia)
Registro de Incorporação: R-11/131.475

---

🏢 Tipos de Apartamentos:

· 3 Quartos (1 Suíte) – 89 m²:
  - Suíte master com espaço para closet.
  - Cozinha americana.
  - Lavabo.
  - 2 vagas de garagem e depósito.

· 3 Quartos (1 Suíte + 2 Semissuítes) – 112 m²:
  - Apartamento de canto, vazado.
  - Sala em dois ambientes.
  - Lavabo.
  - 3 vagas de garagem e depósito.

· 3 Suítes – 105 m²:
  - Apartamento vazado.
  - Varanda gourmet.
  - Lavabo e banheiro de serviço.
  - 2 vagas de garagem e depósito.

---

🎯 Diferenciais das Unidades:

· Acabamento de Alto Padrão: Piso em porcelanato de grande formato, rodapé de 10 cm, bancadas em granito e quartzito.
· Tecnologia e Conforto: Fechadura eletrônica, infraestrutura para automação (compatível com Alexa/Google), aquecimento solar com complementação a gás.
· Conforto Acústico: Laje maciça e paredes duplas com tratamento acústico entre as unidades.
· Praticidade: Infraestrutura para ar condicionado e exaustão na cozinha.
· Sustentabilidade: Vagas de garagem com preparação para carregador de carro elétrico.

---

🏊 Áreas Comuns e Lazer:

· Complexo Aquático: Piscina adulto e infantil climatizadas (26º–28ºC).
· Espaços Gourmet: Churrasqueira com piscina exclusiva para convidados.
· Bem-Estar: Sauna e Spa, academia premium.
· Conveniência e Social: Salão de festas, brinquedoteca, espaço FIX com kit de ferramentas, bicicletário com Bike Wash.
· Tecnologia e Segurança: Paisagismo com iluminação LED e sensores, sistema de segurança 24h com reconhecimento facial e CFTV, Wi-Fi nas áreas comuns e gerador de energia.

---

🏗️ Materiais de Fachada e Acabamento:

· Fachada: Revestida em granito ecológico cinza, vidro de alto desempenho térmico, esquadrias de alumínio e chapas metálicas perfuradas.
· Pilotis: Acabamento em porcelanato e granito, com bancadas em granito polido e mármore.

---

🤝 Construtora e Incorporadora:

· APEX Engenharia: Desde 1976, com mais de 5.000 unidades entregues e 500.000 m² construídos no DF.
· JARJOUR: Mais de 60 anos de mercado, reconhecida pela solidez e confiança em mais de 100 projetos.
`;

export async function getDynamicSummaryAction(userInterests: string) {
  if (!userInterests) {
    return "Por favor, descreva seus interesses para gerarmos um resumo personalizado.";
  }
  try {
    const result = await generateDynamicPropertySummary({
      propertyDetails,
      userInterests,
    });
    return result.summary;
  } catch (error) {
    console.error("Error generating dynamic summary:", error);
    return "Desculpe, não foi possível gerar o resumo. Por favor, tente novamente mais tarde.";
  }
}
