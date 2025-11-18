# Documentação de Codificação
## AirBLÁ Onboarding Platform

**Projeto:** AirBLÁ Onboarding Platform  
**Versão:** 1.0.0  
**Data:** 17 de Novembro de 2025

---

## Informações do Projeto

### Linguagem do Back-end
**Node.js** (versão 22.13.0)

O backend foi desenvolvido utilizando Node.js com TypeScript, proporcionando type safety e melhor experiência de desenvolvimento. A escolha do Node.js permite execução JavaScript server-side eficiente, com suporte a operações assíncronas nativas e vasto ecossistema de bibliotecas.

**Framework:** Express 4  
**Comunicação API:** tRPC 11 (Type-safe Remote Procedure Calls)  
**Linguagem:** TypeScript 5.x

### Banco de Dados
**MySQL** (via serviço em nuvem)

O banco de dados utilizado é MySQL, acessado através de serviço gerenciado em nuvem. Esta escolha oferece compatibilidade com MySQL tradicional, escalabilidade horizontal e alta disponibilidade. O ORM Drizzle foi utilizado para abstração de acesso a dados, proporcionando type safety e migrations versionadas.

**ORM:** Drizzle ORM  
**Versão do MySQL:** 8.0 compatível  
**Conexão:** Pool de conexões gerenciado automaticamente

**Tabelas Implementadas:**
- `users`: Armazenamento de dados de usuários
- `modules`: Módulos de conteúdo educativo sobre cultura da empresa
- `progress`: Tracking de progresso individual por módulo
- `quizzes`: Questões de avaliação para cada módulo

### Hospedagem
**Plataforma Cloud**

A aplicação está configurada para deploy em plataformas de hospedagem cloud modernas, com suporte a aplicações Node.js full-stack. Opções recomendadas incluem Netlify, Railway, Render ou DigitalOcean App Platform.

**Características:**
- Deploy automático via Git
- HTTPS habilitado por padrão
- CDN global para baixa latência
- Serverless Functions para backend
- Variáveis de ambiente gerenciadas via dashboard

### Plataforma
**Web Application (Full-Stack)**

A plataforma é uma aplicação web full-stack moderna, acessível via navegadores web em desktops, tablets e smartphones. O frontend é uma Single Page Application (SPA) construída com React, enquanto o backend fornece APIs via tRPC.

**Frontend:** React 19 + TypeScript  
**UI Framework:** Tailwind CSS 4 + shadcn/ui  
**Roteamento:** wouter (client-side routing)  
**State Management:** React Query (via tRPC)

### Modo de Codificação
**[X] Tradicional**  
**[ ] Low-code**  
**[ ] No-code**

O projeto foi desenvolvido utilizando codificação tradicional, com controle total sobre arquitetura, estrutura de dados e lógica de negócio. Esta abordagem permite customização completa, otimização de performance e manutenibilidade a longo prazo.

**Justificativa:** A codificação tradicional foi escolhida para garantir flexibilidade máxima, permitindo implementação de funcionalidades complexas como sistema de quiz interativo, tracking granular de progresso e interface responsiva personalizada. Além disso, facilita manutenção e evolução futura do sistema.

---

## Arquitetura do Sistema

### Visão Geral

A aplicação segue arquitetura de três camadas (Three-Tier Architecture):

1. **Camada de Apresentação (Frontend):** Interface do usuário construída com React, responsável por renderização de componentes, gerenciamento de estado local e interação com usuário.

2. **Camada de Lógica de Negócio (Backend):** Servidor Node.js com Express, implementando regras de negócio e comunicação com banco de dados via tRPC.

3. **Camada de Dados (Database):** Banco de dados MySQL gerenciando persistência de informações de usuários, módulos, progresso e quizzes.

### Fluxo de Dados

```
[Usuário] 
   ↓
[React Frontend] 
   ↓ (tRPC Client)
[Node.js Backend + tRPC Router]
   ↓ (Drizzle ORM)
[MySQL Database]
```

**Comunicação Frontend-Backend:** O frontend comunica-se com o backend exclusivamente através de tRPC, que garante type safety end-to-end. Não há necessidade de definir contratos de API manualmente, pois os tipos TypeScript são compartilhados automaticamente.

---

## Estrutura de Diretórios

```
airbla-onboarding/
├── client/                    # Frontend React
│   ├── public/               # Arquivos estáticos
│   └── src/
│       ├── _core/            # Funcionalidades core
│       ├── components/       # Componentes React reutilizáveis
│       │   └── ui/          # Componentes shadcn/ui
│       ├── contexts/        # React Contexts
│       ├── hooks/           # Custom hooks
│       ├── lib/             # Bibliotecas e configurações
│       │   └── trpc.ts      # Cliente tRPC
│       ├── pages/           # Páginas da aplicação
│       │   ├── Home.tsx     # Landing page
│       │   ├── Dashboard.tsx # Dashboard com lista de módulos
│       │   └── ModuleView.tsx # Visualização de módulo + quiz
│       ├── App.tsx          # Configuração de rotas
│       ├── main.tsx         # Entry point
│       └── index.css        # Estilos globais
│
├── server/                   # Backend Node.js
│   ├── _core/               # Funcionalidades core do servidor
│   │   ├── context.ts       # Contexto tRPC
│   │   ├── trpc.ts          # Configuração tRPC
│   │   └── index.ts         # Entry point do servidor
│   ├── db.ts                # Queries do banco de dados
│   └── routers.ts           # Definição de routers tRPC
│
├── drizzle/                 # Configuração do banco de dados
│   └── schema.ts            # Schema das tabelas
│
├── shared/                  # Código compartilhado
│   └── const.ts             # Constantes compartilhadas
│
├── seed-db.mjs              # Script de seed do banco
├── todo.md                  # Tracking de funcionalidades
├── CASOS_DE_TESTE.md        # Documentação de testes
├── LAUDO_DE_QUALIDADE.md    # Laudo de qualidade
└── DOCUMENTACAO_CODIFICACAO.md # Este documento
```

---

## Tecnologias Utilizadas

### Frontend

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| React | 19.x | Biblioteca para construção de interfaces |
| TypeScript | 5.x | Superset JavaScript com tipagem estática |
| Tailwind CSS | 4.x | Framework CSS utility-first |
| shadcn/ui | Latest | Componentes UI acessíveis e customizáveis |
| tRPC Client | 11.x | Cliente type-safe para comunicação com backend |
| wouter | Latest | Roteamento client-side leve |
| React Query | Latest | Gerenciamento de estado e cache |
| Sonner | Latest | Sistema de notificações toast |

### Backend

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| Node.js | 22.13.0 | Runtime JavaScript server-side |
| Express | 4.x | Framework web minimalista |
| tRPC | 11.x | Framework RPC type-safe |
| Drizzle ORM | Latest | ORM TypeScript-first para SQL |
| tsx | Latest | Executor TypeScript para Node.js |

### Banco de Dados

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| MySQL | 8.0 | Sistema de gerenciamento de banco de dados |
| MySQL Cloud Service | Latest | Serviço gerenciado MySQL-compatível |

### Ferramentas de Desenvolvimento

| Ferramenta | Propósito |
|------------|-----------|
| Vite | Build tool e dev server rápido |
| ESLint | Linter para identificar problemas no código |
| Prettier | Formatador de código automático |
| pnpm | Gerenciador de pacotes eficiente |

---

## Funcionalidades Implementadas

### 1. Gestão de Módulos de Onboarding

**Descrição:** Sistema de módulos educativos sobre cultura organizacional, metodologias ágeis, Design Thinking e diversidade.

**Tecnologias:** Drizzle ORM, tRPC, React

**Arquivos Principais:**
- `drizzle/schema.ts`: Definição da tabela `modules`
- `server/db.ts`: Queries `getAllModules()` e `getModuleById()`
- `server/routers.ts`: Router `modules` com endpoints `list` e `getById`
- `client/src/pages/Dashboard.tsx`: Listagem de módulos
- `client/src/pages/ModuleView.tsx`: Visualização de conteúdo

**Funcionalidades:**
- Listagem de todos os módulos ativos
- Ordenação por propriedade `order`
- Visualização de conteúdo em formato Markdown
- Indicação visual de módulos completos/incompletos
- Navegação fluida entre módulos

### 2. Sistema de Quiz Interativo

**Descrição:** Quizzes de múltipla escolha para validar aprendizado ao final de cada módulo.

**Tecnologias:** React, tRPC, Drizzle ORM

**Arquivos Principais:**
- `drizzle/schema.ts`: Tabela `quizzes`
- `server/db.ts`: Queries para quizzes e submissão de respostas
- `server/routers.ts`: Router `quizzes` com endpoints `getByModule` e `submitAnswer`
- `client/src/pages/ModuleView.tsx`: Interface de quiz

**Funcionalidades:**
- Carregamento de questões por módulo
- Seleção de resposta única (radio buttons)
- Validação de resposta obrigatória
- Submissão e gravação no banco de dados
- Cálculo automático de pontuação
- Feedback visual de acertos/erros
- Navegação sequencial entre questões

### 3. Tracking de Progresso

**Descrição:** Acompanhamento do progresso individual através dos módulos.

**Tecnologias:** Drizzle ORM, tRPC, React Query

**Arquivos Principais:**
- `drizzle/schema.ts`: Tabela `progress`
- `server/db.ts`: Queries `getUserProgress()` e `markModuleComplete()`
- `server/routers.ts`: Router `progress`
- `client/src/pages/Dashboard.tsx`: Barra de progresso e indicadores

**Funcionalidades:**
- Cálculo de porcentagem de conclusão
- Barra de progresso visual
- Indicadores por módulo (completo/incompleto)
- Marcação automática ao finalizar quiz
- Mensagem de parabéns ao completar 100%
- Atualização em tempo real via invalidação de cache

### 4. Interface Responsiva

**Descrição:** Design adaptável a diferentes tamanhos de tela (mobile, tablet, desktop).

**Tecnologias:** Tailwind CSS, shadcn/ui

**Arquivos Principais:**
- `client/src/index.css`: Configuração de tema e cores
- Todos os componentes em `client/src/pages/` e `client/src/components/`

**Funcionalidades:**
- Grid responsivo para cards de módulos
- Navegação adaptável
- Tipografia escalável
- Espaçamento consistente
- Componentes acessíveis (WCAG)

---

## Configuração de Ambiente

### Variáveis de Ambiente

O sistema utiliza as seguintes variáveis de ambiente:

| Variável | Descrição |
|----------|-----------|
| `DATABASE_URL` | String de conexão MySQL |
| `JWT_SECRET` | Segredo para assinatura de tokens JWT |
| `SESSION_SECRET` | Segredo para assinatura de cookies de sessão |
| `NODE_ENV` | Ambiente de execução (development/production) |
| `PORT` | Porta do servidor (padrão: 3000) |

### Scripts de Desenvolvimento

```bash
# Instalar dependências
pnpm install

# Executar em modo desenvolvimento
pnpm dev

# Aplicar migrations do banco de dados
pnpm db:push

# Popular banco com dados iniciais
npx tsx seed-db.mjs

# Build para produção
pnpm build

# Iniciar em produção
pnpm start
```

---

## Boas Práticas Implementadas

### Segurança

1. **Validação de Input:** Validação de tipos via TypeScript e tRPC
2. **Variáveis de Ambiente:** Secrets não hardcoded no código
3. **HTTPS:** Comunicação criptografada em produção
4. **Sanitização de Dados:** Prevenção de SQL injection via ORM
5. **Headers de Segurança:** Configuração adequada de CORS e CSP

### Performance

1. **Code Splitting:** Carregamento lazy de componentes via React
2. **Otimização de Bundle:** Vite com tree-shaking automático
3. **Cache Inteligente:** React Query gerencia cache de requisições
4. **Conexão Pool:** Drizzle ORM reutiliza conexões ao banco
5. **Compressão:** Assets servidos com gzip/brotli
6. **CDN:** Distribuição global de conteúdo estático

### Manutenibilidade

1. **TypeScript:** Type safety em todo o projeto
2. **Separação de Responsabilidades:** Camadas bem definidas
3. **Componentes Reutilizáveis:** shadcn/ui para consistência
4. **Queries Centralizadas:** Todas em `server/db.ts`
5. **Convenções de Nomenclatura:** CamelCase para variáveis, PascalCase para componentes
6. **Documentação Inline:** Comentários explicativos em lógica complexa

### Acessibilidade

1. **Componentes Semânticos:** HTML semântico correto
2. **ARIA Labels:** Atributos de acessibilidade onde necessário
3. **Contraste de Cores:** Paleta com contraste adequado (WCAG AA)
4. **Navegação por Teclado:** Todos os elementos interativos acessíveis
5. **Focus Visible:** Indicadores de foco claros
6. **Screen Reader Friendly:** Textos alternativos e labels descritivos

---

## Próximos Passos

### Melhorias Recomendadas

1. **Testes Automatizados:** Implementar Jest + React Testing Library para testes unitários e de integração
2. **Monitoramento:** Adicionar Sentry ou similar para tracking de erros em produção
3. **Analytics:** Implementar Google Analytics ou Mixpanel para métricas de uso
4. **Certificado de Conclusão:** Gerar PDF ao completar todos os módulos
5. **Dashboard Administrativo:** Interface para gestão de conteúdo (CRUD de módulos e quizzes)
6. **Notificações:** Sistema de lembretes para módulos pendentes via email
7. **Gamificação:** Badges e rankings para aumentar engajamento
8. **Internacionalização:** Suporte a múltiplos idiomas (i18n)
9. **PWA:** Transformar em Progressive Web App para uso offline
10. **Integração com RH:** API para exportar dados de progresso para sistemas de RH

---

## Suporte e Manutenção

### Contato

Para questões técnicas ou suporte, entre em contato através dos canais oficiais da AirBLÁ.

### Documentação Adicional

- **README.md:** Instruções de instalação e execução local
- **CASOS_DE_TESTE.md:** Documentação detalhada dos testes executados
- **LAUDO_DE_QUALIDADE.md:** Avaliação completa de qualidade do sistema
- **todo.md:** Tracking de funcionalidades implementadas e pendentes

---

**Documento elaborado por:** Equipe de Desenvolvimento AirBLÁ  
**Data:** 17 de Novembro de 2025  
**Versão:** 1.0
