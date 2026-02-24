<script setup lang="ts">
import { InfoCircle } from '@vicons/tabler';
import { storeToRefs } from 'pinia';
import { useStyleStore } from '@/stores/style.store';
import ThemeToggle from './ThemeToggle.vue';

const styleStore = useStyleStore();
const { isDarkTheme } = storeToRefs(styleStore);
const localChecked = ref(Boolean(isDarkTheme.value));
let syncTimer: number | undefined;

watch(isDarkTheme, (next) => {
  localChecked.value = Boolean(next);
});

function toggleTheme(nextState?: boolean) {
  if (typeof nextState !== 'boolean') {
    return;
  }

  localChecked.value = nextState;

  if (syncTimer) {
    clearTimeout(syncTimer);
  }

  // Delay theme store sync slightly so the toggle animation starts visibly first.
  syncTimer = window.setTimeout(() => {
    styleStore.toggleDark(nextState);
  }, 140);
}

onBeforeUnmount(() => {
  if (syncTimer) {
    clearTimeout(syncTimer);
  }
});
</script>

<template>
  <c-tooltip :tooltip="$t('home.nav.about')" position="bottom">
    <c-button circle variant="text" to="/about" :aria-label="$t('home.nav.aboutLabel')">
      <n-icon size="25" :component="InfoCircle" />
    </c-button>
  </c-tooltip>
  <c-tooltip :tooltip="isDarkTheme ? $t('home.nav.lightMode') : $t('home.nav.darkMode')" position="bottom">
    <ThemeToggle
      class="theme-toggle"
      :checked="localChecked"
      :aria-label="$t('home.nav.mode')"
      @update:checked="toggleTheme"
    />
  </c-tooltip>
</template>

<style lang="less" scoped>
.n-button {
  &:not(:last-child) {
    margin-right: 5px;
  }
}

.theme-toggle {
  margin-left: 6px;
}
</style>
