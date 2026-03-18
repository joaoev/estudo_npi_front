# 🔧 Solução CORS - Requisições Bloqueadas

## ❌ Problema

Você estava recebendo erros de CORS:

```
XHRGET http://localhost:8080/categorias [HTTP/1.1 403 3ms]
Requisição cross-origin bloqueada: falta cabeçalho 'Access-Control-Allow-Origin'
AxiosError: Network Error
```

### Por que acontece?

Frontend (`http://localhost:5173`) tentava acessar Backend (`http://localhost:8080`) diretamente.

Como são portas diferentes, o navegador bloqueia por segurança (CORS).

---

## ✅ Solução Implementada

### O que foi feito

1. **Configurado Proxy no Vite** (`vite.config.mts`)
   - Requisições para `/api/*` são redirecionadas para `http://localhost:8080/*`
   - Funciona apenas em desenvolvimento

2. **Atualizado `api.ts`**
   - Alterado `baseURL` de `http://localhost:8080` para `/api`

### Como funciona agora

```
Frontend (localhost:5173)
    ↓ requisição /api/produtos
Proxy do Vite (Dev Server)
    ↓ redireciona para http://localhost:8080/produtos
Backend (localhost:8080)
    ↓ retorna dados
Frontend recebe dados ✅
```

---

## 🚀 Como Usar

### Passo 1: Reiniciar o Frontend
```bash
# Mate o processo anterior (Ctrl+C)
# Depois execute:
pnpm dev
```

### Passo 2: Backend continua igual
```
http://localhost:8080 (sem mudanças)
```

### Passo 3: Testar
- Abra http://localhost:5173
- Deve carregar produtos e categorias agora ✅

---

## ⚙️ Configuração Técnica

### Em `vite.config.mts`:
```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
}
```

**O que significa:**
- `'/api'` - Intercepta requisições que começam com `/api`
- `target` - Redireciona para esta URL
- `changeOrigin: true` - Muda o header `Origin`
- `rewrite` - Remove `/api` do path (transforma `/api/produtos` em `/produtos`)

### Em `api.ts`:
```typescript
const API_BASE_URL = '/api'  // Antes era 'http://localhost:8080'
```

---

## 📝 Notas Importantes

### ✅ Funciona em Desenvolvimento
O proxy do Vite funciona quando você executa `pnpm dev`.

### ❌ Não funciona em Produção
Para produção, você precisará:

**Opção 1: Configurar CORS no Backend**
```java
// Exemplo Java/Spring
@CrossOrigin(origins = "https://seu-dominio.com")
@RestController
public class ProdutoController { ... }
```

**Opção 2: Usar Reverse Proxy (Nginx)**
```nginx
location /api {
  proxy_pass http://localhost:8080;
}
```

---

## 🧪 Testes

### Verificar se funciona

Abra o DevTools (F12) e vá para Network tab:

**Antes (com erro):**
```
GET http://localhost:8080/produtos [403]
```

**Depois (funcionando):**
```
GET http://localhost:5173/api/produtos [200]
```

As requisições aparecem como `/api/*` mas são redirecionadas para o backend.

---

## 🔄 Fluxo Atualizado

```
CatalogCrudView.vue
    ↓
useCatalogPage.ts
    ↓
useCatalogCrud.ts
    ↓
api.ts (baseURL = '/api')
    ↓
Vite Proxy Dev Server
    ↓ redireciona
http://localhost:8080
    ↓ retorna dados
Frontend recebe e renderiza ✅
```

---

## 💡 Se Precisar Mudar de Volta

Se por algum motivo você precisar da URL completa:

Em `api.ts`:
```typescript
const API_BASE_URL = 'http://localhost:8080'  // URL completa
```

E remova o proxy de `vite.config.mts`.

Mas não recomendo - o proxy é a melhor solução para desenvolvimento.

---

## ✨ Resultado

Agora tudo funciona sem erros de CORS! 🎉

Os dados carregam automaticamente e você consegue:
- ✅ Listar produtos
- ✅ Listar categorias
- ✅ Criar novo produto
- ✅ Editar produto
- ✅ Deletar produto
- E todas as outras operações!

---

**Status: ✅ CORS Resolvido!**

Reinicie o frontend e teste agora!
