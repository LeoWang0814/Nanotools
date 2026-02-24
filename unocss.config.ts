import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

import { presetScrollbar } from 'unocss-preset-scrollbar';

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetTypography(), presetScrollbar()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      primary: '#4f85e7',

    },
  },
  shortcuts: {
    'pretty-scrollbar': 'scrollbar scrollbar-rounded scrollbar-thumb-color-#b5c7e4 scrollbar-track-color-#e5edf9 dark:scrollbar-thumb-color-#4a6289 dark:scrollbar-track-color-#1c2940',
    'divider': 'h-1px bg-current op-10',
    'bg-surface': 'bg-#f8fbff dark:bg-#15233a',
    'bg-background': 'bg-#ecf3ff dark:bg-#0f1b2d',
  },
});
