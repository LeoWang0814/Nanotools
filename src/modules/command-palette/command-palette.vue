<script setup lang="ts">
import { storeToRefs } from 'pinia';
import _ from 'lodash';
import { useCommandPaletteStore } from './command-palette.store';
import type { PaletteOption } from './command-palette.types';

const panelRef = ref<HTMLElement>();
const inputRef = ref();
const router = useRouter();
const isMac = computed(() => window.navigator.userAgent.toLowerCase().includes('mac'));
const isDropdownOpen = ref(false);

const commandPaletteStore = useCommandPaletteStore();
const { searchPrompt, filteredSearchResult } = storeToRefs(commandPaletteStore);

const flattenedOptions = computed(() =>
  _.chain(filteredSearchResult.value).values().flatten().value(),
);
const hasOptions = computed(() => flattenedOptions.value.length > 0);

onClickOutside(panelRef, () => {
  close(false);
});

useEventListener(window, 'keydown', (event: KeyboardEvent) => {
  const isShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k';

  if (isShortcut) {
    event.preventDefault();
    open();
    return;
  }

  if (event.key === 'Escape' && isDropdownOpen.value) {
    event.preventDefault();
    close();
  }
});

function open() {
  isDropdownOpen.value = true;
  nextTick(() => inputRef.value?.focus?.());
}

function close(clearPrompt = true) {
  isDropdownOpen.value = false;
  if (clearPrompt) {
    searchPrompt.value = '';
  }
  selectedOptionIndex.value = 0;
}

const selectedOptionIndex = ref(0);

function handleKeydown(event: KeyboardEvent) {
  if (!isDropdownOpen.value) {
    return;
  }

  const { key } = event;
  const isEnterPressed = key === 'Enter';
  const isArrowUpOrDown = ['ArrowUp', 'ArrowDown'].includes(key);
  const isArrowDown = key === 'ArrowDown';

  if (isArrowUpOrDown) {
    event.preventDefault();
    const increment = isArrowDown ? 1 : -1;
    const maxIndex = Math.max(flattenedOptions.value.length - 1, 0);

    selectedOptionIndex.value = Math.min(Math.max(selectedOptionIndex.value + increment, 0), maxIndex);

    return;
  }

  if (isEnterPressed) {
    event.preventDefault();
    const option = flattenedOptions.value[selectedOptionIndex.value];

    activateOption(option);
  }
}

function getOptionIndex(option: PaletteOption) {
  return flattenedOptions.value.findIndex(o => o === option);
}

watch(searchPrompt, () => {
  selectedOptionIndex.value = 0;
});

watch(flattenedOptions, options => {
  selectedOptionIndex.value = Math.min(selectedOptionIndex.value, Math.max(options.length - 1, 0));
});

function activateOption(option?: PaletteOption) {
  if (!option) {
    return;
  }

  const { closeOnSelect } = option;

  if (option.action) {
    option.action();

    if (closeOnSelect) {
      close();
    }

    return;
  }

  const closeAfterNavigation = closeOnSelect || _.isUndefined(closeOnSelect);

  if (option.to) {
    router.push(option.to);

    if (closeAfterNavigation) {
      close();
    }
    return;
  }

  if (option.href) {
    window.open(option.href, '_blank');

    if (closeAfterNavigation) {
      close();
    }
  }
}
</script>

<template>
  <div ref="panelRef" class="command-palette">
    <c-input-text
      ref="inputRef"
      v-model:value="searchPrompt"
      raw-text
      clearable
      placeholder="Type to search a tool or a command..."
      @focus="open"
      @keydown="handleKeydown"
    >
      <template #prefix>
        <div class="prefix-icon">
          <icon-mdi-search />
        </div>
      </template>
      <template #suffix>
        <div class="palette-shortcut">
          {{ isMac ? 'Cmd' : 'Ctrl' }} + K
        </div>
      </template>
    </c-input-text>

    <div v-if="isDropdownOpen" class="palette-dropdown">
      <template v-if="hasOptions">
        <div v-for="(options, category) in filteredSearchResult" :key="category" class="palette-category">
          <div class="category-title">
            {{ category }}
          </div>
          <command-palette-option
            v-for="option in options"
            :key="`${category}-${option.name}`"
            :option="option"
            :selected="selectedOptionIndex === getOptionIndex(option)"
            @activated="activateOption"
          />
        </div>
      </template>
      <div v-else class="palette-empty">
        No matching tool or command.
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.command-palette {
  position: relative;
  width: 100%;
  z-index: 80;
}

.prefix-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  opacity: 0.6;
}

.palette-shortcut {
  display: none;
  font-size: 11px;
  opacity: 0.55;
  font-weight: 700;
  letter-spacing: 0.04em;
  white-space: nowrap;
}

.command-palette :deep(.input-wrapper) {
  border-radius: 12px;
  padding-left: 12px;
}

.command-palette :deep(.input) {
  padding-top: 10px;
  padding-bottom: 10px;
}

.palette-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  z-index: 120;
  max-height: min(65vh, 480px);
  overflow-y: auto;
  border-radius: 14px;
  border: 1px solid rgba(126, 153, 193, 0.35);
  background: rgba(244, 250, 255, 0.96);
  backdrop-filter: blur(14px);
  padding: 8px;
  box-shadow: 0 18px 38px rgba(34, 66, 109, 0.2);
}

.palette-category + .palette-category {
  margin-top: 8px;
}

.category-title {
  padding: 8px 10px 4px;
  font-size: 11px;
  letter-spacing: 0.08em;
  font-weight: 700;
  text-transform: uppercase;
  color: rgba(46, 78, 125, 0.72);
}

.palette-empty {
  text-align: center;
  padding: 14px;
  font-size: 13px;
  color: rgba(45, 71, 108, 0.7);
}

:global(.dark) .palette-dropdown {
  border-color: rgba(103, 130, 176, 0.52);
  background: rgba(18, 29, 47, 0.96);
  box-shadow: 0 22px 42px rgba(2, 8, 17, 0.5);
}

:global(.dark) .category-title {
  color: rgba(183, 204, 239, 0.76);
}

:global(.dark) .palette-empty {
  color: rgba(193, 214, 246, 0.78);
}

@media (min-width: 768px) {
  .palette-shortcut {
    display: inline-flex;
  }
}
</style>
