import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { CartItem, Product } from '../types';

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([]);
  const isOpen = ref(false);

  // Getters
  const itemCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  );

  // TODO: Implement actual total calculation
  const total = computed(() => 0);

  // Actions
  function addItem(product: Product, quantity = 1) {
    const existing = items.value.find((item) => item.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      items.value.push({ product, quantity });
    }
  }

  function removeItem(productId: number) {
    items.value = items.value.filter((item) => item.product.id !== productId);
  }

  function updateQuantity(productId: number, quantity: number) {
    const item = items.value.find((i) => i.product.id === productId);
    if (item) {
      if (quantity <= 0) {
        removeItem(productId);
      } else {
        item.quantity = quantity;
      }
    }
  }

  function clearCart() {
    items.value = [];
  }

  function toggleCart() {
    isOpen.value = !isOpen.value;
  }

  return {
    items,
    isOpen,
    itemCount,
    total,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
  };
});
