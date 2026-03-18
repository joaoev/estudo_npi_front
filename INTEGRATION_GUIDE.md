# 🎯 Integração API - Guia Rápido

## ✨ O que foi implementado

### 1️⃣ Cliente HTTP (Axios)
- **Arquivo**: `src/services/api.ts`
- **Recursos**:
  - Configuração centralizada do Axios
  - Serviço para Produtos (CRUD)
  - Serviço para Categorias (CRUD)
  - Tipagem TypeScript completa

### 2️⃣ Mapeadores de Dados
- **Arquivo**: `src/services/mappers.ts`
- **Objetivo**: Converter entre formato da API e UI
- **Funções principais**:
  - API → UI: `mapApiProdutoToUi`, `mapApiProdutosToUi`
  - UI → API: `mapUiProdutoToApi`
  - Categorias: `mapCategoriasToOptions`

### 3️⃣ Composable Integrado
- **Arquivo**: `src/composables/useCatalogCrud.ts` (modificado)
- **Antes**: Dados mockados localmente
- **Depois**: Dados reais da API
- **Novo**: Estado de `loading` e `error`

### 4️⃣ Lógica de Página Atualizada
- **Arquivo**: `src/composables/useCatalogPage.ts` (modificado)
- **Melhorias**:
  - Carrega dados ao montar (`onMounted`)
  - Try/catch em operações
  - Notificações de erro

## 🔌 Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/produtos` | Listar produtos |
| POST | `/produtos` | Criar produto |
| PUT | `/produtos/:id` | Atualizar produto |
| DELETE | `/produtos/:id` | Deletar produto |
| GET | `/categorias` | Listar categorias |
| POST | `/categorias` | Criar categoria |
| PUT | `/categorias/:id` | Atualizar categoria |
| DELETE | `/categorias/:id` | Deletar categoria |

## 📥 Formato de Requisições

### Criar Produto
```json
{
  "nome": "Produto X",
  "descricao": "Descrição",
  "preco": 99.99,
  "categoriasId": [1, 2]
}
```

### Criar Categoria
```json
{
  "nomeCategoria": "Nome da Categoria"
}
```

## 📤 Formato de Respostas

### Produto (GET)
```json
{
  "id": 1,
  "nome": "Produto X",
  "descricao": "Descrição",
  "preco": 99.99,
  "categorias": [
    {
      "id": 1,
      "nomeCategoria": "Eletrônicos"
    }
  ]
}
```

### Categoria (GET)
```json
{
  "id": 1,
  "nomeCategoria": "Eletrônicos"
}
```

## 🚀 Iniciar

### Frontend
```bash
pnpm dev
```

### Backend (certifique-se que está rodando em http://localhost:8080)
```bash
# Execute seu servidor backend
java -jar seu-app.jar
# ou
npm run start
# ou outro comando conforme seu setup
```

## 🧪 Testar API

### Usando o script bash
```bash
bash api-test.sh
```

### Usando curl manualmente
```bash
# Listar produtos
curl http://localhost:8080/produtos

# Criar categoria
curl -X POST http://localhost:8080/categorias \
  -H "Content-Type: application/json" \
  -d '{"nomeCategoria":"Casa"}'
```

## 🐛 Troubleshooting

| Problema | Solução |
|----------|---------|
| CORS error | Configure CORS no backend para aceitar `http://localhost:5173` |
| Connection refused | Verifique se backend está rodando em `http://localhost:8080` |
| 404 Not Found | Verifique se os endpoints estão corretos |
| Dados não atualizam | Verifique console para erros, cache do navegador |

## 📱 Fluxo de Dados

```
┌─────────────────────────────────────────────────────┐
│             CatalogCrudView.vue                     │
│          (Componente principal)                     │
└────────────────────┬────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────┐
│           useCatalogPage.ts                         │
│     (Lógica e estado da página)                     │
└────────────────────┬────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────┐
│          useCatalogCrud.ts                          │
│  (Operações CRUD com API)                           │
└────────────────────┬────────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         ↓                       ↓
┌─────────────────┐  ┌──────────────────┐
│   api.ts        │  │   mappers.ts     │
│  (Axios)        │  │ (Conversão)      │
└────────┬────────┘  └──────────────────┘
         │
         ↓
┌─────────────────────────────────────────────────────┐
│        http://localhost:8080                        │
│     (Backend API)                                   │
└─────────────────────────────────────────────────────┘
```

## 🎨 Features Implementadas

- ✅ Listar produtos com categorias
- ✅ Criar novo produto
- ✅ Atualizar produto existente
- ✅ Deletar produto
- ✅ Criar categoria
- ✅ Atualizar categoria
- ✅ Deletar categoria
- ✅ Validação de formulários
- ✅ Tratamento de erros
- ✅ Notificações (snackbar)
- ✅ Indicadores de carregamento
- ✅ Busca/filtro de produtos e categorias

## 📚 Recursos Adicionais

- [Documentação Axios](https://axios-http.com/)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [TypeScript](https://www.typescriptlang.org/)
- [Vuetify Components](https://vuetifyjs.com/)

## ✅ Próximos Passos (Opcional)

- [ ] Adicionar paginação
- [ ] Implementar filtros avançados
- [ ] Adicionar autenticação
- [ ] Implementar cache local
- [ ] Adicionar testes unitários
- [ ] Melhorar UI/UX
