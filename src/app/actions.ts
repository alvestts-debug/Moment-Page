"use server";

import { generateDynamicPropertySummary } from "@/ai/flows/generate-dynamic-property-summary";

const propertyDetails = `
Empreendimento: Moment Noroeste
Localização: Setor Noroeste, Brasília - DF, Brasil. Próximo ao Parque Burle Marx e com fácil acesso às principais vias da cidade.
Arquitetura e Design: Fachada imponente com granito marrom polido, esquadrias metálicas na cor grafite e amplas áreas envidraçadas com vidro translúcido cinza-azulado. O design interior prioriza acabamentos suaves em tons de bege e neutros claros, criando um ambiente aconchegante e sofisticado.
Unidades Residenciais:
- Apartamentos de 2 quartos: 75m² a 85m², 1 suíte, varanda.
- Apartamentos de 3 quartos: 100m² a 120m², 2 suítes, varanda gourmet.
- Coberturas Duplex: 200m² a 250m², 3 suítes, piscina privativa e espaço gourmet.
Todas as unidades contam com acabamentos de alto padrão, piso em porcelanato e preparação para automação residencial.
Áreas de Lazer e Comodidades:
- Térreo (Pilotis): Salão de festas elegante, brinquedoteca moderna, playground ao ar livre.
- Cobertura Coletiva: Piscina com borda infinita e vista panorâmica da cidade, academia equipada com aparelhos de última geração, sauna, e dois espaços gourmet com churrasqueira.
Sustentabilidade e Tecnologia:
- Sistema de aquecimento de água com placas solares.
- Captação e reuso de água da chuva para irrigação dos jardins e limpeza das áreas comuns.
- Bicicletário com bicicletas compartilhadas (sistema pay-per-use).
- Tomadas para carros elétricos na garagem.
Segurança: Portaria 24 horas, sistema de monitoramento por câmeras e controle de acesso biométrico.
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
