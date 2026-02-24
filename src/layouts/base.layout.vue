<script lang="ts" setup>
import { NIcon } from 'naive-ui';
import { Home2, Menu2 } from '@vicons/tabler';
import { storeToRefs } from 'pinia';
import { RouterLink } from 'vue-router';
import MenuLayout from '../components/MenuLayout.vue';
import NavbarButtons from '../components/NavbarButtons.vue';
import { config } from '@/config';
import CollapsibleToolMenu from '@/components/CollapsibleToolMenu.vue';
import { useStyleStore } from '@/stores/style.store';
import { useToolStore } from '@/tools/tools.store';
import type { ToolCategory } from '@/tools/tools.types';

const styleStore = useStyleStore();
const { isDarkTheme, isSmallScreen } = storeToRefs(styleStore);
const { t } = useI18n();

const toolStore = useToolStore();
const { favoriteTools, toolsByCategory } = storeToRefs(toolStore);

const tools = computed<ToolCategory[]>(() => [
  ...(favoriteTools.value.length > 0 ? [{ name: t('tools.categories.favorite-tools'), components: favoriteTools.value }] : []),
  ...toolsByCategory.value,
]);
</script>

<template>
  <MenuLayout class="menu-layout" :class="{ isSmallScreen, isDarkMode: isDarkTheme }">
    <template #sider>
      <RouterLink to="/" class="hero-wrapper" :class="{ isDark: isDarkTheme }">
        <img class="brand-icon" src="https://image-host.nanoberry.dev/favicon.ico" alt="nanotools logo">

        <div class="text-wrapper" :class="{ isDark: isDarkTheme }">
          <div class="title">
            Nanotools
          </div>
        </div>
      </RouterLink>

      <div class="sider-content">
        <div v-if="isSmallScreen" class="mobile-tools">
          <locale-selector w="90%" />

          <div class="mobile-navbar">
            <NavbarButtons />
          </div>
        </div>

        <CollapsibleToolMenu :tools-by-category="tools" />

        <div class="footer">
          <div class="footer-line">
            Based on
            <a class="it-tools-link" target="_blank" rel="noopener" href="https://github.com/CorentinTh/it-tools">
              it-tools
            </a>.
          </div>
        </div>
      </div>
    </template>

    <template #content>
      <div class="top-toolbar" :class="{ stacked: isSmallScreen, isDark: isDarkTheme }">
        <div class="toolbar-left">
          <c-button
            circle
            variant="text"
            :aria-label="$t('home.toggleMenu')"
            @click="styleStore.isMenuCollapsed = !styleStore.isMenuCollapsed"
          >
            <NIcon size="25" :component="Menu2" />
          </c-button>

          <c-tooltip :tooltip="$t('home.home')" position="bottom">
            <c-button to="/" circle variant="text" :aria-label="$t('home.home')">
              <NIcon size="25" :component="Home2" />
            </c-button>
          </c-tooltip>

          <c-tooltip :tooltip="$t('home.uiLib')" position="bottom">
            <c-button v-if="config.app.env === 'development'" to="/c-lib" circle variant="text" :aria-label="$t('home.uiLib')">
              <icon-mdi:brush-variant text-20px />
            </c-button>
          </c-tooltip>
        </div>

        <div class="toolbar-right">
          <locale-selector v-if="!isSmallScreen" />
          <NavbarButtons v-if="!isSmallScreen" />
        </div>
      </div>

      <slot />
    </template>
  </MenuLayout>
</template>

<style lang="less" scoped>
.menu-layout {
  --surface-border: rgba(127, 155, 193, 0.28);
  --surface-bg: rgba(241, 248, 255, 0.64);
  --surface-bg-dark: rgba(20, 31, 49, 0.72);
}

.sider-content {
  padding-top: 16px;
  padding-bottom: 40px;
}

.hero-wrapper {
  margin: 14px 12px 4px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  width: 100%;
  border-radius: 16px;
  text-decoration: none;
  border: 1px solid var(--surface-border);
  background: var(--surface-bg);
  max-width: calc(100% - 24px);
  backdrop-filter: blur(12px);
}

.brand-icon {
  width: 34px;
  height: 34px;
  border-radius: 999px;
  object-fit: cover;
  flex-shrink: 0;
  border: 1px solid rgba(122, 151, 193, 0.45);
}

.hero-wrapper.isDark {
  border-color: rgba(97, 126, 170, 0.42);
  background: var(--surface-bg-dark);
}

.text-wrapper {
  text-align: left;
  color: #1c2f4e;
}

.text-wrapper.isDark {
  color: #e9f2ff;
}

.title {
  font-size: 24px;
  line-height: 1;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.mobile-tools {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.mobile-navbar {
  display: flex;
  justify-content: center;
}

.footer {
  text-align: center;
  color: rgba(75, 93, 120, 0.82);
  margin-top: 22px;
  padding: 12px 0 0;
  display: grid;
  gap: 8px;
  font-size: 12px;
}

.menu-layout.isDarkMode .footer {
  color: rgba(181, 199, 228, 0.82);
}

.footer-line {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6px;
}

.it-tools-link {
  color: #23a85a;
  text-decoration: none;
  font-weight: 700;
}

.it-tools-link:hover {
  color: #1d8b4a;
}

.top-toolbar {
  width: min(1180px, 100%);
  margin: 0 auto 14px;
  position: relative;
  z-index: 30;
  border-radius: 16px;
  border: 1px solid var(--surface-border);
  background: var(--surface-bg);
  backdrop-filter: blur(12px);
  padding: 8px 10px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  align-items: center;
}

.top-toolbar.isDark {
  border-color: rgba(97, 126, 170, 0.42);
  background: var(--surface-bg-dark);
}

.toolbar-left,
.toolbar-right {
  display: flex;
  align-items: center;
  gap: 4px;
}

.toolbar-right {
  justify-self: end;
}

.stacked {
  grid-template-columns: 1fr;
}

.stacked .toolbar-left {
  justify-content: flex-start;
}
</style>
