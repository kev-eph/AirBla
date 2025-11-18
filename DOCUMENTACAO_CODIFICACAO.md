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
**MySQL** (via TiDB Cloud)

O banco de dados utilizado é MySQL, acessado através do serviço gerenciado TiDB Cloud. Esta escolha oferece compatibilidade com MySQL tradicional, escalabilidade horizontal e alta disponibilidade. O ORM Drizzle foi utilizado para abstração de acesso a dados, proporcionando type safety e migrations versionadas.

**ORM:** Drizzle ORM  
**Versão do MySQL:** 8.0 compatível  
**Conexão:** Pool de conexões gerenciado automaticamente

**Tabelas Implementadas:**
- `users`: Armazenamento de dados de usuários autenticados
- `modules`: Módulos de conteúdo educativo sobre cultura da empresa
- `userProgress`: Tracking de progresso individual por módulo
- `quizzes`: Questões de avaliação para cada módulo
- `quizAnswers`: Respostas submetidas pelos usuários aos quizzes

### Hospedagem
**Vercel**

A aplicação está configurada para deploy no Vercel, plataforma especializada em hospedagem de aplicações full-stack. O Vercel oferece deploy automático via Git, CDN global, SSL gratuito e escalabilidade automática. A configuração está pronta para produção através da interface de gerenciamento Manus.

**Características:**
- Deploy automático via Git
- HTTPS habilitado por padrão
- Edge Network global para baixa latência
- Serverless Functions para backend
- Variáveis de ambiente gerenciadas via dashboard

### Plataforma
**Web Application (Full-Stack)**

A plataforma é uma aplicação web full-stack moderna, acessível via navegadores web em desktops, tablets e smartphones. O frontend é uma Single Page Application (SPA) construída com React, enquanto o backend fornece APIs RESTful via tRPC.

**Frontend:** React 19 + TypeScript  
**UI Framework:** Tailwind CSS 4 + shadcn/ui  
**Roteamento:** wouter (client-side routing)  
**State Management:** React Query (via tRPC)

### Modo de Codificação
**[X] Tradicional**  
**[ ] Low-code**  
**[ ] No-code**

O projeto foi desenvolvido utilizando codificação tradicional, com controle total sobre arquitetura, estrutura de dados e lógica de negócio. Esta abordagem permite customização completa, otimização de performance e manutenibilidade a longo prazo.

**Justificativa:** A codificação tradicional foi escolhida para garantir flexibilidade máxima, permitindo implementação de funcionalidades complexas como sistema de quiz interativo, tracking granular de progresso e integração personalizada com OAuth. Além disso, facilita manutenção e evolução futura do sistema.

---

## Arquitetura do Sistema

### Visão Geral

A aplicação segue arquitetura de três camadas (Three-Tier Architecture):

1. **Camada de Apresentação (Frontend):** Interface do usuário construída com React, responsável por renderização de componentes, gerenciamento de estado local e interação com usuário.

2. **Camada de Lógica de Negócio (Backend):** Servidor Node.js com Express, implementando regras de negócio, autenticação, autorização e comunicação com banco de dados via tRPC.

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

**Autenticação:** Implementada via Manus OAuth, delegando gestão de credenciais a provedor confiável. Após autenticação bem-sucedida, um cookie de sessão é criado, permitindo identificação do usuário em requisições subsequentes.

---

## Estrutura de Diretórios

```
airbla-onboarding/
├── client/                    # Frontend React
│   ├── public/               # Arquivos estáticos
│   └── src/
│       ├── _core/            # Funcionalidades core (auth, hooks)
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
│   │   ├── context.ts       # Contexto tRPC (user, req, res)
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
| Streamdown | Latest | Renderização de Markdown com suporte a streaming |
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
| TiDB Cloud | Latest | Serviço gerenciado MySQL-compatível |

### Ferramentas de Desenvolvimento

| Ferramenta | Propósito |
|------------|-----------|
| Vite | Build tool e dev server rápido |
| ESLint | Linter para identificar problemas no código |
| Prettier | Formatador de código automático |
| pnpm | Gerenciador de pacotes eficiente |

---

## Funcionalidades Implementadas

### 1. Sistema de Autenticação

**Descrição:** Autenticação segura via Manus OAuth, permitindo login sem necessidade de gerenciar senhas localmente.

**Tecnologias:** Manus OAuth, JWT, Cookies HTTP-only

**Arquivos Principais:**
- `server/_core/context.ts`: Extração de usuário do cookie de sessão
- `client/src/_core/hooks/useAuth.ts`: Hook React para estado de autenticação
- `server/routers.ts`: Endpoints `auth.me` e `auth.logout`

**Fluxo:**
1. Usuário clica em "Entrar" na landing page
2. Redirecionamento para página de login OAuth
3. Após autenticação bem-sucedida, retorno à aplicação com cookie de sessão
4. Cookie é validado em cada requisição ao backend
5. Informações do usuário disponíveis via `useAuth()` no frontend

### 2. Gestão de Módulos de Onboarding

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

### 3. Sistema de Quiz Interativo

**Descrição:** Quizzes de múltipla escolha para validar aprendizado ao final de cada módulo.

**Tecnologias:** React, tRPC, Drizzle ORM

**Arquivos Principais:**
- `drizzle/schema.ts`: Tabelas `quizzes` e `quizAnswers`
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

### 4. Tracking de Progresso

**Descrição:** Acompanhamento do progresso individual do usuário através dos módulos.

**Tecnologias:** Drizzle ORM, tRPC, React Query

**Arquivos Principais:**
- `drizzle/schema.ts`: Tabela `userProgress`
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

### 5. Interface Responsiva

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

O sistema utiliza as seguintes variáveis de ambiente (gerenciadas automaticamente pela plataforma Manus):

| Variável | Descrição |
|----------|-----------|
| `DATABASE_URL` | String de conexão MySQL |
| `JWT_SECRET` | Segredo para assinatura de tokens JWT |
| `VITE_APP_ID` | ID da aplicação OAuth |
| `OAUTH_SERVER_URL` | URL do servidor OAuth (backend) |
| `VITE_OAUTH_PORTAL_URL` | URL do portal OAuth (frontend) |
| `OWNER_OPEN_ID` | OpenID do proprietário da aplicação |
| `OWNER_NAME` | Nome do proprietário |
| `VITE_APP_TITLE` | Título da aplicação |
| `VITE_APP_LOGO` | URL do logo da aplicação |

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
```

---

## Boas Práticas Implementadas

### Segurança

1. **Autenticação OAuth:** Delegação de gestão de credenciais a provedor confiável
2. **Cookies HTTP-only:** Prevenção de acesso via JavaScript (XSS)
3. **Validação de Input:** Validação de tipos via TypeScript e tRPC
4. **Proteção de Rotas:** Uso de `protectedProcedure` para endpoints sensíveis
5. **Variáveis de Ambiente:** Secrets não hardcoded no código

### Performance

1. **Code Splitting:** Carregamento lazy de componentes via React
2. **Otimização de Bundle:** Vite com tree-shaking automático
3. **Cache Inteligente:** React Query gerencia cache de requisições
4. **Conexão Pool:** Drizzle ORM reutiliza conexões ao banco
5. **Compressão:** Assets servidos com gzip/brotli

### Manutenibilidade

1. **TypeScript:** Type safety em todo o projeto
2. **Separação de Responsabilidades:** Camadas bem definidas
3. **Componentes Reutilizáveis:** shadcn/ui para consistência
4. **Queries Centralizadas:** Todas em `server/db.ts`
5. **Convenções de Nomenclatura:** CamelCase para variáveis, PascalCase para componentes

### Acessibilidade

1. **Componentes Semânticos:** HTML semântico correto
2. **ARIA Labels:** Atributos de acessibilidade onde necessário
3. **Contraste de Cores:** Paleta com contraste adequado (WCAG AA)
4. **Navegação por Teclado:** Todos os elementos interativos acessíveis
5. **Focus Visible:** Indicadores de foco claros

---

## Próximos Passos

### Melhorias Recomendadas

1. **Testes Automatizados:** Implementar Jest + React Testing Library para testes unitários e de integração
2. **Monitoramento:** Adicionar Sentry ou similar para tracking de erros em produção
3. **Analytics:** Implementar Google Analytics ou Mixpanel para métricas de uso
4. **Certificado de Conclusão:** Gerar PDF ao completar todos os módulos
5. **Dashboard Administrativo:** Interface para gestão de conteúdo (CRUD de módulos e quizzes)
6. **Notificações:** Sistema de lembretes para módulos pendentes
7. **Gamificação:** Badges e rankings para aumentar engajamento
8. **Internacionalização:** Suporte a múltiplos idiomas (i18n)

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

**Documento elaborado por:** Equipe de Desenvolvimento  
**Data:** 17 de Novembro de 2025  
**Versão:** 1.0
