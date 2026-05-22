# Quickstart: Hero Carousel (Top 5 Trending)

## Configuração de Dependências

Para esta funcionalidade, precisamos do componente Carousel do shadcn/ui e do plugin oficial de Autoplay do Embla Carousel.

### 1. Adicionar Componente Carousel do shadcn/ui

Execute o comando abaixo na raiz do projeto para adicionar o componente Carousel (isso instalará automaticamente o `embla-carousel-react`):

```bash
npx shadcn@latest add carousel
```

### 2. Instalar o Plugin Autoplay do Embla Carousel

Instale o pacote `embla-carousel-autoplay` que será utilizado para gerenciar as transições automáticas a cada 5 segundos:

```bash
npm install embla-carousel-autoplay
```

---

## Executando o Servidor de Desenvolvimento

Para rodar a aplicação localmente e verificar as alterações em tempo real:

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador. O carrossel hero será renderizado no topo da página inicial.

---

## Verificação Manual

1. **Autoplay**: Abra a página inicial e verifique se os slides mudam de forma autônoma a cada 5 segundos.
2. **Pause on Hover**: Passe o mouse sobre o carrossel e verifique se a rotação é interrompida. Tire o mouse e certifique-se de que a rotação retoma.
3. **Navegação**: Clique nas setas esquerda/direita ou nos dots indicadores na parte inferior e valide se o slide correspondente é carregado.
4. **Responsividade**: Redimensione a tela para largura de celular (< 768px) e verifique se a sinopse do filme é truncada para 3 linhas e se as imagens se adaptam.
5. **Navegação por Teclado**: Use a tecla Tab para navegar até os controles do carrossel. Verifique se o foco visual é nítido e se a transição para se houver foco de teclado. Pressione Enter para ativar botões de navegação.
