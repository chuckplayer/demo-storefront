<template>
  <div class="product-card">
    <RouterLink :to="`/products/${product.id}`" class="product-image-link">
      <div class="product-image-wrap">
        <img
          :src="product.image_url"
          :alt="product.name"
          class="product-image"
          @error="onImageError"
        />
      </div>
    </RouterLink>
    <div class="product-body">
      <span class="category-badge">{{ product.category }}</span>
      <RouterLink :to="`/products/${product.id}`" class="product-name-link">
        <h3 class="product-name">{{ product.name }}</h3>
      </RouterLink>
      <p class="product-price">{{ formatPrice(product.price) }}</p>
      <button class="add-to-cart-btn" @click="$emit('add-to-cart', product)">
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import type { Product } from '../types';

defineProps<{
  product: Product;
}>();

defineEmits<{
  (e: 'add-to-cart', product: Product): void;
}>();

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

function onImageError(event: Event) {
  const img = event.target as HTMLImageElement;
  img.src =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='160' viewBox='0 0 200 160'%3E%3Crect width='200' height='160' fill='%23f0f0ee'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23bbb' font-size='13' font-family='sans-serif'%3ENo Image%3C/text%3E%3C/svg%3E";
}
</script>

<style scoped>
.product-card {
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #e5e5e3;
  overflow: hidden;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border-color: #ccc;
}

.product-image-link {
  display: block;
  text-decoration: none;
}

.product-image-wrap {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background-color: #f3f3f1;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.03);
}

.product-body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.category-badge {
  display: inline-block;
  background-color: #f3f3f1;
  color: #666;
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
  align-self: flex-start;
}

.product-name-link {
  text-decoration: none;
}

.product-name {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: #111;
  line-height: 1.35;
  transition: color 0.15s ease;
}

.product-name-link:hover .product-name {
  color: #444;
}

.product-price {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #111;
}

.add-to-cart-btn {
  margin-top: auto;
  background-color: #111;
  color: #fff;
  border: none;
  border-radius: 7px;
  padding: 0.6rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s ease;
  letter-spacing: 0.01em;
}

.add-to-cart-btn:hover {
  background-color: #333;
}

.add-to-cart-btn:active {
  background-color: #000;
}
</style>
