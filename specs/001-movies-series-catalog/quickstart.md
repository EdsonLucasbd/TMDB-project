# Quickstart: Movie & Series Catalog

Este guia detalha o processo de configuração e inicialização do projeto localmente.

## 1. Pré-requisitos
- Node.js 18+ ou superior.
- Uma conta ativa no [The Movie Database (TMDB)](https://www.themoviedb.org/).
- Um **Read Access Token** da API do TMDB.
  - Para obter: Acesse suas configurações de conta no TMDB, vá na aba "API", e crie uma chave de acesso. Copie o "Token de Acesso de Leitura" (Bearer Token longo).

## 2. Instalação das Dependências

No terminal da raiz do projeto, instale as dependências executando:

```bash
npm install
```

## 3. Configuração de Variáveis de Ambiente

Crie o arquivo `.env.local` na raiz do projeto (este arquivo é ignorado pelo Git automaticamente):

```bash
cp .env.example .env.local
```

Abra o arquivo `.env.local` e preencha com o seu token:

```env
TMDB_API_ACCESS_TOKEN=seu_bearer_token_do_tmdb_aqui
```

## 4. Executando o Servidor de Desenvolvimento

Inicie o servidor localmente com suporte ao Turbopack:

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

## 5. Build de Produção e Validação

Para validar as tipagens e gerar a build de produção otimizada:

```bash
npm run build
```

E para rodar o linting do código:

```bash
npm run lint
```
