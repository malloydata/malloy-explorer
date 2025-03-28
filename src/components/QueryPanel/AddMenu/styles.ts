import stylex from '@stylexjs/stylex';
import {colors} from './colors.stylex';

export const addMenuStyles = stylex.create({
  content: {
    background: colors.background,
    borderRadius: 4,
    borderWidth: 1,
    boxShadow: `0px 2px 12px 0px ${colors.shadowElevation}`,
    fontFamily: 'sans-serif',
    margin: 8,
    maxHeight: '50vh',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1,
  },
  item: {
    alignItems: 'center',
    color: {
      default: colors.text,
      ':is([data-disabled])': colors.disabledText,
    },
    padding: 8,
    cursor: 'default',
    userSelect: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: 3,
  },
  clickable: {
    backgroundColor: {
      ':hover': colors.hover,
    },
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  tooltip: {},
});
