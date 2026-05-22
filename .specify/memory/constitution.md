<!--
SYNC IMPACT REPORT
- Version change: 0.0.0 → 1.0.0
- List of modified principles:
  - [PRINCIPLE_1_NAME] → I. TypeScript-First e Tipagem Estrita
  - [PRINCIPLE_2_NAME] → II. Convenções de Nomenclatura de Componentes e Arquivos
  - [PRINCIPLE_3_NAME] → III. Tailwind CSS e Variáveis de Tema
  - [PRINCIPLE_4_NAME] → IV. Segurança da API do TMDB e Execução no Servidor
  - [PRINCIPLE_5_NAME] → V. UI/UX Premium Mobile-First e Acessibilidade
- Added sections:
  - Performance Standards (replaces SECTION_2)
  - Folder Structure (replaces SECTION_3)
- Removed sections: None
- Templates requiring updates:
  - plan-template.md (✅ updated/no action needed)
  - spec-template.md (✅ updated/no action needed)
  - tasks-template.md (✅ updated/no action needed)
- Follow-up TODOs: None
-->

# TMDB Movies & Series Constitution

Este documento define as diretrizes, padrões de código e regras de arquitetura para o desenvolvimento da aplicação de listagem, busca e filtragem de filmes e séries utilizando a API do TMDB.

## Core Principles

### I. TypeScript-First e Tipagem Estrita
O uso de TypeScript é obrigatório em todos os arquivos de código. O uso de `any` é proibido sem exceção. Use `unknown` e type-narrowing onde for necessário. Tipifique explicitamente props, estados e retornos de funções.

### II. Convenções de Nomenclatura de Componentes e Arquivos
Componentes React devem usar PascalCase (ex: `MovieCard.tsx`) e os arquivos correspondentes devem usar kebab-case (ex: `movie-card.tsx`). Mantenha os componentes focados e funcionais; extraia a lógica para custom hooks quando os arquivos excederem ~80 linhas de lógica.

### III. Tailwind CSS e Variáveis de Tema
Use Tailwind CSS e a utilidade `cn()` para estilização condicional. Use as variáveis do shadcn/ui (`bg-background`, `text-foreground`, `border`, etc.) em vez de cores estáticas (hardcoded). Siga a regra de ordenação de classes: layout → display → spacing → sizing → typography → visual → estado. Não use estilos inline (`style={{}}`) a menos que seja estritamente necessário e justificado.

### IV. Segurança da API do TMDB e Execução no Servidor
O Token de Acesso de Leitura do TMDB (Bearer Token) nunca deve ser exposto no código ou enviado para repositórios. Armazene-o no arquivo `.env.local` como `TMDB_API_ACCESS_TOKEN`. Execute chamadas à API do TMDB no lado do servidor (Server Components) sempre que possível para segurança, desempenho e SEO. Use Route Handlers ou Server Actions do Next.js para requisições iniciadas pelo cliente. Todas as buscas e listagens devem incluir o parâmetro `language=pt-BR` para internacionalização dos dados.

### V. UI/UX Premium Mobile-First e Acessibilidade
Construa uma interface moderna em tema escuro (sleek dark mode) adequada para plataformas de streaming. Use gradientes suaves, glassmorphism, layouts responsivos focados em dispositivos móveis (mobile-first) e transições suaves. Implemente imagens fallback para posters ou backdrops não encontrados. Use Skeletons para carregamento inicial e seletores com feedbacks visuais claros. Siga as melhores práticas de acessibilidade do HTML5 (a11y), garantindo contraste de cores adequado, tags alt descritivas para posters de filmes e suporte total a navegação por teclado.

## Performance Standards
Otimize o carregamento de imagens utilizando o componente `Image` do Next.js ou com tratamento responsivo e lazy loading. Implemente Debouncing na busca textual para limitar requisições excessivas à API do TMDB. Garanta paginação inteligente (ex: carregamento sob demanda ou scroll infinito eficiente).

## Folder Structure
O projeto segue a estrutura padrão do Next.js App Router dentro do diretório `src/`:
*   `app/`: Páginas, layouts, roteamento e estilos globais (globals.css).
*   `components/`: Componentes React (shadcn/ui em `components/ui/`, componentes compartilhados em `components/shared/` e componentes de domínio em `components/movies/`).
*   `hooks/`: Hooks customizados reutilizáveis.
*   `lib/`: Utilitários e configuração de clientes de API.
*   `services/`: Serviços de integração com a API do TMDB.
*   `types/`: Definições de tipos comuns compartilhados.
*   `stores/`: Gerenciamento de estado global com Zustand, se necessário.

## Governance
Qualquer alteração na arquitetura ou dependências principais do projeto deve ser atualizada nesta constituição. Desenvolvedores devem aderir a estas convenções e validar a tipagem e a responsividade dos layouts antes de realizar qualquer commit no repositório.

**Version**: 1.0.0 | **Ratified**: 2026-05-22 | **Last Amended**: 2026-05-22
