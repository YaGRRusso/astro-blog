# Astro Rick and Morty Blog

Este é um projeto de estudo desenvolvido com o framework Astro, que consome a API do Rick and Morty para exibir informações sobre os personagens em um formato de blog. O projeto foi criado para explorar as funcionalidades do Astro, como renderização no lado do servidor (SSR), internacionalização (i18n), e o uso de componentes React dentro de um projeto Astro.

## ✨ Principais Recursos

- **Framework Astro:** Utilização do Astro para uma performance otimizada, com renderização estática e no lado do servidor.
- **Componentes React:** Integração de componentes React para interatividade no lado do cliente.
- **Internacionalização (i18n):** Suporte para múltiplos idiomas (inglês e português) com o sistema de roteamento do Astro.
- **API do Rick and Morty:** Consumo de uma API pública para exibir dados de personagens.
- **Tailwind CSS:** Estilização moderna e responsiva com Tailwind CSS.
- **TypeScript:** Código tipado para maior segurança e manutenibilidade.

## 🚀 Estrutura do Projeto

A estrutura de pastas do projeto segue as convenções do Astro, com algumas adições para organizar melhor o código:

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── characters/
│   │   ├── commons/
│   │   └── layout/
│   ├── layouts/
│   ├── pages/
│   │   ├── [lang]/
│   │   │   ├── character/
│   │   │   └── index.astro
│   │   └── index.astro
│   ├── providers/
│   ├── stores/
│   ├── styles/
│   └── utils/
├── messages/
│   ├── en.json
│   └── pt.json
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

### Descrição das Pastas

| Pasta             | Descrição                                                                                           |
| :---------------- | :-------------------------------------------------------------------------------------------------- |
| `public/`         | Contém arquivos estáticos que não precisam ser processados pelo build, como o `favicon.svg`.        |
| `src/assets/`     | Para armazenar arquivos como imagens e fontes.                                                      |
| `src/components/` | Componentes reutilizáveis da aplicação, divididos por funcionalidade (personagens, comuns, layout). |
| `src/layouts/`    | Layouts base para as páginas, como o `Layout.astro` que define a estrutura HTML principal.          |
| `src/pages/`      | Onde as rotas da aplicação são definidas. Cada arquivo `.astro` corresponde a uma página.           |
| `src/providers/`  | Provedores de contexto, como o `QueryProvider` para o React Query.                                  |
| `src/stores/`     | Lógica de estado global com Nano Stores.                                                            |
| `src/styles/`     | Arquivos de estilo globais.                                                                         |
| `src/utils/`      | Funções utilitárias, como `i18n.ts` para internacionalização.                                       |
| `messages/`       | Arquivos de tradução para os idiomas suportados.                                                    |

## 🛠️ Instalação e Configuração

Para executar o projeto localmente, siga os passos abaixo:

1. **Clone o repositório:**

   ```sh
   git clone https://github.com/seu-usuario/astro-blog.git
   cd astro-blog
   ```

2. **Instale as dependências:**

   ```sh
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

   ```
   PUBLIC_SITE_URL=http://localhost:4321
   PUBLIC_BASE_URL=/
   ```

4. **Execute o servidor de desenvolvimento:**
   ```sh
   npm run dev
   ```
   O site estará disponível em `http://localhost:4321`.

## 🧞 Comandos

| Comando             | Ação                                                |
| :------------------ | :-------------------------------------------------- |
| `npm run dev`       | Inicia o servidor de desenvolvimento local.         |
| `npm run build`     | Compila o projeto para produção na pasta `./dist/`. |
| `npm run preview`   | Visualiza a build de produção localmente.           |
| `npm run astro ...` | Executa comandos da CLI do Astro.                   |

## 🔧 Particularidades do Desenvolvimento com Astro

Este projeto serve como um bom exemplo de como utilizar o Astro com outras tecnologias. Aqui estão alguns pontos importantes:

- **Ilhas de Hidratação:** O Astro permite que você "hidrate" componentes interativos (como os de React) apenas quando necessário, mantendo o resto do site estático e rápido. Isso é feito com diretivas como `client:load`, `client:idle` ou `client:visible`.
- **Roteamento Baseado em Arquivos:** A estrutura da pasta `src/pages` define as rotas do seu site. O Astro gera automaticamente as rotas com base nos arquivos `.astro` ou `.md`.
- **Internacionalização:** O `astro.config.mjs` está configurado para suportar i18n, com rotas prefixadas pelo idioma (ex: `/en/` e `/pt/`). As traduções são gerenciadas nos arquivos `messages/*.json`.
- **Componentes `.astro` vs `.tsx`:**
  - **`.astro`:** São usados para criar páginas e layouts. Eles podem buscar dados e renderizar no servidor, e não enviam JavaScript para o cliente por padrão.
  - **`.tsx`:** São componentes React que podem ser renderizados no servidor e/ou hidratados no cliente para interatividade.

## 🤝 Contribuição

Contribuições são bem-vindas! Se você encontrar um bug ou tiver uma sugestão de melhoria, sinta-se à vontade para abrir uma issue ou um pull request.

1. Faça um fork do projeto.
2. Crie uma nova branch (`git checkout -b feature/nova-feature`).
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`).
4. Faça push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
