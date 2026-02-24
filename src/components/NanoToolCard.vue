<script setup lang="ts">
import type { ToolWithCategory } from '@/tools/tools.types';

const props = withDefaults(defineProps<{
  tool: ToolWithCategory
  featured?: boolean
}>(), {
  featured: false,
});

const tags = computed(() =>
  props.tool.keywords
    .filter(Boolean)
    .slice(0, 3)
    .map(keyword => keyword.trim())
    .filter(keyword => keyword.length > 0),
);
</script>

<template>
  <router-link :to="tool.path" class="nano-tool-link">
    <article class="nano-tool-card" :class="{ featured }">
      <div class="tool-header">
        <span class="tool-icon">
          <n-icon :component="tool.icon" :size="featured ? 30 : 24" />
        </span>
        <span v-if="tool.isNew" class="tool-chip">New</span>
      </div>

      <h3 class="tool-title">
        {{ tool.name }}
      </h3>
      <p class="tool-description">
        {{ tool.description }}
      </p>

      <div v-if="tags.length > 0" class="tool-tags">
        <span v-for="tag in tags" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>
    </article>
  </router-link>
</template>

<style scoped lang="less">
.nano-tool-link {
  display: block;
  text-decoration: none;
  color: inherit;
  height: 100%;
}

.nano-tool-card {
  height: 100%;
  min-height: 170px;
  border-radius: 18px;
  border: 1px solid var(--nano-card-border, rgba(108, 135, 173, 0.28));
  background: var(--nano-card-bg, rgba(255, 255, 255, 0.7));
  backdrop-filter: blur(12px);
  padding: 18px 18px 16px;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: var(--nano-card-border-hover, rgba(88, 124, 186, 0.54));
    box-shadow: 0 18px 34px rgba(36, 72, 128, 0.16);
  }
}

.nano-tool-card.featured {
  min-height: 190px;
}

.tool-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.tool-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  color: var(--nano-icon-color, #2e4f85);
  background: var(--nano-icon-bg, rgba(239, 247, 255, 0.92));
  border: 1px solid var(--nano-icon-border, rgba(120, 151, 201, 0.3));
}

.tool-chip {
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 11px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-weight: 700;
  color: #19516a;
  background: rgba(166, 232, 255, 0.78);
  border: 1px solid rgba(127, 208, 235, 0.7);
}

.tool-title {
  margin: 14px 0 6px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--nano-title-color, #16253f);
  line-height: 1.25;
}

.featured .tool-title {
  font-size: 18px;
}

.tool-description {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: var(--nano-text-muted, rgba(28, 52, 88, 0.82));
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.featured .tool-description {
  -webkit-line-clamp: 4;
  line-clamp: 4;
}

.tool-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.tag {
  border-radius: 999px;
  border: 1px solid var(--nano-tag-border, rgba(123, 152, 191, 0.34));
  padding: 4px 9px;
  font-size: 11px;
  font-weight: 600;
  color: var(--nano-tag-color, rgba(29, 56, 93, 0.8));
  background: var(--nano-tag-bg, rgba(238, 246, 255, 0.78));
}
</style>
