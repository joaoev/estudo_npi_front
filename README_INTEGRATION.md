# Integração com API REST

## 📋 Resumo da Implementação

A aplicação foi integrada com uma API REST localizada em `http://localhost:8080` para gerenciar produtos e categorias.

## 🔧 Arquivos Criados/Modificados

### 1. **src/services/api.ts** (Novo)
Cliente HTTP usando Axios para comunicação com a API.

**Endpoints:**
- `GET /produtos` - Listar todos os produtos
- `POST /produtos` - Criar novo produto
- `PUT /produtos/:id` - Atualizar produto
- `DELETE /produtos/:id` - Deletar produto
- `GET /categorias` - Listar categorias
- `POST /categorias` - Criar categoria
- `PUT /categorias/:id` - Atualizar categoria
- `DELETE /categorias/:id` - Deletar categoria

### 2. **src/services/mappers.ts** (Novo)
Mapeia dados entre o formato da API e o formato da UI.

**Funções:**
- `mapApiProdutoToUi()` - Converte um produto da API
- `mapApiProdutosToUi()` - Converte lista de produtos
- `mapCategoriasToOptions()` - Converte categorias para opções de select
- `mapUiProdutoToApi()` - Converte produto UI para payload da API

### 3. **src/composables/useCatalogCrud.ts** (Modificado)
Integrado com os serviços da API. Agora:
- ✅ Carrega produtos e categorias da API
- ✅ Cria, atualiza e deleta produtos e categorias
- ✅ Trata erros com mensagens descritivas
- ✅ Expõe `loading` e `error` para feedback do usuário
- ✅ Fornece `categoryOptions` para o select de categorias

### 4. **src/composables/useCatalogPage.ts** (Modificado)
- ✅ Carrega dados ao montar (`onMounted`)
- ✅ Usa `categoryOptions` da API
- ✅ Trata erros com try/catch nas operações CRUD

### 5. **src/components/catalog/CatalogCrudView.vue** (Pequena atualização)
- Descrição atualizada para refletir integração com API

## 📦 Dependências Adicionadas

```bash
pnpm add axios
```

## 🚀 Como Usar

### Iniciar a Aplicação
```bash
pnpm dev
```

### Certifique-se que a API está rodando
```
API Base URL: http://localhost:8080
```

## 📊 Fluxo de Dados

```
Component (CatalogCrudView.vue)
        ↓
useCatalogPage.ts (Lógica de página)
        ↓
useCatalogCrud.ts (Composable com integração)
        ↓
api.ts (Cliente HTTP com Axios)
        ↓
API Backend (http://localhost:8080)
```

## 🔄 Ciclo de Vida

1. **Ao montar** (`onMounted`):
   - `loadAll()` carrega categorias e produtos da API
   - `categoryOptions` é atualizado para o select

2. **Criar/Atualizar/Deletar**:
   - Chamadas assíncronas à API
   - Recarrega lista após sucesso
   - Exibe mensagem de sucesso/erro

3. **Tratamento de Erros**:
   - Erros da API são capturados
   - Mensagens exibidas no snackbar (notificação)
   - Console log dos erros para debug

## 📝 Exemplo de Payload

### POST /produtos
```json
{
  "nome": "Fone Bluetooth",
  "descricao": "Fone sem fio com cancelamento de ruido",
  "preco": 299.9,
  "categoriasId": [1]
}
```

### POST /categorias
```json
{
  "nomeCategoria": "Eletronicos"
}
```

## ⚠️ Observações Importantes

1. **Mapeamento de Categorias**: A API retorna produtos com array de categorias `categorias[{ id, nomeCategoria }]`, mas a UI usa um único `categoriaId`. O mapeador pega a primeira categoria como padrão.

2. **Campos Faltantes**: A API não retorna campos como `estoque` e `ativo` nos produtos. O mapeador define valores padrão:
   - `estoque: 0`
   - `ativo: true`

3. **Error Handling**: Todos os erros da API são capturados e exibidos no snackbar.

4. **Estado Global**: O estado é gerenciado no composable `useCatalogCrud`, compartilhado por toda a aplicação.

## 🔍 Debug

Para verificar requisições HTTP, use:
- **DevTools do navegador** → Aba Network
- **Console** → Logs de erro

Os erros também são logados no console com `console.error()`.

## ✅ Checklist de Funcionamento

- [x] Listar produtos da API
- [x] Listar categorias da API
- [x] Criar produto
- [x] Atualizar produto
- [x] Deletar produto
- [x] Criar categoria
- [x] Atualizar categoria
- [x] Deletar categoria
- [x] Tratamento de erros
- [x] Validação de formulários
- [x] Feedback ao usuário (snackbar)
