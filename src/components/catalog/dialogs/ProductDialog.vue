<template>
  <v-dialog max-width="720" :model-value="modelValue" @update:model-value="onUpdateDialog">
    <v-card>
      <v-card-title>{{ isEditing ? 'Editar produto' : 'Novo produto' }}</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="8">
            <v-text-field
              :error-messages="errors.nome"
              label="Nome"
              :model-value="nome"
              variant="outlined"
              @update:model-value="onUpdateNome"
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              :error-messages="errors.categoriaId"
              item-title="title"
              item-value="value"
              :items="categoryOptions"
              label="Categoria"
              :model-value="categoriaId"
              variant="outlined"
              @update:model-value="onUpdateCategoriaId"
            />
          </v-col>
          <v-col cols="12">
            <v-textarea
              :error-messages="errors.descricao"
              label="Descrição"
              :model-value="descricao"
              rows="3"
              variant="outlined"
              @update:model-value="onUpdateDescricao"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              :error-messages="errors.preco"
              label="Preço"
              min="0"
              :model-value="preco"
              prefix="R$"
              step="0.01"
              type="number"
              variant="outlined"
              @update:model-value="onUpdatePreco"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="emit('update:modelValue', false)">Cancelar</v-btn>
        <v-btn color="primary" :disabled="!isValid" @click="emit('save')">
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  type CategoryOption = {
    title: string
    value: number
  }

  defineProps<{
    modelValue: boolean
    isEditing: boolean
    nome: string
    descricao: string
    preco: number
    categoriaId: number
    categoryOptions: CategoryOption[]
    errors: {
      nome: string[]
      descricao: string[]
      categoriaId: string[]
      preco: string[]
    }
    isValid: boolean
  }>()

  const emit = defineEmits<{
    'update:modelValue': [value: boolean]
    'update:nome': [value: string]
    'update:descricao': [value: string]
    'update:preco': [value: number]
    'update:categoriaId': [value: number]
    'save': []
  }>()

  function onUpdateDialog (value: boolean) {
    emit('update:modelValue', value)
  }

  function onUpdateNome (value: string | null) {
    emit('update:nome', value ?? '')
  }

  function onUpdateDescricao (value: string | null) {
    emit('update:descricao', value ?? '')
  }

  function onUpdatePreco (value: string | number | null) {
    emit('update:preco', Number(value ?? 0))
  }

  function onUpdateCategoriaId (value: string | number | null) {
    emit('update:categoriaId', Number(value ?? 0))
  }
</script>
