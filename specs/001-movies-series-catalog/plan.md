# Implementation Plan: Movie & Series Catalog

**Branch**: `001-movies-series-catalog` | **Date**: 2026-05-22 | **Spec**: [spec.md](file:///c:/Dev/tmdb-project/specs/001-movies-series-catalog/spec.md)

**Input**: Feature specification from `/specs/001-movies-series-catalog/spec.md`

## Summary

O projeto consiste no desenvolvimento de uma aplicação web responsiva (Mobile-first) de alto desempenho para exploração de filmes e séries utilizando a API do TMDB. A arquitetura será baseada no Next.js 16 com React 19, utilizando Server Components para a listagem inicial (feed de descoberta) e chamadas no servidor para garantir SEO e segurança do token da API (`TMDB_API_ACCESS_TOKEN`). Para interações dinâmicas (busca em tempo real e filtros), usaremos parâmetros na URL (`searchParams`) e estados locais com debounce.

## Technical Context

**Language/Version**: TypeScript 5.9+, React 19, Next.js 16 (App Router com Turbopack)

**Primary Dependencies**: Tailwind CSS v4.2.1, shadcn/ui, `@hugeicons/react` (Huge Icons), `clsx`, `tailwind-merge`

**Storage**: N/A (Consumo dinâmico da API do TMDB, persistência de estado via URL `searchParams`)

**Testing**: Vitest para testes unitários/hooks se aplicável, Playwright para testes de integração/fluxo do usuário (conforme MCP servers de Playwright disponíveis)

**Target Platform**: Navegadores Web Modernos (Mobile-first, layout responsivo a partir de 320px de largura)

**Project Type**: Next.js Web Application

**Performance Goals**: First Contentful Paint (FCP) < 1.5s em conexões 3G estáveis para a página inicial; debounce de 300ms na busca textual.

**Constraints**: `TMDB_API_ACCESS_TOKEN` mantido exclusivamente no servidor (`.env.local`), nenhuma exposição no bundle cliente; uso do parâmetro `language=pt-BR` em todas as chamadas.

**Scale/Scope**: Catálogo dinâmico de filmes e séries com busca, paginação e detalhamento de elenco/equipe.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Rule / Principle | Status | Source / Note |
|------------------|--------|---------------|
| TypeScript-First & Strict Tipagem | PASSED | Proibido o uso de `any`, tipagem explícita de props, estados e retornos. |
| Convenções de Nomenclatura | PASSED | Componentes PascalCase, arquivos kebab-case, hooks customizados para lógicas complexas (>80 linhas). |
| Tailwind CSS & Theme Variables | PASSED | Uso do utilitário `cn()`, cores dinâmicas do tema shadcn, sem inline styles ou classes arbitrárias sem justificativa. |
| Segurança & Chamadas no Servidor | PASSED | TMDB token isolado no `.env.local`, chamadas da home feitas no servidor, `language=pt-BR` incluído em todas as queries. |
| UI/UX Premium & Acessibilidade | PASSED | Tema escuro, glassmorphism, responsive a partir de 320px (mobile-first), skeletons animados, tags `alt` descritivas para posters. |
| Otimização de Performance | PASSED | Next.js `Image` ou lazy loading em posters, debounce de 300ms na busca, paginação/scroll eficiente. |

## Project Structure

### Documentation (this feature)

```text
specs/001-movies-series-catalog/
├── plan.md              # Este arquivo
├── research.md          # Fase 0 - Decisões técnicas e padrões
├── data-model.md        # Fase 1 - Estruturas de dados do TMDB
├── quickstart.md        # Fase 1 - Instruções de setup
└── tasks.md             # Fase 2 - Checklist de tarefas (criado posteriormente pelo /speckit-tasks)
```

### Source Code (repository root)

Como o projeto está configurado na raiz (com `tsconfig.json` mapeando `"@/*": ["./*"]`), seguiremos a estrutura na raiz do repositório:

```text
app/                     # Rotas e layouts do Next.js (App Router)
├── globals.css          # Estilos globais
├── layout.tsx           # Layout principal (HTML, ThemeProvider)
├── page.tsx             # Feed de Descoberta (Home)
├── movie/[id]/          # Rota de detalhes de filmes (incluindo elenco/detalhes)
└── tv/[id]/             # Rota de detalhes de séries (incluindo elenco/detalhes)

components/              # Componentes de interface
├── ui/                  # Componentes base (shadcn)
├── shared/              # Componentes compartilhados (Navbar, Footer, SearchBar, FilterBar, ErrorBoundary)
└── movies/              # Componentes de domínio (MovieCard, MovieGrid, CastList)

hooks/                   # Custom Hooks (useDebounce, etc.)
lib/                     # Configurações globais e utilitários (tmdb-client.ts, utils.ts)
services/                # Serviços de chamada à API do TMDB (movies.ts, genres.ts)
types/                   # Tipos TypeScript compartilhados para a API do TMDB (tmdb.ts)
```

**Structure Decision**: A estrutura segue os diretórios no nível da raiz para manter consistência com a configuração existente do `tsconfig.json` e `components.json`, evitando a necessidade de reconfiguração de aliases para a pasta `src/`.

## Complexity Tracking

> *Não há violações das diretrizes da constituição identificadas ou justificadas.*
