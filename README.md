# 📚 Autoestudo - Vue e Vuetify

Um projeto simples para aprender conceitos fundamentais do **Vue 3** e **Vuetify**, incluindo integração com API REST, gerenciamento de estado e componentes reutilizáveis.

## 📖 Sobre o Projeto

Este é um projeto educacional que demonstra:
- ✅ Componentes Vue 3 com Composition API
- ✅ Integração com API REST (CRUD completo)
- ✅ Formulários com validação
- ✅ Tabelas de dados interativas
- ✅ Diálogos modais
- ✅ Tratamento de erros
- ✅ Notificações de feedback

## 🔗 Documentação Útil

- **Vue 3**: https://vuejs.org/
- **Vuetify**: https://vuetifyjs.com/
- **Vite**: https://vitejs.dev/
- **TypeScript**: https://www.typescriptlang.org/
- **Axios**: https://axios-http.com/

## 🧱 Stack Tecnológico

| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| **Vue** | 3 | Framework JavaScript progressivo |
| **Vite** | 5+ | Build tool e dev server |
| **Vuetify** | 3 | UI Component Library |
| **TypeScript** | 5+ | Tipagem estática |
| **Axios** | 1+ | Cliente HTTP |
| **pnpm** | 8+ | Package manager (mais rápido que npm) |

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

### 1. **Node.js** (v18 ou superior)
```bash
# Verificar instalação
node --version

# Baixar em: https://nodejs.org/
```

### 2. **pnpm** (Package Manager)
```bash
# Instalar globalmente via npm
npm install -g pnpm

# Verificar instalação
pnpm --version

# Ou usar corepack (recomendado)
corepack enable
```

### 3. **Git** (opcional, mas recomendado)
```bash
git --version
```

### 4. **Editor de Código** (recomendado)
- [Visual Studio Code](https://code.visualstudio.com/)
- Extensões recomendadas:
  - Volar (Vue Language Features)
  - TypeScript Vue Plugin
  - Vuetify Tools
  - ESLint
  - Prettier

## 🧭 Start Here

- Main entry: `src/main.ts`
- Main app component: `src/App.vue`
- Main styles: `src/styles/`
- Plugin setup: `src/plugins/`

## 📁 Estrutura do Projeto

```
estudo_npi_front/
├── src/
│   ├── main.ts                          # Ponto de entrada
│   ├── App.vue                          # Componente raiz
│   ├── components/
│   │   ├── Table.vue                    # Tabela genérica
│   │   └── catalog/
│   │       ├── CatalogCrudView.vue      # Componente principal
│   │       └── dialogs/
│   │           ├── ProductDialog.vue    # Diálogo de produto
│   │           ├── CategoryDialog.vue   # Diálogo de categoria
│   │           └── ConfirmDeleteDialog.vue
│   ├── composables/
│   │   ├── useCatalogCrud.ts           # Lógica CRUD
│   │   └── useCatalogPage.ts           # Lógica de página
│   ├── services/
│   │   ├── api.ts                      # Cliente HTTP com Axios
│   │   └── mappers.ts                  # Conversão de dados API ↔ UI
│   ├── plugins/
│   │   ├── index.ts                    # Registro de plugins
│   │   ├── vuetify.ts                  # Configuração Vuetify
│   │   └── i18n.ts                     # Internacionalização
│   ├── router/
│   │   └── index.ts                    # Configuração de rotas
│   ├── stores/
│   │   └── app.ts                      # Estado global (Pinia)
│   ├── styles/
│   │   ├── main.scss                   # Estilos globais
│   │   └── tailwind.css                # Configuração Tailwind
│   ├── pages/
│   │   └── index.vue                   # Página inicial
│   └── assets/
│       └── logo.svg
├── public/
│   └── favicon.ico
├── vite.config.mts                     # Configuração Vite + Proxy API
├── tsconfig.json                       # Configuração TypeScript
├── eslint.config.js                    # Configuração ESLint
├── pnpm-lock.yaml                      # Lock file do pnpm
├── package.json
└── README.md
```

### Arquivos Principais

- **`src/main.ts`** — Ponto de entrada da aplicação
- **`src/App.vue`** — Componente raiz
- **`src/components/`** — Componentes Vue reutilizáveis
- **`src/composables/`** — Lógica compartilhada (Composition API)
- **`src/services/`** — Serviços HTTP e mapeadores de dados
- **`src/plugins/`** — Configuração de plugins (Vuetify, i18n, etc)
- **`src/styles/`** — Estilos globais e tema
- **`public/`** — Arquivos estáticos

## ✨ Enabled Features

- ESLint
- Pinia
- Vue I18n
- Vue Router
- Tailwind CSS

## 💿 Instalação

### Passo 1: Clonar o Repositório (se aplicável)
```bash
git clone <seu-repositorio>
cd estudo_npi_front
```

### Passo 2: Instalar Dependências
```bash
# Usando pnpm (recomendado)
pnpm install

# Ou usando npm
npm install

# Ou usando yarn
yarn install
```

### Passo 3: Configurar Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto:
```env
VITE_API_URL=http://localhost:8080
```

## 🚀 Início Rápido

### Desenvolvimento Local
```bash
# Iniciar servidor de desenvolvimento
pnpm dev

# O aplicativo estará disponível em http://localhost:5173
```

### API Backend (Necessária)
Este projeto requer uma API REST rodando em `http://localhost:8080`:

```bash
# Se você tiver um servidor backend, inicie-o em porta 8080
# Exemplo com Node/Express, Spring Boot, etc.

# A configuração do proxy está em vite.config.mts
```

### Endpoints da API Esperados
```
GET  /categorias           - Listar categorias
POST /categorias           - Criar categoria
PUT  /categorias/:id       - Atualizar categoria
DELETE /categorias/:id     - Deletar categoria

GET  /produtos             - Listar produtos
POST /produtos             - Criar produto
PUT  /produtos/:id         - Atualizar produto
DELETE /produtos/:id       - Deletar produto
```

## 🏗️ Build

```bash
pnpm build
```

## 🧪 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev                  # Inicia servidor de desenvolvimento
pnpm dev --host          # Acessível em rede local

# Build
pnpm build               # Build otimizado para produção
pnpm build-only          # Build sem type-check
pnpm preview             # Visualizar build localmente

# Qualidade de Código
pnpm type-check          # Verificar tipos TypeScript
pnpm lint                # Executar ESLint
pnpm lint:fix            # Corrigir problemas de lint automaticamente
```

## 📚 Conceitos Aprendidos

Este projeto demonstra:

### Vue 3 & Composition API
- ✅ Componentes funcionais com `<script setup>`
- ✅ Reatividade com `ref` e `computed`
- ✅ Ciclo de vida com `onMounted`, `onUnmounted`
- ✅ Composables reutilizáveis

### Integração com API
- ✅ Cliente HTTP com Axios
- ✅ Proxy de API em dev (Vite)
- ✅ Mapeamento de dados (DTO pattern)
- ✅ Tratamento de erros

### Componentes Vuetify
- ✅ Data Table (v-data-table)
- ✅ Formulários (v-text-field, v-select, v-textarea)
- ✅ Diálogos (v-dialog)
- ✅ Notificações (v-snackbar)
- ✅ Chips e Buttons com cores

### Validação de Formulários
- ✅ Validação reativa
- ✅ Mensagens de erro customizadas
- ✅ Habilitação/desabilitação de botões

## 🐛 Troubleshooting

### Erro de CORS
Se receber erro de CORS, verifique:
1. O servidor backend está rodando em `http://localhost:8080`
2. O proxy está configurado em `vite.config.mts`
3. Verifique a seção de desenvolvimento

### Porta 5173 já em uso
```bash
# Usar porta diferente
pnpm dev -- --port 3000
```

### Problemas de dependências
```bash
# Limpar cache e reinstalar
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## 🤝 Contribuições

Este é um projeto educacional. Sinta-se livre para:
- Adicionar novos recursos
- Melhorar a documentação
- Corrigir bugs
- Sugerir otimizações

## 📄 Licença

Projeto aberto para fins educacionais.

## 🙌 Créditos

- **Vue**: https://vuejs.org/
- **Vuetify**: https://vuetifyjs.com/
- **Vite**: https://vitejs.dev/
- Comunidade open source
