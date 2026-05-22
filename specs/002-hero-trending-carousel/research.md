# Research: Hero Carousel (Top 5 Trending)

## Decisão 1: Componente de Carrossel (Shadcn UI + Embla Carousel)

- **Decisão**: Utilizar o componente Carousel padrão do shadcn/ui, que é construído sobre o `embla-carousel-react`.
- **Racional**:
  - Alinhamento total com a constituição do projeto que define a stack com shadcn/ui.
  - O `embla-carousel-react` é leve, extensível e possui suporte nativo para plugins de autoplay.
  - Oferece controle programático flexível sobre o estado do slide atual através de sua API.
- **Alternativas consideradas**:
  - *Swiper.js*: Poderoso, porém muito pesado (aumenta o bundle consideravelmente) e foge dos padrões shadcn do projeto.
  - *Keen-Slider*: Leve, mas requer implementação manual de muitas funcionalidades que o shadcn/ui Carousel já traz prontas.

## Decisão 2: Plugin de Autoplay (`embla-carousel-autoplay`)

- **Decisão**: Utilizar o plugin oficial `embla-carousel-autoplay` para gerenciar as transições automáticas a cada 5 segundos.
- **Racional**:
  - Integração nativa com o Embla Carousel.
  - Permite reiniciar o temporizador de transição de forma robusta após a navegação manual do usuário.
  - Oferece suporte a eventos para pausar no hover (`stopOnMouseEnter: true` ou controle via API no mouseEnter/mouseLeave).
- **Alternativas consideradas**:
  - *Intervalo manual (`setInterval`)*: Requer sincronização manual complexa com os gestos e cliques do Embla, podendo causar pulos de slide inesperados ou bugs de transição dupla.

## Decisão 3: Resolução e Otimização da Imagem de Fundo (Backdrop)

- **Decisão**: Utilizar a resolução original do TMDB (`original`) nas imagens de backdrop, renderizando com o componente `Image` do Next.js.
  - O primeiro slide terá a propriedade `priority` ativa para carregar imediatamente (otimização do LCP).
  - Os slides subsequentes (do 2 ao 5) terão `loading="lazy"` (padrão do Next.js `Image` se `priority` não for especificado).
  - Exibição de uma imagem local escurecida com gradiente e logo como fallback caso o `backdrop_path` retorne nulo.
- **Racional**:
  - Garante fidelidade visual e alta definição em telas grandes.
  - O uso de `priority` no primeiro slide atende diretamente ao requisito de LCP otimizado.
- **Alternativas consideradas**:
  - *Resolução w1280*: Menor consumo de banda, mas pode apresentar pixelização em telas 4K/retina. Optou-se pela original conforme especificação.

## Decisão 4: Estratégia de Isolamento de Estado (RSC + RCC)

- **Decisão**: Fazer a requisição no Server Component (`app/page.tsx`) consumindo a API diretamente (através de `services/movies.ts`) e passar os dados via props para o Client Component do carrossel (`components/movies/hero-carousel.tsx`).
- **Racional**:
  - Mantém o token da API seguro no lado do servidor.
  - Permite renderizar a estrutura básica e os dados iniciais do primeiro slide de forma imediata (bom para SEO e LCP).
  - Encapsula a lógica de animação e estado do carrossel no cliente, respeitando os limites da arquitetura Next.js App Router.
- **Alternativas consideradas**:
  - *Fetch no Cliente via Route Handler*: Adiciona latência extra (uma requisição HTTP a mais), prejudicando a primeira dobra (LCP).
