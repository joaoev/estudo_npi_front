<template>
  <v-dialog max-width="640" :model-value="modelValue" @update:model-value="onUpdateDialog">
    <v-card>
      <v-card-title>{{ isEditing ? 'Editar categoria' : 'Nova categoria' }}</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field
              :error-messages="errors.nome"
              label="Nome"
              :model-value="nome"
              variant="outlined"
              @update:model-value="onUpdateNome"
            />
          </v-col>
          <v-col cols="12">
            <v-textarea
              :error-messages="errors.descricao"
              label="Descricao"
              :model-value="descricao"
              rows="3"
              variant="outlined"
              @update:model-value="onUpdateDescricao"
            />
          </v-col>
          <v-col cols="12">
            <v-switch
              color="primary"
              label="Categoria ativa"
              :model-value="ativa"
              @update:model-value="onUpdateAtiva"
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
  defineProps<{
    modelValue: boolean
    isEditing: boolean
    nome: string
    descricao: string
    ativa: boolean
    errors: {
      nome: string[]
      descricao: string[]
    }
    isValid: boolean
  }>()

  const emit = defineEmits<{
    'update:modelValue': [value: boolean]
    'update:nome': [value: string]
    'update:descricao': [value: string]
    'update:ativa': [value: boolean]
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

  function onUpdateAtiva (value: boolean | null) {
    emit('update:ativa', Boolean(value))
  }
</script>
