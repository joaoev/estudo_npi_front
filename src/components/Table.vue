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
    { title: 'Descricao', key: 'descricao' },
    { title: 'Preco', key: 'preco' },
    { title: 'Status', key: 'status' },
    { title: 'Acoes', key: 'acoes' },
  ]

  const items: Product[] = [
    {
      id: '1',
      nome: 'Produto 1',
      descricao: 'Descricao do Produto 1',
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
