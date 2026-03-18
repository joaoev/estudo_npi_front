import { computed, reactive, ref } from 'vue'
import {
  type Category,
  type CategoryPayload,
  type Product,
  type ProductPayload,
  useCatalogCrud,
} from '@/composables/useCatalogCrud'

type DeleteDialogState = {
  open: boolean
  message: string
  action: null | (() => void)
}

type SnackbarState = {
  open: boolean
  text: string
  color: 'success' | 'error' | 'warning'
}

export function useCatalogPage () {
  const {
    categories,
    products,
    createCategory,
    updateCategory,
    deleteCategory,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useCatalogCrud()

  const tab = ref<'produtos' | 'categorias'>('produtos')

  const categorySearch = ref('')
  const productSearch = ref('')

  const categoryDialog = ref(false)
  const productDialog = ref(false)

  const editingCategoryId = ref<number | null>(null)
  const editingProductId = ref<number | null>(null)

  const deleteDialog = reactive<DeleteDialogState>({
    open: false,
    message: '',
    action: null,
  })

  const snackbar = reactive<SnackbarState>({
    open: false,
    text: '',
    color: 'success',
  })

  const categoryForm = reactive<CategoryPayload>({
    nome: '',
    descricao: '',
    ativa: true,
  })

  const productForm = reactive<ProductPayload>({
    nome: '',
    descricao: '',
    preco: 0,
    estoque: 0,
    categoriaId: 0,
    ativo: true,
  })

  const categoryHeaders = [
    { title: 'ID', key: 'id' },
    { title: 'Nome', key: 'nome' },
    { title: 'Descricao', key: 'descricao' },
    { title: 'Status', key: 'ativa' },
    { title: 'Criada em', key: 'criadaEm' },
    { title: 'Acoes', key: 'acoes', sortable: false },
  ]

  const productHeaders = [
    { title: 'ID', key: 'id' },
    { title: 'Nome', key: 'nome' },
    { title: 'Descricao', key: 'descricao' },
    { title: 'Categoria', key: 'categoriaId' },
    { title: 'Preco', key: 'preco' },
    { title: 'Estoque', key: 'estoque' },
    { title: 'Status', key: 'ativo' },
    { title: 'Criado em', key: 'criadoEm' },
    { title: 'Acoes', key: 'acoes', sortable: false },
  ]

  const filteredCategories = computed(() => {
    const search = categorySearch.value.trim().toLowerCase()

    if (!search) {
      return categories.value
    }

    return categories.value.filter(item => {
      return [item.nome, item.descricao, item.criadaEm].join(' ').toLowerCase().includes(search)
    })
  })

  const filteredProducts = computed(() => {
    const search = productSearch.value.trim().toLowerCase()

    if (!search) {
      return products.value
    }

    return products.value.filter(item => {
      const categoryName = getCategoryName(item.categoriaId)

      return [
        item.nome,
        item.descricao,
        categoryName,
        item.preco.toString(),
        item.estoque.toString(),
        item.criadoEm,
      ].join(' ').toLowerCase().includes(search)
    })
  })

  const categoryOptions = computed(() => {
    return categories.value
      .filter(item => item.ativa)
      .map(item => ({
        title: item.nome,
        value: item.id,
      }))
  })

  const categoryFormErrors = computed(() => {
    return {
      nome: categoryForm.nome.trim() ? [] : ['Nome e obrigatorio'],
      descricao: categoryForm.descricao.trim() ? [] : ['Descricao e obrigatoria'],
    }
  })

  const productFormErrors = computed(() => {
    return {
      nome: productForm.nome.trim() ? [] : ['Nome e obrigatorio'],
      descricao: productForm.descricao.trim() ? [] : ['Descricao e obrigatoria'],
      categoriaId: productForm.categoriaId > 0 ? [] : ['Categoria e obrigatoria'],
      preco: productForm.preco >= 0 ? [] : ['Preco nao pode ser negativo'],
      estoque: Number.isInteger(productForm.estoque) && productForm.estoque >= 0
        ? []
        : ['Estoque deve ser inteiro maior ou igual a zero'],
    }
  })

  const isCategoryFormValid = computed(() => {
    return categoryFormErrors.value.nome.length === 0
      && categoryFormErrors.value.descricao.length === 0
  })

  const isProductFormValid = computed(() => {
    return productFormErrors.value.nome.length === 0
      && productFormErrors.value.descricao.length === 0
      && productFormErrors.value.categoriaId.length === 0
      && productFormErrors.value.preco.length === 0
      && productFormErrors.value.estoque.length === 0
  })

  function getCategoryName (categoriaId: number) {
    return categories.value.find(item => item.id === categoriaId)?.nome ?? 'Sem categoria'
  }

  function formatCurrency (value: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  function notify (text: string, color: SnackbarState['color'] = 'success') {
    snackbar.text = text
    snackbar.color = color
    snackbar.open = true
  }

  function resetCategoryForm () {
    categoryForm.nome = ''
    categoryForm.descricao = ''
    categoryForm.ativa = true
  }

  function resetProductForm () {
    productForm.nome = ''
    productForm.descricao = ''
    productForm.preco = 0
    productForm.estoque = 0
    productForm.categoriaId = categoryOptions.value[0]?.value ?? 0
    productForm.ativo = true
  }

  function openCreateCategory () {
    editingCategoryId.value = null
    resetCategoryForm()
    categoryDialog.value = true
  }

  function openEditCategory (category: Category) {
    editingCategoryId.value = category.id
    categoryForm.nome = category.nome
    categoryForm.descricao = category.descricao
    categoryForm.ativa = category.ativa
    categoryDialog.value = true
  }

  function closeCategoryDialog () {
    categoryDialog.value = false
    editingCategoryId.value = null
  }

  function saveCategory () {
    if (!isCategoryFormValid.value) {
      return
    }

    const payload = {
      nome: categoryForm.nome.trim(),
      descricao: categoryForm.descricao.trim(),
      ativa: categoryForm.ativa,
    }

    if (editingCategoryId.value) {
      updateCategory(editingCategoryId.value, payload)
      notify('Categoria atualizada com sucesso')
    } else {
      createCategory(payload)
      notify('Categoria criada com sucesso')
    }

    closeCategoryDialog()
  }

  function openDeleteCategory (category: Category) {
    deleteDialog.open = true
    deleteDialog.message = `Deseja excluir a categoria "${category.nome}"?`
    deleteDialog.action = () => {
      const removed = deleteCategory(category.id)

      if (!removed) {
        notify('Nao e possivel excluir categoria com produtos vinculados', 'warning')
        return
      }

      notify('Categoria excluida com sucesso')
    }
  }

  function openCreateProduct () {
    editingProductId.value = null
    resetProductForm()
    productDialog.value = true
  }

  function openEditProduct (product: Product) {
    editingProductId.value = product.id
    productForm.nome = product.nome
    productForm.descricao = product.descricao
    productForm.preco = product.preco
    productForm.estoque = product.estoque
    productForm.categoriaId = product.categoriaId
    productForm.ativo = product.ativo
    productDialog.value = true
  }

  function closeProductDialog () {
    productDialog.value = false
    editingProductId.value = null
  }

  function saveProduct () {
    if (!isProductFormValid.value) {
      return
    }

    const payload = {
      nome: productForm.nome.trim(),
      descricao: productForm.descricao.trim(),
      preco: Number(productForm.preco),
      estoque: Number(productForm.estoque),
      categoriaId: Number(productForm.categoriaId),
      ativo: productForm.ativo,
    }

    if (editingProductId.value) {
      updateProduct(editingProductId.value, payload)
      notify('Produto atualizado com sucesso')
    } else {
      createProduct(payload)
      notify('Produto criado com sucesso')
    }

    closeProductDialog()
  }

  function openDeleteProduct (product: Product) {
    deleteDialog.open = true
    deleteDialog.message = `Deseja excluir o produto "${product.nome}"?`
    deleteDialog.action = () => {
      deleteProduct(product.id)
      notify('Produto excluido com sucesso')
    }
  }

  function closeDeleteDialog () {
    deleteDialog.open = false
    deleteDialog.message = ''
    deleteDialog.action = null
  }

  function confirmDelete () {
    deleteDialog.action?.()
    closeDeleteDialog()
  }

  return {
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
  }
}
