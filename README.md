# Universo TOTVS 2026 – Demo PO UI (com MCP)

Aplicação Angular de demonstração com um cadastro simples de **clientes** feito com [PO UI](https://po-ui.io), a biblioteca de componentes Angular da TOTVS.

## Contexto

Este projeto faz parte de uma apresentação sobre PO UI no **Universo TOTVS 2026**. Ele é uma de duas versões de um app de exemplo:

- **Este repositório (com MCP):** versão desenvolvida com apoio de um servidor MCP (Model Context Protocol) integrado ao editor.
- **Repositório irmão (sem MCP):** [universo-totvs-2026-without-mcp](https://github.com/pedrodominguesp/universo-totvs-2026-without-mcp), com um cadastro de funcionários feito sem esse apoio.

A ideia é comparar o código das duas versões.

## Funcionalidades

O layout principal (`src/app/app.html`) usa `po-toolbar` (título "Universo TOTVS 2026") e `po-menu` (item "Home", que hoje só exibe um `alert`).

| Rota | Componente | Descrição |
| --- | --- | --- |
| `/` | — | Redireciona para `/customers` |
| `/customers` | `CustomersTableComponent` | Listagem de clientes |
| `/customers/new` | `CustomerFormComponent` | Formulário de novo cliente |

As duas rotas usam lazy loading (`loadComponent`).

### Listagem de clientes (`customers-table`)

- `po-page-default` com a ação "Novo Cliente", que navega para `/customers/new`.
- `po-table` alimentada por `p-service-api` (`https://po-sample-api.onrender.com/v1/people`), com ordenação, linhas zebradas, seleção de linhas, "Carregar mais", busca e gerenciador de colunas.
- Busca em linguagem natural com IA (`p-search-ai-field`), usando o endpoint `https://po-sample-api.onrender.com/v1/ai/filter`, filtro aplicado no servidor, confiança mínima de 0.6 e timeout de 15 s. Os eventos de resultado, baixa confiança e erro são registrados no console.
- Colunas: Código, Nome, E-mail, Cidade e Status. O status aparece como tag (`type: 'label'`) com os valores Ativo, Inativo, Pendente e Bloqueado.

### Novo cliente (`customer-form`)

- `po-page-edit` com breadcrumb (Clientes > Novo Cliente) e as ações Salvar, Salvar e Novo e Cancelar.
- Campos: Código (`po-input` desabilitado, "gerado automaticamente"), Nome (`po-input`, obrigatório, 3 a 100 caracteres), E-mail (`po-email`, obrigatório), Cidade (`po-input`, obrigatório) e Status (`po-switch`, Ativo/Inativo).
- O salvamento é simulado: o payload vai para o console e uma notificação de sucesso é exibida com `PoNotificationService`. Não existe chamada real de API para gravar.

## Tecnologias

Versões resolvidas no `package-lock.json`:

- Angular 21.2 (`@angular/core` 21.2.21, `@angular/cli` 21.2.22), componentes standalone
- PO UI: `@po-ui/ng-components` 21.30.0 e tema `@po-ui/style` 21.30.0 (`po-theme-default.min.css`)
- TypeScript 5.9.3
- RxJS 7.8.2 e Zone.js 0.15.1
- Testes unitários com Vitest 4.1.11 e jsdom (builder `@angular/build:unit-test`)
- Prettier 3

## Pré-requisitos

- Node.js `^20.19.0`, `^22.12.0` ou `>=24.0.0` (exigido pelo Angular 21)
- npm (o `package.json` declara `packageManager: npm@12.0.2`)
- Acesso à internet: a tabela e a busca por IA consomem a API pública `po-sample-api.onrender.com`

## Como instalar e rodar

```bash
npm install
npm start          # ng serve, em http://localhost:4200/
```

Outros scripts:

```bash
npm run build      # ng build (configuração de produção, saída em dist/)
npm run watch      # ng build --watch --configuration development
npm test           # ng test (Vitest)
```

## Estrutura de pastas

```text
.
├── .vscode/
│   ├── mcp.json              # servidor MCP do Angular CLI
│   ├── launch.json           # depuração de ng serve / ng test
│   ├── tasks.json
│   └── extensions.json
├── public/                   # favicon
├── src/
│   ├── index.html
│   ├── main.ts
│   ├── styles.css
│   └── app/
│       ├── app.ts / app.html # layout com po-toolbar e po-menu
│       ├── app.config.ts     # router, HttpClient, PoHttpRequestModule, animações
│       ├── app.routes.ts
│       ├── app.spec.ts
│       ├── customers-table/  # listagem de clientes
│       └── customer-form/    # formulário de novo cliente
├── angular.json
└── package.json
```

## Configuração do MCP

O arquivo `.vscode/mcp.json` registra um servidor MCP para o VS Code:

```jsonc
{
  "servers": {
    "angular-cli": {
      "command": "npx",
      "args": ["-y", "@angular/cli", "mcp"]
    }
  }
}
```

Ou seja, o servidor configurado é o **MCP do Angular CLI** (`ng mcp`), iniciado via `npx`. Não há configuração de um servidor MCP específico do PO UI neste repositório, e nenhuma chave ou token é necessário. Mais detalhes em [angular.dev/ai/mcp](https://angular.dev/ai/mcp).

Para usar, abra o projeto no VS Code com um assistente compatível com MCP (por exemplo, o modo agente do GitHub Copilot). O editor lê o `.vscode/mcp.json` e inicia o servidor.
