import { drizzle } from "drizzle-orm/mysql2";
import { modules, quizzes } from "./drizzle/schema.js";

const db = drizzle(process.env.DATABASE_URL);

const seedData = async () => {
  console.log("🌱 Iniciando seed do banco de dados...");

  // Módulos de onboarding
  const modulesData = [
    {
      title: "Bem-vindo à AirBLÁ!",
      description: "Conheça a história, missão e valores da nossa empresa",
      content: `# Bem-vindo à AirBLÁ!

Estamos muito felizes em ter você conosco! A AirBLÁ é uma empresa inovadora que valoriza a diversidade, criatividade e colaboração.

## Nossa História
Fundada em 2020, a AirBLÁ nasceu com o propósito de transformar a forma como as empresas se comunicam e colaboram.

## Missão
Criar soluções tecnológicas que conectam pessoas e potencializam resultados.

## Valores
- **Inovação**: Buscamos constantemente novas formas de fazer melhor
- **Diversidade**: Valorizamos diferentes perspectivas e experiências
- **Colaboração**: Trabalhamos juntos para alcançar objetivos comuns
- **Transparência**: Comunicação aberta e honesta em todas as relações`,
      order: 1,
      duration: 15,
      isActive: 1,
    },
    {
      title: "Nossa Cultura Organizacional",
      description: "Entenda como trabalhamos e o que esperamos de você",
      content: `# Nossa Cultura Organizacional

Na AirBLÁ, cultivamos um ambiente dinâmico e inclusivo onde todos podem crescer e contribuir.

## Ambiente de Trabalho
- Flexibilidade de horários
- Trabalho híbrido (presencial e remoto)
- Espaços colaborativos e criativos

## Desenvolvimento Profissional
Investimos no crescimento contínuo da nossa equipe através de:
- Programas de mentoria
- Cursos e certificações
- Feedback construtivo e regular

## Comunicação
- Reuniões diárias de alinhamento (daily stand-ups)
- Canais abertos de comunicação
- Cultura de feedback contínuo`,
      order: 2,
      duration: 20,
      isActive: 1,
    },
    {
      title: "Metodologias Ágeis",
      description: "Como aplicamos Scrum e outras práticas ágeis no dia a dia",
      content: `# Metodologias Ágeis na AirBLÁ

Trabalhamos com metodologias ágeis para garantir entregas rápidas e de qualidade.

## Scrum
Utilizamos o framework Scrum com:
- **Sprints** de 2 semanas
- **Daily Stand-ups** todas as manhãs
- **Sprint Planning** no início de cada sprint
- **Sprint Review** e **Retrospectiva** ao final

## Papéis
- **Product Owner**: Define prioridades e requisitos
- **Scrum Master**: Facilita o processo e remove impedimentos
- **Time de Desenvolvimento**: Executa as tarefas

## Ferramentas
- Jira para gestão de tarefas
- Confluence para documentação
- Slack para comunicação`,
      order: 3,
      duration: 25,
      isActive: 1,
    },
    {
      title: "Design Thinking e UX",
      description: "Como criamos experiências centradas no usuário",
      content: `# Design Thinking e UX

Na AirBLÁ, colocamos o usuário no centro de tudo que fazemos.

## Processo de Design Thinking
1. **Empatia**: Entender profundamente as necessidades dos usuários
2. **Definição**: Clarificar o problema a ser resolvido
3. **Ideação**: Gerar múltiplas soluções criativas
4. **Prototipagem**: Criar versões testáveis das ideias
5. **Teste**: Validar com usuários reais

## Princípios de UX
- Simplicidade e clareza
- Acessibilidade para todos
- Feedback visual imediato
- Consistência na interface

## Testes com Usuários
Realizamos testes regulares para garantir que nossas soluções atendem às necessidades reais.`,
      order: 4,
      duration: 30,
      isActive: 1,
    },
    {
      title: "Diversidade e Inclusão",
      description: "Nosso compromisso com um ambiente diverso e inclusivo",
      content: `# Diversidade e Inclusão

A diversidade é um dos nossos pilares fundamentais.

## Nosso Compromisso
- Equipes diversas em gênero, etnia, idade e background
- Processos seletivos inclusivos e sem vieses
- Políticas de equidade salarial
- Ambiente seguro e respeitoso para todos

## Iniciativas
- Grupos de afinidade (ERGs - Employee Resource Groups)
- Treinamentos sobre viés inconsciente
- Celebração de datas importantes para diferentes comunidades
- Mentoria para grupos sub-representados

## Canal de Denúncias
Mantemos um canal confidencial para reportar qualquer situação de discriminação ou assédio.

Juntos, construímos um ambiente onde todos podem ser autênticos e alcançar seu potencial máximo.`,
      order: 5,
      duration: 20,
      isActive: 1,
    },
  ];

  console.log("📚 Inserindo módulos...");
  const insertedModules = await db.insert(modules).values(modulesData).$returningId();
  console.log(`✅ ${insertedModules.length} módulos inseridos`);

  // Quizzes para cada módulo
  const quizzesData = [
    // Quiz para módulo 1
    {
      moduleId: 1,
      question: "Qual é a missão da AirBLÁ?",
      options: JSON.stringify([
        "Vender produtos tecnológicos",
        "Criar soluções tecnológicas que conectam pessoas e potencializam resultados",
        "Ser a maior empresa do mercado",
        "Desenvolver aplicativos móveis",
      ]),
      correctAnswer: 1,
    },
    {
      moduleId: 1,
      question: "Qual NÃO é um valor da AirBLÁ?",
      options: JSON.stringify([
        "Inovação",
        "Diversidade",
        "Competição agressiva",
        "Transparência",
      ]),
      correctAnswer: 2,
    },
    // Quiz para módulo 2
    {
      moduleId: 2,
      question: "Qual é o modelo de trabalho da AirBLÁ?",
      options: JSON.stringify([
        "Apenas presencial",
        "Apenas remoto",
        "Híbrido (presencial e remoto)",
        "Não há flexibilidade",
      ]),
      correctAnswer: 2,
    },
    {
      moduleId: 2,
      question: "Como a AirBLÁ investe no desenvolvimento profissional?",
      options: JSON.stringify([
        "Não investe",
        "Apenas com salários altos",
        "Programas de mentoria, cursos e feedback",
        "Apenas com bônus anuais",
      ]),
      correctAnswer: 2,
    },
    // Quiz para módulo 3
    {
      moduleId: 3,
      question: "Qual é a duração dos sprints na AirBLÁ?",
      options: JSON.stringify([
        "1 semana",
        "2 semanas",
        "1 mês",
        "3 meses",
      ]),
      correctAnswer: 1,
    },
    {
      moduleId: 3,
      question: "Qual ferramenta é usada para gestão de tarefas?",
      options: JSON.stringify([
        "Trello",
        "Asana",
        "Jira",
        "Monday",
      ]),
      correctAnswer: 2,
    },
    // Quiz para módulo 4
    {
      moduleId: 4,
      question: "Qual é a primeira etapa do Design Thinking?",
      options: JSON.stringify([
        "Prototipagem",
        "Empatia",
        "Teste",
        "Ideação",
      ]),
      correctAnswer: 1,
    },
    {
      moduleId: 4,
      question: "Qual NÃO é um princípio de UX mencionado?",
      options: JSON.stringify([
        "Simplicidade e clareza",
        "Acessibilidade para todos",
        "Complexidade técnica",
        "Consistência na interface",
      ]),
      correctAnswer: 2,
    },
    // Quiz para módulo 5
    {
      moduleId: 5,
      question: "O que são ERGs?",
      options: JSON.stringify([
        "Grupos de afinidade (Employee Resource Groups)",
        "Equipes de vendas",
        "Grupos de projetos",
        "Equipes de suporte",
      ]),
      correctAnswer: 0,
    },
    {
      moduleId: 5,
      question: "A AirBLÁ possui canal de denúncias?",
      options: JSON.stringify([
        "Não",
        "Sim, mas não é confidencial",
        "Sim, confidencial para reportar discriminação ou assédio",
        "Apenas para gerentes",
      ]),
      correctAnswer: 2,
    },
  ];

  console.log("❓ Inserindo quizzes...");
  await db.insert(quizzes).values(quizzesData);
  console.log(`✅ ${quizzesData.length} quizzes inseridos`);

  console.log("🎉 Seed concluído com sucesso!");
  process.exit(0);
};

seedData().catch((error) => {
  console.error("❌ Erro ao fazer seed:", error);
  process.exit(1);
});
