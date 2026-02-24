<script setup lang="ts">
import { useHead } from '@vueuse/head';

useHead({ title: 'nanotools' });

const aboutMarkdown = `
# About nanotools

nanotools is a curated collection of browser-based developer utilities with a Swiss minimal engineering UI direction.

## Local-first workflow

- Utilities run directly in the browser for fast iteration.
- A consistent interface is used across converter, crypto, network, web, and data tools.

## Open-source foundation

This project keeps the upstream open-source foundation and attribution.

- Based on [it-tools (GPLv3)](https://github.com/CorentinTh/it-tools)
- Original project by [Corentin Thomasset](https://corentin.tech?utm_source=it-tools&utm_medium=about)
`;
</script>

<template>
  <div class="about-wrapper">
    <c-markdown :markdown="aboutMarkdown" mx-auto mt-40px max-w-700px />

    <div class="license-note">
      Based on it-tools (GPLv3) -
      <c-link href="https://github.com/CorentinTh/it-tools" target="_blank" rel="noopener">
        https://github.com/CorentinTh/it-tools
      </c-link>
    </div>
  </div>
</template>

<style scoped lang="less">
.about-wrapper {
  padding: 0 14px 36px;
}

.license-note {
  margin: 20px auto 0;
  max-width: 700px;
  border: 1px solid rgba(118, 146, 188, 0.35);
  border-radius: 14px;
  padding: 12px 14px;
  background: rgba(243, 249, 255, 0.58);
  color: rgba(35, 58, 93, 0.84);
}

:global(.dark) .license-note {
  border-color: rgba(100, 126, 171, 0.52);
  background: rgba(24, 38, 63, 0.66);
  color: rgba(190, 208, 239, 0.86);
}
</style>
