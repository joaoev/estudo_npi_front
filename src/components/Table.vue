<script setup lang="ts">
  type Product = {
    id: string
    nome: string
    descricao: string
    preco: string
    status: 'Disponivel' | 'Indisponivel'
    acoes: string
  }

  const headers = [
    { title: 'ID', key: 'id' },
    { title: 'Nome', key: 'nome' },
    { title: 'Descrição', key: 'descricao' },
    { title: 'Preço', key: 'preco' },
    { title: 'Status', key: 'status' },
    { title: 'Ações', key: 'acoes' },
  ]

  const items: Product[] = [
    {
      id: '1',
      nome: 'Produto 1',
      descricao: 'Descrição do Produto 1',
      preco: 'R$ 10,00',
      status: 'Disponivel',
      acoes: 'Editar | Excluir',
    },
  ]
</script>

<template>
  <v-card>
    <v-data-table :headers="headers" :items="items" show-select />
  </v-card>
</template>
