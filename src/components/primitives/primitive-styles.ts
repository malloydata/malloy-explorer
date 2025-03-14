import stylex from '@stylexjs/stylex';
import {backgroundColors, iconColors, textColors} from './colors.stylex';

export const backgroundColorStyles = stylex.create({
  gray: {
    background: backgroundColors.gray,
  },
  purple: {
    background: backgroundColors.purple,
  },
  green: {
    background: backgroundColors.green,
  },
  cyan: {
    background: backgroundColors.cyan,
  },
});

export const textColorStyles = stylex.create({
  primary: {
    color: textColors.primary,
  },
  secondary: {
    color: textColors.secondary,
  },
  disabled: {
    color: textColors.disabled,
  },
  primaryOnDarkMedia: {
    color: textColors.primaryOnDarkMedia,
  },
  gray: {
    color: textColors.gray,
  },
  purple: {
    color: textColors.purple,
  },
  green: {
    color: textColors.green,
  },
  cyan: {
    color: textColors.cyan,
  },
});

export const iconColorStyles = stylex.create({
  primary: {
    color: iconColors.primary,
  },
  secondary: {
    color: iconColors.secondary,
  },
  disabled: {
    color: iconColors.disabled,
  },
  primaryOnMedia: {
    color: iconColors.primaryOnMedia,
  },
  gray: {
    color: iconColors.gray,
  },
  purple: {
    color: iconColors.purple,
  },
  green: {
    color: iconColors.green,
  },
  cyan: {
    color: iconColors.cyan,
  },
});
