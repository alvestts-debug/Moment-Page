"use server";

import { generateDynamicPropertySummary } from "@/ai/flows/generate-dynamic-property-summary";

const propertyDetails = `
📍 Empreendimento: MOMENT NOROESTE

Localização: SQNW 104 F, Noroeste, Brasília-DF
Empreendimento residencial de alto padrão com foco em conforto, tecnologia e sustentabilidade, desenvolvido pela APEX Engenharia e JARJOUR.

---

🏢 Tipos de Apartamentos:

· 3 quartos com 1 suíte – 88/89 m² (suíte com closet, 2 vagas, depósito)
· 3 quartos com 1 suíte e 2 semissuítes – 112 m² (canto vazado, 3 vagas, depósito)
· 3 suítes – 105 m² (vazado, varanda gourmet, 2 vagas, depósito)
· Coberturas variando de 175 m² a 261 m²

---

🎯 Diferenciais das Unidades:

· Porta de entrada com fechadura eletrônica e sistema de guilhotina
· Infraestrutura para automação (central de comando – Alexa ou Google)
· Aquecimento solar com complementação a gás
· Piso em porcelanato de grande formato
· Rodapé de poliestireno de 10 cm
· Laje maciça para conforto acústico
· Paredes duplas com tratamento acústico entre unidades
· Bancadas em granito e quartzito
· Infraestrutura para ar condicionado e exaustão na cozinha
· Vagas com preparação para carregador de carro elétrico

---

🏊 Áreas Comuns e Lazer:

· Mais de 2.000m² de área de lazer
· Piscina adulto e infantil climatizada (26º–28ºC)
· Churrasqueira com piscina exclusiva
· Sauna e Spa
· Academia premium
· Salão de festas
· Brinquedoteca
· Espaço FIX com kit de ferramentas
· Bicicletário com Bike Wash
· Paisagismo integrado com praça
· Iluminação LED e sensores de presença
· Sistema de segurança 24h com reconhecimento facial e CFTV
· Gerador de energia para áreas comuns
· Wi-Fi nas áreas de pilotis e cobertura

---

🏗️ Materiais de Fachada e Acabamento:

· Granito ecológico cinza
· Vidro de desempenho térmico e lumínico
· Esquadrias de alumínio cinza
· Chapas metálicas perfuradas
· Porcelanato e granito no pilotis
· Bancadas em granito polido e mármore

---

🤝 Construtora e Incorporadora:

· APEX Engenharia: Desde 1976, mais de 5 mil unidades entregues e 500.000 m² construídos no DF.
· JARJOUR: Mais de 60 anos de mercado, reconhecida por solidez e confiança em mais de 100 projetos.
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
