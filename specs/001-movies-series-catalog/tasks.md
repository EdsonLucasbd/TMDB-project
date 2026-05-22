# Tasks: Movie & Series Catalog

**Input**: Design documents from `/specs/001-movies-series-catalog/`

**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

**Organization**: As tarefas são agrupadas por história de usuário para viabilizar implementações incrementais e testáveis de forma independente.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Pode rodar em paralelo (arquivos distintos, sem dependência direta de tarefas incompletas)
- **[Story]**: Rótulo da história do usuário associada (ex: US1, US2, US3)
- O caminho do arquivo afetado é explicitado na descrição da tarefa

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Configuração do ambiente e inicialização da estrutura básica

- [x] T001 Criar estrutura inicial de pastas e arquivos `.env.local` a partir do `.env.example`
- [x] T002 Instalar componentes do shadcn/ui (skeleton, input, badge, card, dialog) na pasta `components/ui/`
- [x] T003 [P] Configurar regras e scripts de linting/formatting no `package.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Infraestrutura de código necessária antes de iniciar as histórias de usuário

**⚠️ CRITICAL**: Nenhuma tarefa das histórias de usuário pode começar até que esta fase foundational esteja finalizada.

- [x] T004 Criar arquivo de tipos compartilhados `types/tmdb.ts` com interfaces do TMDB (MediaItem, MovieDetails, TVShowDetails, CastMember, Genre)
- [x] T005 [P] Criar cliente de requisição `lib/tmdb-client.ts` com cabeçalho `Authorization: Bearer` e `language=pt-BR`
- [x] T006 [P] Criar serviços de listagem e detalhamento de conteúdo `services/movies.ts` e `services/genres.ts` utilizando o cliente TMDB
- [x] T007 [P] Implementar hook customizado para busca com debounce `hooks/use-debounce.ts`
- [x] T008 Configurar estilos globais em `app/globals.css` com tema escuro (dark mode do shadcn/ui) e `ThemeProvider` em `app/layout.tsx`

**Checkpoint**: Base foundational pronta — a implementação das histórias de usuário pode iniciar em paralelo.

---

## Phase 3: User Story 1 - Feed de Descoberta (Priority: P1) 🎯 MVP

**Goal**: Exibir a listagem dos filmes e séries em alta no momento de forma responsiva no carregamento inicial da página inicial utilizando Server Components.

**Independent Test**: Acessar `http://localhost:3000/` e verificar que o grid de filmes é carregado no servidor e exibe skeletons de transição caso esteja carregando.

### Implementation for User Story 1

- [x] T009 [P] [US1] Criar componente de card de filme `components/movies/movie-card.tsx` com tratamento de poster, nota formatada e componente visual de fallback para pôsteres ausentes
- [x] T010 [P] [US1] Criar componente de grid responsivo `components/movies/movie-grid.tsx` com renderização de skeletons animados para estados de carregamento
- [x] T011 [US1] Implementar a página principal `app/page.tsx` como Server Component consumindo o serviço de descoberta e renderizando o `MovieGrid`

**Checkpoint**: User Story 1 (MVP) está completamente funcional e testável independentemente.

---

## Phase 4: User Story 2 - Busca Inteligente (Priority: P2)

**Goal**: Permitir a busca por títulos em tempo real com debounce de 300ms.

**Independent Test**: Digitar o título de um filme no campo de pesquisa, aguardar 300ms e ver os resultados atualizarem dinamicamente no grid sem recarregar a página.

### Implementation for User Story 2

- [x] T012 [P] [US2] Criar proxy API Route Handler em `app/api/search/route.ts` para efetuar requisições seguras para a API de busca do TMDB no servidor
- [x] T013 [US2] Criar componente de input de busca `components/shared/search-bar.tsx` integrando o `use-debounce.ts` e atualizando os parâmetros da URL (`?search=`)
- [x] T014 [US2] Integrar o `SearchBar` na página principal `app/page.tsx` atualizando o fetch dinamicamente a partir dos searchParams

**Checkpoint**: Busca integrada de forma dinâmica sem expor as chaves da API do TMDB ao cliente.

---

## Phase 5: User Story 3 - Filtros Dinâmicos por URL (Priority: P3)

**Goal**: Filtrar o catálogo de filmes/séries por categorias e gêneros sincronizados com os searchParams da URL.

**Independent Test**: Clicar em um gênero no menu de filtros, verificar que a URL muda para `/?genre=[id]` e o catálogo lista apenas os títulos correspondentes.

### Implementation for User Story 3

- [x] T015 [US3] Criar componente de menu de filtros de gênero `components/shared/filter-bar.tsx` que atualiza a URL (`?genre=[id]`) ao ser clicado
- [x] T016 [US3] Integrar o `FilterBar` na listagem principal em `app/page.tsx` para passar os filtros ativos ao serviço do TMDB

**Checkpoint**: Navegação dinâmica e filtros sincronizados perfeitamente via URL (`searchParams`).

---

## Phase 6: User Story 4 - Detalhes do Título (Priority: P4)

**Goal**: Página de detalhes do filme ou série com informações completas e lista do elenco/equipe técnica principal.

**Independent Test**: Clicar em um filme da lista, navegar para `/movie/[id]` e verificar a exibição da nota, elenco principal, sinopse localizada e dados de lançamento.

### Implementation for User Story 4

- [x] T017 [P] [US4] Criar componente de listagem de elenco `components/movies/cast-list.tsx` renderizando fotos dos atores e papéis correspondentes
- [x] T018 [US4] Implementar página detalhada de filme `app/movie/[id]/page.tsx` utilizando `append_to_response=credits` no servidor
- [x] T019 [US4] Implementar página detalhada de série de TV `app/tv/[id]/page.tsx` utilizando `append_to_response=credits` no servidor

**Checkpoint**: Todas as jornadas de usuário (US1 a US4) concluídas e testáveis individualmente.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Acabamento estético premium, acessibilidade (a11y), linting e validação de build final

- [x] T020 [P] Criar componentes de layout comuns `components/shared/navbar.tsx` e `components/shared/footer.tsx` com estilo glassmorphism
- [x] T021 Implementar componentes de tela de erro genérica e fallback de rede
- [x] T022 Executar verificação estrita do TypeScript (`npm run typecheck`) e certificar-se da ausência de `any`
- [x] T023 Executar linting e formatação do código (`npm run lint` e `npm run format`)
- [x] T024 Executar build local de produção (`npm run build`) para verificar otimização do Next.js

---

## Dependencies & Execution Order

### Phase Dependencies

1. **Setup (Phase 1)**: Inicia imediatamente.
2. **Foundational (Phase 2)**: Depende do Setup estar completo. Bloqueia as demais fases.
3. **User Stories (Phase 3 a 6)**: Podem avançar em sequência (P1 → P2 → P3 → P4) ou em paralelo após a conclusão da Phase 2.
4. **Polish (Phase 7)**: Depende da conclusão das histórias de usuário.

### Parallel Opportunities

- As tarefas `T002` e `T003` podem rodar em paralelo.
- As tarefas `T005`, `T006` e `T007` podem rodar em paralelo.
- Após a fase Foundational, as User Stories podem ser implementadas em paralelo se houver desenvolvedores separados (US1 por Dev A, US2 por Dev B, etc.).
- Os cards e componentes da página de detalhes (`T017`) podem ser desenvolvidos em paralelo com as histórias de filtros/busca.

---

## Parallel Example: Foundational

```bash
# Executar as tarefas independentes da infraestrutura ao mesmo tempo:
Task: "Criar cliente de requisição lib/tmdb-client.ts"
Task: "Implementar hook para busca hooks/use-debounce.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)
1. Concluir Setup.
2. Concluir Foundational (prerequisito para conexão com a API do TMDB).
3. Concluir User Story 1 (Feed de Descoberta).
4. **Validar MVP**: Testar se os filmes mais populares carregam na página inicial localmente.

### Incremental Delivery
1. Liberar MVP com Feed de Descoberta (US1).
2. Adicionar Barra de Busca com Debounce (US2).
3. Adicionar Filtros Dinâmicos (US3).
4. Adicionar Visualização de Detalhes e Elenco (US4).
5. Polimento visual e de acessibilidade.
