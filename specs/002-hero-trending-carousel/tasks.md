# Tasks: Carrossel Hero (Top 5 Trending)

**Input**: Design documents from `/specs/002-hero-trending-carousel/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Adicionar o componente de carrossel do shadcn/ui executando `npx shadcn@latest add carousel`
- [x] T002 Instalar a dependência do plugin autoplay `npm install embla-carousel-autoplay`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 [P] Verificar que a API do TMDB e as variáveis de ambiente em `.env.local` estão corretas e funcionando para busca de dados

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Exibição de Destaques Populares (Priority: P1) 🎯 MVP

**Goal**: Exibir um carrossel visualmente imponente com largura total (full width) no topo da Home Page contendo os 5 principais itens de tendências.

**Independent Test**: Acessar a página inicial. O primeiro slide do carrossel deve ser renderizado com a imagem backdrop em alta definição (original) do filme/série, título, nota média e sinopse, e o botão "Mais Detalhes".

### Implementation for User Story 1

- [x] T004 [P] [US1] Criar o arquivo do componente `components/movies/hero-carousel.tsx` e definir os tipos de props `HeroCarouselProps`
- [x] T005 [US1] Implementar a estrutura JSX e estilização CSS (largura total, altura 60vh-80vh, backdrop image com Next.js Image e overlay de gradiente) em `components/movies/hero-carousel.tsx`
- [x] T006 [US1] Otimizar o Largest Contentful Paint (LCP) adicionando a propriedade `priority` no primeiro slide e `loading="lazy"` nos demais slides em `components/movies/hero-carousel.tsx`
- [x] T007 [US1] Modificar a página inicial `app/page.tsx` para buscar as tendências diárias do TMDB, fatiar os 5 primeiros itens para o carrossel, reestruturar o layout global do contêiner para largura total (`w-full`), e fazer o grid principal renderizar os títulos a partir do índice 5.

**Checkpoint**: User Story 1 (MVP) pronta e testável de forma independente.

---

## Phase 4: User Story 2 - Navegação e Transição Dinâmica (Priority: P2)

**Goal**: Adicionar transição automática a cada 5 segundos com pausa ao colocar o mouse por cima (pause-on-hover) e controles manuais (setas e dots).

**Independent Test**: Confirmar se o slide muda sozinho de 5 em 5 segundos, se a animação para ao colocar o mouse sobre o slide, e se clicando nas setas ou dots o slide muda imediatamente reiniciando o timer.

### Implementation for User Story 2

- [x] T008 [US2] Importar e configurar o plugin `Autoplay` de `embla-carousel-autoplay` com atraso de 5 segundos no carrossel de `components/movies/hero-carousel.tsx`
- [x] T009 [US2] Configurar os listeners de mouse `onMouseEnter` e `onMouseLeave` no contêiner do carrossel para pausar e retomar o autoplay usando a API do Embla em `components/movies/hero-carousel.tsx`
- [x] T010 [US2] Implementar os botões de setas de navegação lateral (anterior e próximo) e dots/indicadores de posição que alteram ativamente o slide ativo do carrossel em `components/movies/hero-carousel.tsx`

**Checkpoint**: User Story 2 completa com transições automáticas e manuais ativas.

---

## Phase 5: User Story 3 - Acessibilidade do Carrossel (Priority: P3)

**Goal**: Garantir suporte a navegação por teclado (Tab e Enter), foco visível claro e interrupção do autoplay quando houver foco nos elementos.

**Independent Test**: Focar nos botões de controle usando a tecla Tab e verificar se o autoplay é pausado. Pressionar Enter nas setas/dots e verificar a alteração de slides.

### Implementation for User Story 3

- [x] T011 [US3] Adicionar atributos `aria-label` claros e dinâmicos para leitores de tela nos botões de setas e nos dots indicadores em `components/movies/hero-carousel.tsx`
- [x] T012 [US3] Configurar eventos de `onFocus` e `onBlur` no contêiner do carrossel para suspender a rotação automática enquanto o usuário navega pelo carrossel via teclado em `components/movies/hero-carousel.tsx`

**Checkpoint**: Carrossel totalmente acessível.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Ajustes finos, responsividade mobile, fallback de imagens e validação de tipagem.

- [x] T013 [P] Truncar a sinopse usando a classe `line-clamp-3` do Tailwind para responsividade mobile em `components/movies/hero-carousel.tsx`
- [x] T014 [P] Validar o comportamento de fallback (gradiente/imagem padrão) quando um item retornado do TMDB não possuir `backdrop_path` em `components/movies/hero-carousel.tsx`
- [x] T015 Rodar a verificação de tipos e compilação do TypeScript com `npm run typecheck` para garantir integridade do projeto
- [x] T016 Rodar a formatação e linting no projeto com `npm run format` e `npm run lint`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Sem dependências, inicia imediatamente.
- **Foundational (Phase 2)**: Depende do Setup.
- **User Stories (Phases 3+)**: Dependem da conclusão da Fase Fundacional (Fase 2). Podem ser desenvolvidas de forma sequencial (US1 → US2 → US3).
- **Polish (Phase 6)**: Depende da conclusão de todas as histórias.

### Parallel Opportunities

- T001 e T002 podem rodar em paralelo ou na sequência.
- T004 e T005 podem ser iniciados paralelamente para mockup de layout antes da integração de dados do servidor (T007).
- T013 e T014 (Fase de polimento) podem rodar em paralelo.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Concluir Fase 1 e Fase 2.
2. Criar o layout estático do carrossel com os dados reais do TMDB na Home (User Story 1).
3. **Validar**: Testar se o primeiro slide carrega perfeitamente com a imagem original do TMDB e as informações corretas.

---

## Notes

- Evitar o uso de `any` em todas as tipagens.
- Utilizar a biblioteca `Hugeicons` para os ícones das setas ou indicadores de carregamento.
- Realizar commits após cada entrega de User Story.
