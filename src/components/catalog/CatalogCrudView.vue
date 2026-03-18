<template>
  <v-container class="py-6" fluid>
    <v-row align="center" class="mb-4" justify="space-between">
      <v-col cols="12" md="8">
        <h1 class="text-h4 font-weight-bold">Gestão de Produtos</h1>
        <p class="text-medium-emphasis mt-1">Integração com API REST - Produtos e Categorias</p>
      </v-col>
    </v-row>

    <v-card>
      <v-tabs v-model="tab" color="primary" grow>
        <v-tab value="produtos">Produtos</v-tab>
        <v-tab value="categorias">Categorias</v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <v-window-item value="produtos">
          <v-card-text>
            <v-row align="center" class="mb-3 flex ">
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="productSearch"
                  clearable
                  density="comfortable"
                  hide-details
                  label="Buscar produtos"
                  prepend-inner-icon="mdi-magnify"
                  variant="outlined"
                />
              </v-col>
              <v-col class="d-flex justify-md-end" cols="12" md="6">
                <v-btn color="success" prepend-icon="mdi-plus" @click="openCreateProduct">
                  Novo produto
                </v-btn>
              </v-col>
            </v-row>

            <v-data-table
              :headers="productHeaders"
              item-key="id"
              :items="filteredProducts"
              no-data-text="Nenhum produto encontrado"
            >
              <template #item.preco="{ item }">
                {{ formatCurrency(item.preco) }}
              </template>

              <template #item.categoriaId="{ item }">
                {{ getCategoryName(item.categoriaId) }}
              </template>

              <template #item.ativo="{ item }">
                <v-chip :color="item.ativo ? 'success' : 'warning'" size="small" variant="flat">
                  {{ item.ativo ? 'Ativo' : 'Inativo' }}
                </v-chip>
              </template>

              <template #item.acoes="{ item }">
                <v-btn
                  color="warning"
                  icon="mdi-pencil"
                  size="small"
                  variant="text"
                  @click="openEditProduct(item)"
                />
                <v-btn
                  color="error"
                  icon="mdi-delete"
                  size="small"
                  variant="text"
                  @click="openDeleteProduct(item)"
                />
              </template>
            </v-data-table>
          </v-card-text>
        </v-window-item>

        <v-window-item value="categorias">
          <v-card-text>
            <v-row align="center" class="mb-3">
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="categorySearch"
                  clearable
                  density="comfortable"
                  hide-details
                  label="Buscar categorias"
                  prepend-inner-icon="mdi-magnify"
                  variant="outlined"
                />
              </v-col>
              <v-col class="d-flex justify-md-end" cols="12" md="6">
                <v-btn color="info" prepend-icon="mdi-plus" @click="openCreateCategory">
                  Nova categoria
                </v-btn>
              </v-col>
            </v-row>

            <v-data-table
              :headers="categoryHeaders"
              item-key="id"
              :items="filteredCategories"
              no-data-text="Nenhuma categoria encontrada"
            >
              <template #item.ativa="{ item }">
                <v-chip :color="item.ativa ? 'success' : 'warning'" size="small" variant="flat">
                  {{ item.ativa ? 'Ativa' : 'Inativa' }}
                </v-chip>
              </template>

              <template #item.acoes="{ item }">
                <v-btn
                  color="warning"
                  icon="mdi-pencil"
                  size="small"
                  variant="text"
                  @click="openEditCategory(item)"
                />
                <v-btn
                  color="error"
                  icon="mdi-delete"
                  size="small"
                  variant="text"
                  @click="openDeleteCategory(item)"
                />
              </template>
            </v-data-table>
          </v-card-text>
        </v-window-item>
      </v-window>
    </v-card>

    <CategoryDialog
      :ativa="categoryForm.ativa"
      :descricao="categoryForm.descricao"
      :errors="categoryFormErrors"
      :is-editing="Boolean(editingCategoryId)"
      :is-valid="isCategoryFormValid"
      :model-value="categoryDialog"
      :nome="categoryForm.nome"
      @save="saveCategory"
      @update:ativa="categoryForm.ativa = $event"
      @update:descricao="categoryForm.descricao = $event"
      @update:model-value="$event ? categoryDialog = $event : closeCategoryDialog()"
      @update:nome="categoryForm.nome = $event"
    />

    <ProductDialog
      :ativo="productForm.ativo"
      :categoria-id="productForm.categoriaId"
      :category-options="categoryOptions"
      :descricao="productForm.descricao"
      :errors="productFormErrors"
      :is-editing="Boolean(editingProductId)"
      :is-valid="isProductFormValid"
      :model-value="productDialog"
      :nome="productForm.nome"
      :preco="productForm.preco"
      @save="saveProduct"
      @update:ativo="productForm.ativo = $event"
      @update:categoria-id="productForm.categoriaId = $event"
      @update:descricao="productForm.descricao = $event"
      @update:model-value="$event ? productDialog = $event : closeProductDialog()"
      @update:nome="productForm.nome = $event"
      @update:preco="productForm.preco = $event"
    />

    <ConfirmDeleteDialog
      :message="deleteDialog.message"
      :model-value="deleteDialog.open"
      @confirm="confirmDelete"
      @update:model-value="$event ? deleteDialog.open = $event : closeDeleteDialog()"
    />

    <v-snackbar v-model="snackbar.open" :color="snackbar.color" timeout="2500">
      {{ snackbar.text }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
  import CategoryDialog from '@/components/catalog/dialogs/CategoryDialog.vue'
  import ConfirmDeleteDialog from '@/components/catalog/dialogs/ConfirmDeleteDialog.vue'
  import ProductDialog from '@/components/catalog/dialogs/ProductDialog.vue'
  import { useCatalogPage } from '@/composables/useCatalogPage'

  const {
    tab,
    categorySearch,
    productSearch,
    categoryDialog,
    productDialog,
    editingCategoryId,
    editingProductId,
    deleteDialog,
    snackbar,
    categoryForm,
    productForm,
    categoryHeaders,
    productHeaders,
    filteredCategories,
    filteredProducts,
    categoryOptions,
    categoryFormErrors,
    productFormErrors,
    isCategoryFormValid,
    isProductFormValid,
    getCategoryName,
    formatCurrency,
    openCreateCategory,
    openEditCategory,
    closeCategoryDialog,
    saveCategory,
    openDeleteCategory,
    openCreateProduct,
    openEditProduct,
    closeProductDialog,
    saveProduct,
    openDeleteProduct,
    closeDeleteDialog,
    confirmDelete,
  } = useCatalogPage()
</script>
