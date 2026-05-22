# Feature Specification: Carrossel Hero (Top 5 Trending)

**Feature Branch**: `002-hero-trending-carousel`

**Created**: 2026-05-22

**Status**: Draft

**Input**: User description: "Funcionalidade: Carrossel Hero (Top 5 Trending)
Objetivo: Exibir um destaque rotativo na parte superior da página inicial contendo os 5 títulos (filmes ou séries) mais populares do momento, criando um impacto visual imersivo logo na primeira dobra (above the fold).

1. Fonte de Dados e Integração
Endpoint: Utilizar /trending/all/day (ou /movie/popular) da API do TMDB.

Processamento: A requisição deve ser feita no lado do servidor (Server Component). O retorno deve ser fatiado (.slice(0, 5)) para garantir apenas os 5 principais resultados.

Imagens: Utilizar a propriedade backdrop_path com a resolução original do TMDB para garantir alta definição em telas grandes.

2. UI/UX e Comportamento
Layout: Ocupar a largura total da tela (full width) com uma altura imponente (ex: 60vh a 80vh).

Composição Visual: A imagem de fundo deve ter um overlay de gradiente (do preto/tema escuro para transparente) para garantir que o título, a sinopse e os botões de ação (ex: "Mais Detalhes") fiquem legíveis.

Navegação: O carrossel deve transicionar automaticamente a cada ~5 segundos. A transição deve ser pausada se o usuário colocar o mouse sobre o componente (pause-on-hover).

Controles: Incluir indicadores de posição (dots/linhas) e setas de navegação lateral para controle manual.

Critérios de Aceitação (Definition of Done)
LCP Otimizado: A imagem do primeiro slide deve obrigatoriamente utilizar a propriedade de prioridade (ex: priority no next/image) para otimizar o Largest Contentful Paint. As imagens dos slides 2 a 5 devem manter o lazy loading.

Resiliência (Fallback): Se um título do Top 5 não possuir backdrop_path, o sistema deve pular esse título ou exibir um fundo de fallback sem quebrar o layout.

Acessibilidade: Os controles de navegação (setas e dots) devem possuir aria-labels claros. O carrossel deve poder ser pausado e navegado utilizando apenas a tecla Tab e Enter.

Isolamento de Estado: Como a página inicial é um Server Component, a lógica de interação do carrossel (estado do slide atual, auto-play) deve ser encapsulada em um Client Component específico (ex: HeroCarousel.tsx), recebendo os dados do servidor via props.

Responsividade: No mobile, a sinopse (overview) deve ser truncada (ex: máximo de 3 linhas usando line-clamp-3 do Tailwind) para não empurrar os botões para fora da tela."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Exibição de Destaques Populares (Priority: P1)

Como visitante da aplicação, quero visualizar os 5 títulos em destaque no topo da página inicial com imagens atraentes de fundo e informações básicas legíveis para me informar rapidamente sobre o que está em alta.

**Why this priority**: É a essência do componente, fornecendo o impacto visual de destaque (above the fold) planejado para a primeira dobra da página.

**Independent Test**: Acessar a página inicial. O primeiro item do carrossel deve ser exibido com seu plano de fundo (backdrop), título, nota média (vote_average), sinopse e botão de ação ("Mais Detalhes") carregados dinamicamente a partir dos dados do servidor.

**Acceptance Scenarios**:

1. **Given** que o usuário acessa a página inicial do site, **When** a página é renderizada no servidor, **Then** o sistema consome os dados de tendências do dia, seleciona os 5 primeiros itens e renderiza o primeiro slide em destaque.
2. **Given** a renderização das imagens no carrossel, **When** o primeiro slide é exibido, **Then** a imagem do primeiro slide deve carregar com prioridade (`priority`), enquanto os outros 4 slides subsequentes utilizam carregamento lento (lazy loading) para otimizar o LCP.

---

### User Story 2 - Navegação e Transição Dinâmica (Priority: P2)

Como usuário interessado nas opções em alta, quero que o carrossel avance automaticamente ou que eu possa controlá-lo manualmente usando setas ou indicadores, para explorar os 5 títulos em destaque.

**Why this priority**: Permite a visualização de todas as opções de destaque de forma interativa e dinâmica, sem poluir a interface.

**Independent Test**: Aguardar a transição sem interagir e ver se o carrossel muda de slide a cada 5 segundos. Clicar nas setas e dots para confirmar a alteração imediata de slide.

**Acceptance Scenarios**:

1. **Given** que o usuário está visualizando a página inicial sem interações ativas, **When** passam 5 segundos, **Then** o carrossel transiciona de forma fluida para o próximo slide da sequência.
2. **Given** que o autoplay está ativo, **When** o usuário passa o mouse por cima da área do carrossel (hover), **Then** a transição automática é pausada para que ele possa ler a sinopse ou interagir. A transição deve ser retomada quando o mouse sair do carrossel.
3. **Given** que o usuário deseja navegar manualmente, **When** ele clica nas setas laterais ou nos dots indicadores, **Then** o carrossel exibe o slide selecionado imediatamente e o temporizador de transição é reiniciado.

---

### User Story 3 - Acessibilidade do Carrossel (Priority: P3)

Como usuário que navega utilizando leitores de tela ou apenas o teclado, quero poder focar e controlar o carrossel com facilidade usando as teclas padrão de navegação para ter a mesma experiência de exploração.

**Why this priority**: Crucial para manter a acessibilidade (a11y) do projeto de acordo com as boas práticas especificadas na constituição do projeto.

**Independent Test**: Navegar pelo carrossel usando apenas Tab e Enter e validar que o autoplay é pausado quando o componente recebe foco do teclado, e que todos os elementos interativos possuem labels adequados para leitores de tela.

**Acceptance Scenarios**:

1. **Given** que o usuário está navegando via teclado com a tecla Tab, **When** o foco do teclado entra em um controle do carrossel (setas, dots ou botão de ação), **Then** a rotação automática é pausada imediatamente.
2. **Given** os controles de setas laterais e dots do carrossel, **When** lidos por um software de leitura de tela, **Then** eles devem fornecer descrições claras (`aria-label`) como "Ir para o slide 3 de 5" ou "Próximo slide".

---

### Edge Cases

- **Título sem backdrop_path**: Se um dos 5 títulos mais populares retornados da API do TMDB não contiver imagem de backdrop válida, o sistema deve omitir esse título dos destaques ou exibir uma imagem ou gradiente de fallback escuro de tamanho idêntico, evitando quebras visuais e mantendo os textos legíveis.
- **Sinopses extensas em telas pequenas (Mobile)**: Em telas de dispositivos móveis (< 768px), o texto da sinopse (overview) deve ser limitado a no máximo 3 linhas utilizando `line-clamp-3`, garantindo que os botões de ação ("Mais Detalhes") não sejam empurrados para fora da viewport ou da dobra visível.
- **Erro de carregamento da API**: Caso o endpoint de tendências falhe ou retorne dados incompletos, o carrossel deve renderizar de forma segura (exibindo um aviso amigável, ocultando a área do carrossel ou exibindo um fallback elegante) sem quebrar o restante da renderização da página inicial.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE consumir o endpoint `/trending/all/day` da API do TMDB no lado do servidor (Next.js Server Component) para obter as tendências populares do dia.
- **FR-002**: O sistema DEVE limitar a lista de destaques para no máximo os 5 primeiros resultados (`.slice(0, 5)`) retornados pela API.
- **FR-003**: O sistema DEVE passar os dados de tendências estruturados do servidor para um Client Component específico (ex: `HeroCarousel.tsx`) para gerenciar o estado interativo (slide ativo, autoplay, controles).
- **FR-004**: O sistema DEVE aplicar a propriedade `priority` no componente de imagem (`next/image`) do primeiro slide para garantir a otimização de LCP (Largest Contentful Paint).
- **FR-005**: As imagens dos slides 2 a 5 DEVEM manter o carregamento padrão preguiçoso (lazy loading).
- **FR-006**: O layout do carrossel DEVE ocupar a largura inteira da tela (full width) com uma altura entre 60vh e 80vh.
- **FR-007**: A imagem de fundo de cada slide DEVE possuir um overlay de gradiente (do preto/tema escuro nas bordas/base para transparente no centro/topo) garantindo alto contraste e legibilidade de títulos, avaliações, sinopses e botões.
- **FR-008**: O carrossel DEVE realizar transição automática de slides a cada 5 segundos de forma suave.
- **FR-009**: A transição automática DEVE ser pausada quando o mouse do usuário estiver sobre o carrossel (pause-on-hover) e retomada quando o mouse sair.
- **FR-010**: O carrossel DEVE fornecer setas de navegação lateral (anterior e próximo) e dots/linhas indicadoras da posição atual.
- **FR-011**: Todos os controles de navegação (setas e dots) DEVEM conter propriedades `aria-label` claras e descritivas para leitores de tela.
- **FR-012**: O autoplay DEVE ser pausado imediatamente quando qualquer elemento do carrossel receber o foco do teclado (via Tab).
- **FR-013**: Em dispositivos móveis, a sinopse (overview) DEVE ser truncada para no máximo 3 linhas utilizando a classe `line-clamp-3` do Tailwind.
- **FR-014**: O botão de ação "Mais Detalhes" DEVE redirecionar o usuário para a página de detalhes correspondente do título (`/movie/[id]` ou `/tv/[id]`), dependendo de seu `media_type`.

### Key Entities

- **TrendingItem (Item de Tendência)**: Entidade que representa o filme ou a série retornado pela API do TMDB na lista de mais populares.
  - Atributos principais: `id`, `title` (para filmes) ou `name` (para séries), `overview` (sinopse), `backdrop_path` (caminho da imagem de fundo original), `media_type` (tipo de mídia: `movie` ou `tv`), `vote_average` (avaliação dos usuários).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: O Largest Contentful Paint (LCP) da página inicial contendo o carrossel hero de destaque se mantém abaixo de 2.0 segundos em conexões de banda larga estáveis.
- **SC-002**: 100% dos botões, setas e dots do carrossel são navegáveis sequencialmente via tecla Tab e ativáveis com Enter/Barra de Espaço.
- **SC-003**: 100% das imagens de fundo utilizadas no carrossel utilizam a versão original da imagem de backdrop retornada pelo TMDB para telas maiores ou uma resolução de fallback adequada.
- **SC-004**: No mobile (telas < 768px), o layout do carrossel redimensiona de forma responsiva sem que qualquer botão de ação ou texto seja empurrado para fora da área visível do componente.

## Assumptions

- Presume-se que o endpoint `/trending/all/day` trará dados localizados em português (`pt-BR`) se o token da API e parâmetros forem passados corretamente.
- Presume-se que a maioria dos itens no Top 5 possui imagens backdrop adequadas na API do TMDB, limitando a exibição do fallback a exceções raras.
- Assume-se que o componente ficará posicionado logo abaixo da barra de navegação global (`Navbar`).
