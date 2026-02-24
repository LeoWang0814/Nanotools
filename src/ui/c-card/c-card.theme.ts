import { defineThemes } from '../theme/theme.models';

export const { useTheme } = defineThemes({
  dark: {
    backgroundColor: 'rgba(21, 32, 52, 0.82)',
    borderColor: 'rgba(95, 121, 163, 0.45)',
  },
  light: {
    backgroundColor: 'rgba(250, 253, 255, 0.82)',
    borderColor: 'rgba(126, 155, 198, 0.32)',
  },
});
