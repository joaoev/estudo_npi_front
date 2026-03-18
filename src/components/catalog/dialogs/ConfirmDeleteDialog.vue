<template>
  <v-dialog max-width="420" :model-value="modelValue" @update:model-value="onUpdateDialog">
    <v-card>
      <v-card-title>Confirmar exclusao</v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="emit('update:modelValue', false)">Cancelar</v-btn>
        <v-btn color="error" @click="emit('confirm')">Excluir</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  defineProps<{
    modelValue: boolean
    message: string
  }>()

  const emit = defineEmits<{
    'update:modelValue': [value: boolean]
    'confirm': []
  }>()

  function onUpdateDialog (value: boolean) {
    emit('update:modelValue', value)
  }
</script>
