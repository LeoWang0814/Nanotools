<script setup lang="ts">
const { availableLocales, locale } = useI18n();

const localesLong: Record<string, string> = {
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
  fr: 'Français',
  pt: 'Português',
  ru: 'Русский',
  uk: 'Українська',
  zh: '中文',
  vi: 'Tiếng Việt',
};

const localeOptions = computed(() =>
  availableLocales.map(locale => ({
    label: localesLong[locale] ?? locale,
    value: locale,
  })),
);
</script>

<template>
  <c-select
    v-model:value="locale"
    class="locale-selector-select"
    :options="localeOptions"
    placeholder="Select a language"
    w-100px
  />
</template>

<style scoped lang="less">
.locale-selector-select {
  position: relative;
  z-index: 120;
}

.locale-selector-select :deep(.c-select-dropdown) {
  z-index: 9999 !important;
}
</style>
