<template>
  <div class="product-list-view">
    <div class="page-header">
      <h2 class="page-title">Our Products</h2>
      <p class="page-tagline">Making the simple needlessly complex since 2019</p>
      <!-- NOTE: Filtering/sorting UI intentionally absent (intentional gap for demo) -->
    </div>

    <div v-if="loading" class="state-message">
      <p>Loading products...</p>
    </div>

    <div v-else-if="error" class="state-message error">
      <p>{{ error }}</p>
    </div>

    <div v-else class="product-grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="handleAddToCart"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import type { Product } from '../types';
import { useCartStore } from '../stores/cart';
import ProductCard from '../components/ProductCard.vue';

const products = ref<Product[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const cartStore = useCartStore();

onMounted(async () => {
  const maxAttempts = 5;
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await axios.get<Product[]>('/api/products');
      products.value = response.data;
      loading.value = false;
      return;
    } catch (err) {
      if (attempt === maxAttempts) {
        error.value = err instanceof Error ? err.message : 'Failed to load products';
        loading.value = false;
      } else {
        await delay(500 * attempt);
      }
    }
  }
});

function handleAddToCart(product: Product) {
  cartStore.addItem(product);
  if (!cartStore.isOpen) {
    cartStore.toggleCart();
  }
}
</script>

<style scoped>
.product-list-view {
  padding-bottom: 4rem;
}

.page-header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e5e3;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #111;
  margin: 0 0 0.35rem;
  letter-spacing: -0.02em;
}

.page-tagline {
  color: #999;
  font-size: 0.9rem;
  margin: 0;
}

.state-message {
  text-align: center;
  padding: 5rem 0;
  color: #999;
  font-size: 0.95rem;
}

.state-message.error {
  color: #dc2626;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

@media (max-width: 900px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}
</style>
