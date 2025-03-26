import stylex from '@stylexjs/stylex';
import {iconColors, textColors} from '../colors.stylex';
import {iconVars, labelVars} from './token.stylex';

export const tokenStyles = stylex.create({
  main: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px 8px',
    gap: '8px',
    borderRadius: '4px',
    borderWidth: '0px',
    outline: 'none',
    cursor: 'pointer',
    overflow: 'hidden',
    background: {
      default: 'rgba(230, 235, 239, 1)',
      ':hover': 'rgba(221, 226, 232, 1)',
    },
  },
  icon: {
    color: iconVars.color,
  },
  label: {
    color: labelVars.color,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
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
