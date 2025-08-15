import React from 'react';
import stylex, {StyleXStyles} from '@stylexjs/stylex';
import {textColors} from './colors.stylex';

interface RichTextProps extends React.ComponentProps<'div'> {
  children: string;
  ref?: React.RefObject<HTMLDivElement | null>;
  isTooltipContent?: boolean;
  customStyle: StyleXStyles;
}

export function RichText({
  children,
  ref,
  customStyle,
  isTooltipContent = false,
  ...props
}: RichTextProps) {
  const parts = children.split(/((?:http|https):\/\/\S*)\b/);
  const multiLine = parts.length > 1;
  const formatted = parts.map((part, idx) => {
    if (part.match(/^(http|https):/)) {
      return (
        <a
          key={idx}
          href={part}
          {...stylex.props(isTooltipContent && styles.link)}
        >
          {part}
        </a>
      );
    } else {
      return part;
    }
  });

  return (
    <div
      ref={ref}
      {...stylex.props(
        multiLine && styles.preWrap,
        multiLine && styles.breakWord,
        customStyle
      )}
      {...props}
    >
      {formatted}
    </div>
  );
}

const styles = stylex.create({
  preWrap: {
    whiteSpace: 'pre-wrap',
  },
  breakWord: {
    wordWrap: 'break-word',
  },
  link: {
    color: (textColors.link as unknown as string) + ' !important',
  },
});
