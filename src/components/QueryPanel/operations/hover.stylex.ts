import stylex from '@stylexjs/stylex';

export const hoverActionsVars = stylex.defineVars({
  display: 'none',
});

export const hoverStyles = stylex.create({
  main: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    gap: '4px',
    cursor: 'pointer',
    [hoverActionsVars.display]: {
      default: 'none',
      ':hover': 'inline-flex',
    },
  },
  hoverActions: {
    display: hoverActionsVars.display,
    flexShrink: 0,
  },
});
