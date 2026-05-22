# Technical Research: Movie & Series Catalog

## 1. TMDB API Integration & Authentication

### Decision
Utilizar o **Read Access Token (Bearer Token)** do TMDB fornecido pelo cabeçalho `Authorization` nas requisições HTTP, armazenado como a variável de ambiente `TMDB_API_ACCESS_TOKEN` no `.env.local`.

### Rationale
O Bearer Token é o método recomendado e mais seguro de autenticação do TMDB, permitindo que a chave de API não seja exposta via parâmetros da URL em requisições HTTP. Para proteger este token, todas as chamadas de API externas serão feitas no lado do servidor:
1. **Server Components:** Chamadas diretas em Next.js Server Components para o Feed de Descoberta e Páginas de Detalhes.
2. **Route Handler (Proxy):** Criar uma rota de API em `/api/search/route.ts` para servir como proxy de pesquisa segura para o cliente, ocultando o token das requisições client-side.

### Alternatives Considered
- *API Key no Client-Side:* Rejeitado por violar o princípio de segurança de não expor credenciais de API no bundle do navegador do cliente.
- *API Key no Server-Side:* Rejeitado porque o Read Access Token é a convenção moderna do TMDB e mais limpa de configurar via cabeçalho.

---

## 2. Busca e Filtros Dinâmicos (Client-Side e Server-Side)

### Decision
1. **Busca:** Input controlado no cliente que atualiza a URL (`?search=termo`) após um debounce de 300ms usando a biblioteca do React ou um hook customizado. A listagem de busca será buscada no Route Handler do servidor.
2. **Filtros:** Navegação por categorias e gêneros atualizando diretamente a URL (`?genre=id` ou `?type=movie|tv`). Isso fará com que o Server Component recarregue e execute a consulta filtrada na API do TMDB em tempo real.

### Rationale
Ao utilizar a URL como fonte da verdade (`searchParams`):
- O estado da aplicação é 100% compartilhável e persistente ao atualizar a página.
- Permite renderização eficiente do lado do servidor para páginas filtradas (melhor SEO).
- O debounce de 300ms evita requisições excessivas (rate limit) na API do TMDB enquanto o usuário digita.

---

## 3. Estrutura de Detalhes e Créditos (Elenco)

### Decision
Utilizar o parâmetro `append_to_response=credits` ao requisitar detalhes do filme ou série (`/movie/{id}` ou `/tv/{id}`) para trazer os dados do título e da equipe/elenco em uma única requisição HTTP.

### Rationale
Reduz pela metade a quantidade de requisições de rede necessárias para renderizar a página de detalhes, melhorando o tempo de carregamento e reduzindo latência.

---

## 4. Otimização de Imagens e Fallbacks

### Decision
1. Utilizar o componente `Image` do Next.js com as resoluções proporcionais recomendadas do TMDB (ex: `w500` para cards e `original` para backdrops grandes).
2. Criar um componente de fallback elegante em Tailwind CSS utilizando gradientes em tema escuro e ícones do Huge Icons para capas/posters que não estiverem disponíveis na API do TMDB.

### Rationale
Evita o download de imagens desnecessariamente grandes em dispositivos móveis (otimização de banda) e previne quebras visuais no grid quando o poster estiver indisponível.
