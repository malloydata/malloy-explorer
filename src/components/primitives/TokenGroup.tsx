import * as React from 'react';
import Token, {DEFAULT_TOKEN_COLOR, TokenColor, TokenProps} from './Token';
import stylex from '@stylexjs/stylex';

interface TokenGroupProps {
  /**
   * An array of Token components to be rendered within the group.
   */
  children: React.ReactElement<TokenProps, typeof Token>[];

  /**
   * The color to be applied to all tokens in the group. If not provided,
   * the color will be determined by each token's individual color prop.
   */
  color?: TokenColor;
}

export default function TokenGroup({
  children,
  color = DEFAULT_TOKEN_COLOR,
}: TokenGroupProps) {
  const count = React.Children.count(children);
  return (
    <div {...stylex.props(styles.main)}>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          style: getChildStyle(index, count),
          color: getTokenColor(child, color),
        })
      )}
    </div>
  );
}

const getChildStyle = (index: number, count: number) => {
  if (index === 0) return styles.firstChild;
  if (index === count - 1) return styles.lastChild;
  return styles.innerChild;
};

const getTokenColor = (
  child: React.ReactElement<TokenProps, typeof Token>,
  groupColor?: TokenColor
) => {
  const childColor = child.props.color;
  return childColor === undefined ? groupColor : childColor;
};

const styles = stylex.create({
  main: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '1px',
  },
  firstChild: {
    borderRadius: '4px 0 0 4px',
  },
  innerChild: {
    borderRadius: null,
  },
  lastChild: {
    borderRadius: '0 4px 4px 0',
  },
});
