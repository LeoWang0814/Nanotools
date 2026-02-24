import type { GlobalThemeOverrides } from 'naive-ui';

export const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#4f85e7',
    primaryColorHover: '#5c92ee',
    primaryColorPressed: '#3f74d6',
    primaryColorSuppl: '#5f89dc',
  },

  Menu: {
    itemHeight: '32px',
  },

  Layout: {
    color: '#eef4ff',
    siderColor: '#f4f8ff',
    siderBorderColor: 'rgba(122, 151, 191, 0.28)',
  },

  Card: {
    color: 'rgba(250, 253, 255, 0.82)',
    borderColor: 'rgba(126, 155, 198, 0.32)',
  },

  Table: {
    tdColor: 'rgba(248, 252, 255, 0.85)',
    thColor: 'rgba(233, 243, 255, 0.85)',
  },

  AutoComplete: {
    peers: {
      InternalSelectMenu: { height: '500px' },
    },
  },
};

export const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#6d9af0',
    primaryColorHover: '#7aa7f5',
    primaryColorPressed: '#5f89db',
    primaryColorSuppl: '#709de9',
  },

  Notification: {
    color: '#1b2740',
  },

  AutoComplete: {
    peers: {
      InternalSelectMenu: { height: '500px', color: '#182235' },
    },
  },

  Menu: {
    itemHeight: '32px',
  },

  Layout: {
    color: '#101a2b',
    siderColor: '#131f33',
    siderBorderColor: 'rgba(99, 125, 171, 0.45)',
  },

  Card: {
    color: 'rgba(21, 32, 52, 0.82)',
    borderColor: 'rgba(95, 121, 163, 0.45)',
  },

  Table: {
    tdColor: 'rgba(18, 29, 48, 0.84)',
    thColor: 'rgba(30, 43, 67, 0.88)',
  },
};
