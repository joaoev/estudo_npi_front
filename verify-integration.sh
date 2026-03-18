#!/bin/bash
# Quick verification script for API integration

echo "🔍 Verificando Integração com API..."
echo ""

# Check if files exist
echo "📁 Verificando arquivos criados..."
files=(
  "src/services/api.ts"
  "src/services/mappers.ts"
  "README_INTEGRATION.md"
  "INTEGRATION_GUIDE.md"
  "IMPLEMENTATION_SUMMARY.md"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ $file"
  else
    echo "❌ $file (não encontrado)"
  fi
done

echo ""
echo "📦 Verificando dependências..."

# Check if axios is installed
if npm ls axios > /dev/null 2>&1; then
  echo "✅ axios instalado"
else
  echo "❌ axios não instalado"
  echo "   Execute: pnpm add axios"
fi

echo ""
echo "🔧 Verificando TypeScript..."

if npm run type-check > /dev/null 2>&1; then
  echo "✅ Nenhum erro de TypeScript"
else
  echo "⚠️ Verifique erros de TypeScript"
fi

echo ""
echo "📝 Resumo da Integração:"
echo "========================"
echo ""
echo "✨ API Base URL: http://localhost:8080"
echo "✨ Frontend: http://localhost:5173"
echo ""
echo "📚 Endpoints implementados:"
echo "  - GET    /produtos"
echo "  - POST   /produtos"
echo "  - PUT    /produtos/:id"
echo "  - DELETE /produtos/:id"
echo "  - GET    /categorias"
echo "  - POST   /categorias"
echo "  - PUT    /categorias/:id"
echo "  - DELETE /categorias/:id"
echo ""
echo "🚀 Para iniciar:"
echo "  1. pnpm dev"
echo "  2. Certifique-se que backend está em http://localhost:8080"
echo "  3. Acesse http://localhost:5173"
echo ""
echo "📚 Documentação disponível em:"
echo "  - README_INTEGRATION.md"
echo "  - INTEGRATION_GUIDE.md"
echo "  - IMPLEMENTATION_SUMMARY.md"
echo "  - SETUP_COMPLETE.md (este arquivo)"
echo ""
echo "✅ Verificação concluída!"
