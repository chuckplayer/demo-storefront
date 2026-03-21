<template>
  <div class="order-confirmation-view">
    <div class="confirmation-card">
      <div class="checkmark">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <h2 class="thank-you">Order confirmed</h2>
      <p class="subtitle">
        Your unnecessarily smart appliances are on their way.
      </p>

      <div class="order-details">
        <div class="detail-row">
          <span class="detail-label">Order number</span>
          <span class="detail-value">#{{ orderId }}</span>
        </div>

        <div class="divider" />

        <!-- Items ordered placeholder - intentional gap: no data loading logic -->
        <div class="detail-section">
          <p class="section-label">Items ordered</p>
          <p class="placeholder-text">
            <!-- TODO: Load and display order items from /api/orders/:id -->
            Order items will appear here.
          </p>
        </div>

        <div class="divider" />

        <!-- Total placeholder - intentional gap -->
        <div class="detail-row">
          <span class="detail-label">Order total</span>
          <span class="detail-value">
            <!-- TODO: Calculate and display order total -->
            —
          </span>
        </div>
      </div>

      <RouterLink to="/" class="continue-btn">Continue Shopping</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';

const route = useRoute();
const orderId = computed(() => route.params.id);
</script>

<style scoped>
.order-confirmation-view {
  display: flex;
  justify-content: center;
  padding: 3rem 0;
}

.confirmation-card {
  background-color: #fff;
  border: 1px solid #e5e5e3;
  border-radius: 12px;
  padding: 2.5rem 2rem;
  max-width: 480px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.1rem;
}

.checkmark {
  width: 56px;
  height: 56px;
  background-color: #f0fdf4;
  border: 1.5px solid #86efac;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #16a34a;
}

.checkmark svg {
  width: 24px;
  height: 24px;
}

.thank-you {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: #111;
  letter-spacing: -0.02em;
}

.subtitle {
  margin: 0;
  color: #888;
  font-size: 0.9rem;
}

.order-details {
  width: 100%;
  background-color: #f9f9f7;
  border: 1px solid #e5e5e3;
  border-radius: 8px;
  padding: 1.25rem;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-label {
  color: #888;
  font-size: 0.83rem;
}

.detail-value {
  color: #111;
  font-weight: 600;
  font-size: 0.9rem;
}

.divider {
  height: 1px;
  background-color: #e5e5e3;
  margin: 0 -1.25rem;
}

.detail-section {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.section-label {
  margin: 0;
  font-size: 0.83rem;
  color: #888;
}

.placeholder-text {
  margin: 0;
  color: #bbb;
  font-size: 0.83rem;
  font-style: italic;
}

.continue-btn {
  display: inline-block;
  background-color: #111;
  color: #fff;
  text-decoration: none;
  border-radius: 8px;
  padding: 0.7rem 2rem;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  transition: background-color 0.15s ease;
}

.continue-btn:hover {
  background-color: #333;
}
</style>
