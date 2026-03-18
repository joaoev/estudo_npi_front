#!/bin/bash

# API_URL=http://localhost:8080

# ============ CATEGORIAS ============

# GET - Listar todas as categorias
echo "=== GET /categorias ==="
curl -X GET http://localhost:8080/categorias \
  -H "Content-Type: application/json"

echo -e "\n\n"

# POST - Criar categoria
echo "=== POST /categorias ==="
curl -X POST http://localhost:8080/categorias \
  -H "Content-Type: application/json" \
  -d '{
    "nomeCategoria": "Eletrônicos"
  }'

echo -e "\n\n"

# PUT - Atualizar categoria (ajuste o ID conforme necessário)
echo "=== PUT /categorias/1 ==="
curl -X PUT http://localhost:8080/categorias/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nomeCategoria": "Eletrônicos e Acessórios"
  }'

echo -e "\n\n"

# DELETE - Deletar categoria (ajuste o ID conforme necessário)
echo "=== DELETE /categorias/1 ==="
curl -X DELETE http://localhost:8080/categorias/1 \
  -H "Content-Type: application/json"

echo -e "\n\n"

# ============ PRODUTOS ============

# GET - Listar todos os produtos
echo "=== GET /produtos ==="
curl -X GET http://localhost:8080/produtos \
  -H "Content-Type: application/json"

echo -e "\n\n"

# POST - Criar produto
echo "=== POST /produtos ==="
curl -X POST http://localhost:8080/produtos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Fone Bluetooth",
    "descricao": "Fone sem fio com cancelamento de ruído",
    "preco": 299.90,
    "categoriasId": [1]
  }'

echo -e "\n\n"

# PUT - Atualizar produto (ajuste o ID conforme necessário)
echo "=== PUT /produtos/1 ==="
curl -X PUT http://localhost:8080/produtos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Fone Bluetooth Premium",
    "descricao": "Fone sem fio com cancelamento de ruído avançado",
    "preco": 349.90,
    "categoriasId": [1]
  }'

echo -e "\n\n"

# DELETE - Deletar produto (ajuste o ID conforme necessário)
echo "=== DELETE /produtos/1 ==="
curl -X DELETE http://localhost:8080/produtos/1 \
  -H "Content-Type: application/json"

echo -e "\n"
