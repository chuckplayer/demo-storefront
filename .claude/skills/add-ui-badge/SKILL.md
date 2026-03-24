---
name: add-ui-badge
description: Adds a badge overlay to a Vue component's .product-image-wrap div. Invoke when the user provides a component path, a v-if condition, badge label text, and a hex background color via `/add-ui-badge <component> <condition> <label> <color>`.
---

# Add UI Badge

Injects a styled badge `<span>` into a Vue component's `.product-image-wrap` div with a configurable visibility condition, label, and background color. Makes only the targeted edits — no other files are read or modified.

## 1. Parse arguments

Extract the four required arguments from the invocation:

- `<component>` — path to the `.vue` file relative to `client/src/` (e.g. `components/ProductCard.vue`)
- `<condition>` — a Vue template expression used as the `v-if` value (e.g. `product.stock_quantity <= 5`)
- `<label>` — the badge text displayed to the user (e.g. `Low Stock`)
- `<color>` — hex color for the badge background (e.g. `#f59e0b`)

If any argument is missing, ask the user to supply it before proceeding.

## 2. Read the target component

Read `client/src/<component>`. Do not read any other files.

## 3. Insert the badge element

In the `<template>` block, locate the `.product-image-wrap` div. Add the following as its **first child element**:

```html
<span v-if="<condition>" class="ui-badge" :style="{ backgroundColor: '<color>' }">
  <label>
</span>
```

Replace `<condition>`, `<color>`, and `<label>` with the parsed argument values.

## 4. Add the badge CSS

In the `<style scoped>` block, add the following rule **only if a `.ui-badge` rule does not already exist**:

```css
.ui-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  pointer-events: none;
}
```

## 5. Report

State the component edited and the exact badge span that was inserted. Do not run any commands or validate the build.
