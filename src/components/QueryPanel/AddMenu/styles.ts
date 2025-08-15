import stylex from '@stylexjs/stylex';
import {
  backgroundColors,
  textColors,
  utility,
} from '../../primitives/colors.stylex';

export const addMenuStyles = stylex.create({
  content: {
    background: backgroundColors.surface,
    borderRadius: 4,
    borderWidth: 1,
    boxShadow: utility.elevationMedium,
    fontFamily: 'sans-serif',
    margin: 8,
    maxHeight: '50vh',
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    alignItems: 'center',
    color: {
      default: textColors.primary,
      ':is([data-disabled])': textColors.disabled,
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
      ':hover': backgroundColors.surfaceSubtle,
    },
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  tooltip: {},
});
