<script setup lang="ts">
import { ArrowRight, Search } from '@vicons/tabler';
import { storeToRefs } from 'pinia';
import { useHead } from '@vueuse/head';
import NanoToolCard from '@/components/NanoToolCard.vue';
import { useStyleStore } from '@/stores/style.store';
import { useToolStore } from '@/tools/tools.store';
import type { ToolWithCategory } from '@/tools/tools.types';

const toolStore = useToolStore();
const styleStore = useStyleStore();
const { isDarkTheme } = storeToRefs(styleStore);

useHead({ title: 'nanotools' });

const query = ref('');

const imageAssets = {
  heroLight: 'https://image-host.nanoberry.dev/b90fefe9-5366-4f1d-9307-f7c0022eca21.png',
  heroDark: 'https://image-host.nanoberry.dev/f5ddf30a-803d-44e9-8b0b-e77d3de312e8.png',
  bgLight: 'https://image-host.nanoberry.dev/e2c59f77-d055-49a8-a676-07dc5933ffea.png',
  bgDark: 'https://image-host.nanoberry.dev/65596d5c-4c85-4e1a-8335-e9af3b6ab12e.png',
};

const normalizedQuery = computed(() => query.value.trim().toLowerCase());

function includesQuery(tool: ToolWithCategory, searchValue: string) {
  if (!searchValue) {
    return true;
  }

  return [
    tool.name,
    tool.description,
    tool.category,
    ...tool.keywords,
  ]
    .join(' ')
    .toLowerCase()
    .includes(searchValue);
}

const totalTools = computed(() => toolStore.tools.length);
const totalCategories = computed(() => toolStore.toolsByCategory.length);

const filteredTools = computed(() => toolStore.tools.filter(tool => includesQuery(tool, normalizedQuery.value)));

const filteredCategories = computed(() => {
  return toolStore.toolsByCategory
    .map(category => ({
      name: category.name,
      components: category.components.filter(tool => includesQuery(tool as ToolWithCategory, normalizedQuery.value)) as ToolWithCategory[],
    }))
    .filter(category => category.components.length > 0);
});

const heroImageUrl = computed(() => (isDarkTheme.value ? imageAssets.heroDark : imageAssets.heroLight));
const backgroundImageUrl = computed(() => (isDarkTheme.value ? imageAssets.bgDark : imageAssets.bgLight));
</script>

<template>
  <div class="nano-home" :class="{ 'is-dark': isDarkTheme }" :style="{ '--nano-page-bg': `url(${backgroundImageUrl})` }">
    <div class="page-shell">
      <section class="hero-card">
        <div class="hero-nav">
          <div class="brand-inline">
            <img class="brand-pill" src="https://image-host.nanoberry.dev/favicon.ico" alt="nanotools logo">
            <span class="brand-text">Nanotools</span>
          </div>
          <div class="hero-nav-links">
            <a href="#all-tools">All tools</a>
          </div>
        </div>

        <div class="hero-body">
          <div class="hero-copy">
            <h1>
              Developer utilities,
              fast and local.
            </h1>
            <p class="subtitle">
              A curated suite of browser-based tools for data, web, crypto, and network workflows.
              Everything runs locally in your browser.
            </p>
            <div class="hero-metrics">
              <div>
                <strong>{{ totalTools }}</strong>
                <span>tools</span>
              </div>
              <div>
                <strong>{{ totalCategories }}</strong>
                <span>categories</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>local processing</span>
              </div>
            </div>
          </div>

          <div class="hero-art">
            <img :src="heroImageUrl" alt="nanotools interface preview" loading="lazy">
          </div>
        </div>

        <div class="hero-actions">
          <n-input
            v-model:value="query"
            clearable
            round
            class="hero-search"
            placeholder="Search tools, tags, categories..."
          >
            <template #prefix>
              <n-icon :component="Search" />
            </template>
          </n-input>

          <a href="#all-tools" class="hero-cta">
            Go to tools
            <n-icon :component="ArrowRight" />
          </a>
        </div>
      </section>

      <section id="all-tools" class="section-block">
        <div class="section-header">
          <div>
            <p class="section-kicker">
              Directory
            </p>
            <h2>All tools</h2>
            <p class="section-description">
              {{ filteredTools.length }} tools across {{ filteredCategories.length }} categories
            </p>
          </div>
        </div>

        <div v-if="filteredTools.length === 0" class="empty-state">
          No tools matched your search. Try another keyword.
        </div>

        <div v-for="category in filteredCategories" :key="category.name" class="category-block">
          <div class="category-head">
            <h3>{{ category.name }}</h3>
            <span>{{ category.components.length }}</span>
          </div>

          <div class="category-grid">
            <NanoToolCard v-for="tool in category.components" :key="tool.path" :tool="tool" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="less">
.nano-home {
  --nano-card-bg: rgba(250, 253, 255, 0.74);
  --nano-card-border: rgba(118, 145, 182, 0.28);
  --nano-card-border-hover: rgba(82, 125, 190, 0.5);
  --nano-icon-bg: rgba(239, 247, 255, 0.92);
  --nano-icon-border: rgba(120, 151, 201, 0.3);
  --nano-icon-color: #2e4f85;
  --nano-title-color: #16253f;
  --nano-text-muted: rgba(28, 52, 88, 0.82);
  --nano-tag-bg: rgba(238, 246, 255, 0.78);
  --nano-tag-border: rgba(123, 152, 191, 0.34);
  --nano-tag-color: rgba(29, 56, 93, 0.8);

  position: relative;
  overflow: hidden;
  padding: 24px 6px 60px;
  min-height: calc(100vh - 20px);
}

.nano-home::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(165deg, rgba(246, 250, 255, 0.84) 0%, rgba(228, 239, 255, 0.55) 58%, rgba(214, 230, 251, 0.4) 100%),
    var(--nano-page-bg);
  background-size: cover;
  background-position: center;
  opacity: 0.95;
  pointer-events: none;
}

.nano-home.is-dark {
  --nano-card-bg: rgba(16, 25, 41, 0.7);
  --nano-card-border: rgba(106, 129, 169, 0.34);
  --nano-card-border-hover: rgba(120, 155, 215, 0.58);
  --nano-icon-bg: rgba(37, 52, 84, 0.82);
  --nano-icon-border: rgba(120, 147, 195, 0.34);
  --nano-icon-color: #c8d5f1;
  --nano-title-color: #ebf2ff;
  --nano-text-muted: rgba(208, 220, 245, 0.83);
  --nano-tag-bg: rgba(29, 44, 71, 0.84);
  --nano-tag-border: rgba(114, 140, 186, 0.52);
  --nano-tag-color: rgba(201, 218, 247, 0.88);
}

.nano-home.is-dark::before {
  background-image:
    linear-gradient(170deg, rgba(5, 10, 20, 0.8) 0%, rgba(12, 23, 43, 0.78) 58%, rgba(20, 33, 55, 0.7) 100%),
    var(--nano-page-bg);
}

.page-shell {
  position: relative;
  z-index: 1;
  width: min(1180px, 100%);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.hero-card {
  border-radius: 26px;
  border: 1px solid rgba(157, 181, 219, 0.42);
  background: rgba(245, 250, 255, 0.62);
  backdrop-filter: blur(16px);
  box-shadow: 0 20px 48px rgba(42, 73, 118, 0.13);
  padding: 22px 24px 24px;
}

.nano-home.is-dark .hero-card {
  border-color: rgba(109, 136, 186, 0.45);
  background: rgba(14, 24, 40, 0.7);
  box-shadow: 0 26px 52px rgba(2, 8, 17, 0.45);
}

.hero-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.brand-inline {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.brand-pill {
  width: 34px;
  height: 34px;
  border-radius: 999px;
  object-fit: cover;
  border: 1px solid rgba(120, 150, 194, 0.45);
}

.brand-text {
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: #1f2f4b;
}

.nano-home.is-dark .brand-text {
  color: #e7f0ff;
}

.hero-nav-links {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.hero-nav-links a {
  text-decoration: none;
  color: rgba(39, 62, 96, 0.75);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border: 1px solid rgba(119, 148, 192, 0.34);
  background: rgba(239, 247, 255, 0.64);
  border-radius: 999px;
  padding: 7px 12px;
  transition: all 0.2s ease;
}

.hero-nav-links a:hover {
  border-color: rgba(84, 129, 193, 0.64);
  color: rgba(26, 48, 82, 0.98);
}

.nano-home.is-dark .hero-nav-links a {
  color: rgba(204, 219, 246, 0.84);
  border-color: rgba(103, 130, 176, 0.48);
  background: rgba(28, 44, 70, 0.64);
}

.hero-body {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: 18px;
  align-items: center;
}

.hero-copy .eyebrow {
  margin: 0 0 12px;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  color: rgba(38, 65, 109, 0.72);
}

.hero-copy h1 {
  margin: 0;
  font-size: clamp(34px, 4.5vw, 58px);
  line-height: 1.02;
  letter-spacing: -0.04em;
  color: #1a2a43;
}

.nano-home.is-dark .hero-copy h1 {
  color: #eef5ff;
}

.subtitle {
  margin: 14px 0 0;
  max-width: 560px;
  font-size: 15px;
  line-height: 1.62;
  color: rgba(34, 58, 93, 0.85);
}

.nano-home.is-dark .subtitle {
  color: rgba(205, 220, 245, 0.84);
}

.hero-metrics {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.hero-metrics > div {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid rgba(123, 151, 192, 0.3);
  background: rgba(241, 248, 255, 0.68);
}

.hero-metrics strong {
  font-size: 18px;
  line-height: 1;
  font-weight: 800;
  color: #203a63;
}

.hero-metrics span {
  font-size: 11px;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: rgba(43, 68, 105, 0.72);
}

.nano-home.is-dark .hero-metrics > div {
  border-color: rgba(106, 131, 175, 0.42);
  background: rgba(27, 41, 66, 0.66);
}

.nano-home.is-dark .hero-metrics strong {
  color: #e3eeff;
}

.nano-home.is-dark .hero-metrics span {
  color: rgba(189, 208, 240, 0.8);
}

.hero-art {
  position: relative;
  border-radius: 20px;
  border: 1px solid rgba(137, 168, 211, 0.38);
  background: linear-gradient(145deg, rgba(233, 245, 255, 0.72) 0%, rgba(217, 233, 252, 0.42) 100%);
  overflow: hidden;
  min-height: 260px;
}

.hero-art img {
  width: 100%;
  height: 100%;
  min-height: 260px;
  object-fit: cover;
  display: block;
}

.nano-home.is-dark .hero-art {
  border-color: rgba(103, 128, 172, 0.45);
  background: linear-gradient(145deg, rgba(24, 38, 62, 0.74) 0%, rgba(17, 27, 47, 0.58) 100%);
}

.hero-actions {
  margin-top: 14px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 10px;
  align-items: center;
}

.hero-search {
  width: 100%;
}

.hero-cta {
  text-decoration: none;
  border: 1px solid rgba(88, 129, 192, 0.65);
  color: #fff;
  background: linear-gradient(140deg, #4f85e7 0%, #5c79d6 100%);
  padding: 11px 16px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hero-cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(48, 88, 160, 0.35);
}

.section-block {
  border-radius: 22px;
  border: 1px solid rgba(151, 178, 219, 0.36);
  background: rgba(244, 250, 255, 0.56);
  backdrop-filter: blur(14px);
  box-shadow: 0 16px 42px rgba(37, 72, 126, 0.11);
  padding: 20px;
}

.nano-home.is-dark .section-block {
  border-color: rgba(99, 126, 171, 0.45);
  background: rgba(13, 24, 40, 0.66);
  box-shadow: 0 22px 44px rgba(2, 8, 17, 0.4);
}

.section-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 14px;
}

.section-kicker {
  margin: 0 0 5px;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: rgba(42, 71, 113, 0.68);
}

.section-header h2 {
  margin: 0;
  font-size: 30px;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: #1b2f4f;
}

.nano-home.is-dark .section-header h2 {
  color: #ecf4ff;
}

.section-count {
  border-radius: 999px;
  border: 1px solid rgba(123, 153, 194, 0.4);
  background: rgba(237, 246, 255, 0.76);
  min-width: 42px;
  height: 42px;
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  color: #2a446e;
}

.nano-home.is-dark .section-count {
  border-color: rgba(104, 131, 175, 0.58);
  background: rgba(29, 44, 71, 0.74);
  color: #d6e5ff;
}

.section-description {
  margin: 10px 0 0;
  font-size: 14px;
  color: rgba(41, 66, 103, 0.8);
}

.nano-home.is-dark .section-description {
  color: rgba(196, 214, 243, 0.82);
}

.category-block + .category-block {
  margin-top: 22px;
}

.category-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
}

.category-head h3 {
  margin: 0;
  font-size: 18px;
  letter-spacing: -0.01em;
  color: #22385d;
}

.nano-home.is-dark .category-head h3 {
  color: #e2eeff;
}

.category-head span {
  font-size: 13px;
  color: rgba(47, 73, 111, 0.72);
}

.nano-home.is-dark .category-head span {
  color: rgba(181, 201, 235, 0.8);
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.empty-state {
  border-radius: 16px;
  border: 1px dashed rgba(128, 154, 193, 0.5);
  padding: 22px;
  text-align: center;
  color: rgba(42, 67, 105, 0.84);
  background: rgba(242, 249, 255, 0.52);
}

.nano-home.is-dark .empty-state {
  border-color: rgba(106, 132, 177, 0.52);
  color: rgba(194, 212, 243, 0.86);
  background: rgba(25, 39, 63, 0.58);
}

@media (max-width: 1100px) {
  .hero-body {
    grid-template-columns: 1fr;
  }

  .hero-art img {
    min-height: 220px;
    max-height: 260px;
  }

  .category-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 700px) {
  .nano-home {
    padding: 12px 0 42px;
  }

  .hero-card,
  .section-block {
    border-radius: 18px;
    padding: 16px;
  }

  .brand-text {
    font-size: 22px;
  }

  .hero-copy h1 {
    font-size: clamp(28px, 10vw, 38px);
  }

  .hero-nav {
    align-items: flex-start;
    flex-direction: column;
  }

  .hero-actions {
    grid-template-columns: 1fr;
  }

  .hero-cta {
    justify-content: center;
  }

  .category-grid {
    grid-template-columns: 1fr;
  }

  .hero-metrics {
    grid-template-columns: 1fr;
  }
}
</style>
