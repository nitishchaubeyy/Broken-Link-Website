import { CSSProperties } from 'react';
import { theme } from '@/theme';

const colors = theme.colors;
const getTextColor = (isDark: boolean) => (isDark ? theme.white : colors.gray[7]);
const getSubTextColor = (isDark: boolean) => (isDark ? colors.gray[2] : colors.gray[7]);

export const footerStyles = {
  container: {
    maxWidth: '75rem',
    margin: '3rem auto 0',
    padding: '0 2.5rem',
  } satisfies CSSProperties,

  gradientText: { fontWeight: 'bold', fontSize: '1.4em' },

  text: (isDark: boolean): CSSProperties => ({
    color: getTextColor(isDark),
    paddingBlock: theme.spacing.lg,
  }),

  header: (isDark: boolean): CSSProperties => ({
    fontWeight: 'bold',
    color: isDark ? theme.white : theme.black,
  }),

  topGrid: (isMobileView: boolean): CSSProperties => ({
    display: 'grid',
    gridTemplateColumns: isMobileView ? '1fr' : 'repeat(3, 1fr)',
    gap: theme.spacing.xl,
    paddingBottom: '3rem',
  }),

  bottomGrid: (isMobileView: boolean): CSSProperties => ({
    display: 'grid',
    gridTemplateColumns: isMobileView ? '1fr' : 'repeat(2, 1fr)',
    gap: theme.spacing.xl,
    paddingTop: '1rem',
    paddingBottom: '4rem',
    alignItems: 'center',
  }),

  openSrcTxt: (isMobileView: boolean, isDark: boolean): CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: isMobileView ? 'center' : 'flex-start',
    gap: '.4rem',
    fontSize: theme.fontSizes.sm,
    color: getSubTextColor(isDark),
  }),

  rightsTxt: (isMobileView: boolean, isDark: boolean): CSSProperties => ({
    fontSize: theme.fontSizes.sm,
    color: getSubTextColor(isDark),
    textAlign: isMobileView ? 'center' : 'end',
  }),

  gradientConfig: {
    from: colors.cyan[4],
    to: colors.blue[6],
  },

  iconSize: 16,
};