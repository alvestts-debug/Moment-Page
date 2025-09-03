"use server";

import { generateDynamicPropertySummary } from "@/ai/flows/generate-dynamic-property-summary";

const propertyDetails = `
📍 Empreendimento: MOMENT NOROESTE

Localização: SONW 104, Bloco F, Noroeste, Brasília-DF
Empreendimento residencial de alto padrão com foco em conforto, tecnologia e sustentabilidade.

---

🏢 Tipos de Apartamentos:

· 3 quartos com 1 suíte – 88/89 m²
· 3 quartos com 1 suíte e 2 semissuítes – 112 m² (canto vazado)
· 3 suítes – 105 m² (vazado)
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
· Bancadas em granito
· Infraestrutura para ar condicionado e exaustão na cozinha
· Vagas com preparação para carregador de carro elétrico

---

🏊 Áreas Comuns:

· Piscina adulto e infantil climatizada (26º–28ºC)
· Churrasqueira com piscina exclusiva
· Sauna
· Academia
· Salão de festas
· Brinquedoteca
· Espaço FIX com kit de ferramentas
· Bicicletário com Bike Wash
· Paisagismo integrado com praça
· Iluminação LED e sensores de presença
· Sistema de segurança com reconhecimento facial e CFTV
· Gerador de energia para áreas comuns
· Wi-Fi nas áreas de pilotis e cobertura

---

🧭 Orientação Solar:

· Fachada norte e sul detalhadas com projeção solar
· Inserção no contexto urbano do Noroeste com estudo de insolação

---

🏗️ Materiais de Fachada:

· Granito ecológico cinza
· Vidro de desempenho térmico e lumínico
· Esquadrias de alumínio cinza
· Chapas metálicas perfuradas
· Porcelanato e granito no pilotis

---

🚗 Vagas de Garagem:

· Até 3 vagas por unidade (varia conforme o apartamento e andar)
· Vagas com infraestrutura para carregador de veículo elétrico
· Pintura epóxi no piso da garagem

---

🤝 Construtora e Incorporadora:

· APEX Engenharia (desde 1976, mais de 5 mil unidades entregues)
· JARJOUR (60 anos de mercado, reconhecida por solidez e confiança)
· Parceria consolidada em empreendimentos de alto padrão em Brasília
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
