# Implementation Plan: Carrossel Hero (Top 5 Trending)

**Branch**: `002-hero-trending-carousel` | **Date**: 2026-05-22 | **Spec**: [spec.md](file:///c:/Dev/tmdb-project/specs/002-hero-trending-carousel/spec.md)

**Input**: Feature specification from `/specs/002-hero-trending-carousel/spec.md`

## Summary

Esta funcionalidade consiste na criação de um carrossel de destaques de largura total (full width) no topo da página inicial. O carrossel exibirá os 5 títulos mais populares do dia consumidos do endpoint `/trending/all/day` da API do TMDB. A requisição será feita no servidor (Server Component) e os dados serão repassados a um Client Component (`HeroCarousel`) que encapsula o estado de navegação, transições e interatividade. O componente utilizará o carrossel do **shadcn/ui** (baseado no `embla-carousel-react`) integrado com o plugin **`embla-carousel-autoplay`**.

## User Review Required

> [!IMPORTANT]
> **Alteração de Layout da Home Page**: 
> Para atingir o visual "largura total" (full width) exigido na especificação, o carrossel será renderizado fora do contêiner padrão `<main className="container mx-auto max-w-7xl ...">`. A estrutura da página inicial será reorganizada em uma `div` pai com largura total (`w-full`), mantendo o restante da grade do catálogo devidamente contido no contêiner `max-w-7xl`.

> [!NOTE]
> **Remoção do Hero Estático**:
> O banner hero de destaque único estático atualmente exibido na Home Page será removido em favor do novo `HeroCarousel`.

## Technical Context

**Language/Version**: TypeScript 5.9+, React 19, Next.js 16 (App Router com Turbopack)

**Primary Dependencies**: Tailwind CSS v4.2.1, shadcn/ui, `@hugeicons/react` (Huge Icons), `embla-carousel-react`, `embla-carousel-autoplay`, `clsx`, `tailwind-merge`

**Storage**: N/A (Consumo dinâmico da API do TMDB)

**Testing**: Vitest para testes unitários, Playwright para fluxos de interação e verificação a11y

**Target Platform**: Navegadores Web Modernos (Mobile-first, layout responsivo a partir de 320px de largura)

**Project Type**: Next.js Web Application

**Performance Goals**: Largest Contentful Paint (LCP) do primeiro slide < 2.0s; lazy loading nos posters/backdrops subsequentes.

**Constraints**: `TMDB_API_ACCESS_TOKEN` mantido exclusivamente no servidor (`.env.local`), nenhuma exposição no bundle cliente; uso do parâmetro `language=pt-BR` em todas as chamadas.

**Scale/Scope**: Exibição dos 5 primeiros itens de tendência na Home Page em formato rotativo.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Rule / Principle | Status | Source / Note |
|------------------|--------|---------------|
| I. TypeScript-First e Tipagem Estrita | PASSED | Tipagem de props do carrossel (`MediaItem` e `HeroCarouselProps`) definida sem `any`. |
| II. Convenções de Nomenclatura | PASSED | Componente `HeroCarousel.tsx` em PascalCase, arquivo de código em kebab-case (`hero-carousel.tsx`). |
| III. Tailwind CSS e Variáveis de Tema | PASSED | Estilização feita pelo Tailwind CSS utilizando a utilidade `cn()` e cores do tema shadcn (`bg-background`, `text-muted-foreground`, etc.). |
| IV. Segurança da API do TMDB e Execução no Servidor | PASSED | Consumo feito via Server Component (`app/page.tsx`) e dados injetados via props. Token mantido no servidor. |
| V. UI/UX Premium e Acessibilidade | PASSED | Overlay de gradiente para contraste, skeletons de carregamento, `aria-labels` nos botões de controle e suporte completo a navegação por teclado (Tab/Enter/Espaço) com pausa de autoplay. |

## Project Structure

### Documentation (this feature)

```text
specs/002-hero-trending-carousel/
├── plan.md              # Este arquivo
├── research.md          # Decisões técnicas e de arquitetura
├── data-model.md        # Definições de entidades de dados
└── quickstart.md        # Instruções de setup e execução
```

### Source Code (repository root)

```text
app/
└── page.tsx             # [MODIFY] Carrega dados no servidor, divide trending e passa top 5 para o carrossel

components/
├── ui/
│   └── carousel.tsx     # [NEW] Componente base de carrossel do shadcn/ui
└── movies/
    └── hero-carousel.tsx # [NEW] Componente interativo do carrossel de destaques (Client Component)
```

**Structure Decision**: Utilizaremos a estrutura existente na raiz do projeto, adicionando o componente de carrossel do shadcn no diretório de UI (`components/ui`) e criando o carrossel de destaque de domínio em `components/movies/hero-carousel.tsx`.

---

## Proposed Changes

### [Shadcn UI Components]

Instalação e configuração do componente base do carrossel.

#### [NEW] [carousel.tsx](file:///c:/Dev/tmdb-project/components/ui/carousel.tsx)
- Contém a definição padrão do componente Carousel baseado no Embla Carousel, incluindo componentes como `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext`.

### [Movies Feature Area]

Desenvolvimento do componente dinâmico e integração na Home Page.

#### [NEW] [hero-carousel.tsx](file:///c:/Dev/tmdb-project/components/movies/hero-carousel.tsx)
- Client Component que gerencia a renderização dos 5 slides.
- Implementa `embla-carousel-autoplay` para transicionar a cada 5 segundos.
- Adiciona eventos de mouseEnter/mouseLeave e focus/blur para pausar/retomar o autoplay.
- Renderiza imagens de backdrop usando `Image` do Next.js (com propriedade `priority` no primeiro slide e `loading="lazy"` nos demais).
- Aplica um overlay de gradiente para contraste do texto.
- Implementa navegação manual (indicadores/dots e setas) com `aria-label` claros.
- Garante acessibilidade a11y completa.

#### [MODIFY] [page.tsx](file:///c:/Dev/tmdb-project/app/page.tsx)
- Altera a busca de tendências diárias.
- Se estiver no modo de descoberta, separa os 5 primeiros resultados para enviar ao `HeroCarousel`.
- Altera `gridItems` para começar do índice 5 da lista de tendências (ou seja, `items.slice(5)`).
- Reorganiza o layout da página inicial em uma `div` flexível, exibindo o `HeroCarousel` em largura total (full width) e o restante do catálogo no contêiner restrito centralizado.

---

## Verification Plan

### Automated Tests

- Executar os testes de build de produção para verificar erros de tipagem TypeScript:
  ```bash
  npm run typecheck
  ```
- (Opcional) Executar testes de integração via Playwright para verificar se os elementos do carrossel estão interativos e o autoplay funciona.

### Manual Verification

- **Verificação de Inicialização**: Abrir a aplicação e confirmar que o carrossel carrega no topo com 5 slides.
- **Verificação de Autoplay**: Aguardar 5 segundos no primeiro slide e confirmar se ele avança sozinho e suavemente.
- **Verificação de Hover**: Colocar o mouse sobre o carrossel e verificar se ele para de girar. Remover o mouse e confirmar que retoma.
- **Verificação de Foco**: Navegar usando a tecla Tab até o carrossel e certificar-se de que ele pausa a transição enquanto focado. Pressionar Enter nas setas ou dots e conferir a mudança imediata de slide.
- **Verificação de Fallback**: Simular um item sem `backdrop_path` e validar se o componente exibe uma imagem/gradiente escurecido padrão sem quebrar a proporção do layout.
- **Verificação de Responsividade**: Reduzir a viewport para largura mobile (ex: 375px) e confirmar que o texto é truncado com `line-clamp-3` e os botões não ficam ocultos ou cortados na primeira dobra.

---

## Complexity Tracking

> **Não há violações de diretrizes da constituição identificadas ou justificadas.**
