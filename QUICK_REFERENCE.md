# 🎯 Referência Rápida - Integração API

## Em 30 segundos

```bash
# 1. Backend está rodando em http://localhost:8080
# 2. Frontend
pnpm dev
# 3. Acesse http://localhost:5173
```

## O que foi feito

| Item | Arquivo | Status |
|------|---------|--------|
| Cliente HTTP | `src/services/api.ts` | ✅ |
| Mappers | `src/services/mappers.ts` | ✅ |
| CRUD Composable | `src/composables/useCatalogCrud.ts` | ✅ |
| Page Logic | `src/composables/useCatalogPage.ts` | ✅ |
| Dependência | `axios@^1.13.6` | ✅ |

## Endpoints (8 total)

```
GET    /produtos              POST   /categorias
POST   /produtos              PUT    /categorias/:id
PUT    /produtos/:id          DELETE /categorias/:id
DELETE /produtos/:id          GET    /categorias
```

## Como testar

1. **Na UI**: Clique em "Novo produto" → Preencha → Salvar
2. **Via curl**:
   ```bash
   curl http://localhost:8080/produtos
   ```
3. **Via script**:
   ```bash
   bash api-test.sh
   ```

## Troubleshooting

- **Sem dados?** → Backend rodando em `:8080`?
- **CORS Error?** → Configure CORS no backend
- **404?** → Endpoints corretos?

## Documentação

- `00-START-HERE.md` - Overview
- `README_INTEGRATION.md` - Detalhes
- `INTEGRATION_GUIDE.md` - Exemplos
- `QUICK_START.txt` - Este arquivo

## Status

✅ **PRONTO PARA USAR** - Sem erros de compilação
