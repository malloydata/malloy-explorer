import stylex from '@stylexjs/stylex';
import {backgroundColors, iconColors, textColors} from '../colors.stylex';
import {iconVars, labelVars} from './token.stylex';

export const tokenStyles = stylex.create({
  main: {
    display: 'inline-grid',
    gridAutoFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    borderRadius: '4px',
    borderWidth: '0px',
    outline: 'none',
    cursor: 'pointer',
    overflow: 'hidden',
    background: {
      default: backgroundColors.token,
      ':hover': 'rgba(221, 226, 232, 1)',
    },
    position: 'relative',
  },
  icon: {
    color: iconVars.color,
  },
  label: {
    color: labelVars.color,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
});

export const tokenColorVariants = stylex.create({
  default: {
    [iconVars.color]: iconColors.primary,
    [labelVars.color]: textColors.primary,
  },
  purple: {
    [iconVars.color]: iconColors.purple,
    [labelVars.color]: textColors.purple,
  },
  green: {
    [iconVars.color]: iconColors.green,
    [labelVars.color]: textColors.green,
  },
  cyan: {
    [iconVars.color]: iconColors.cyan,
    [labelVars.color]: textColors.cyan,
  },
});

export const tokenSizeVariants = stylex.create({
  default: {
    padding: '4px 8px',
  },
  compact: {
    padding: '2px 4px',
  },
});
