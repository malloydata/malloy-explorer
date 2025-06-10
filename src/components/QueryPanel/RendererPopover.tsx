/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import * as Popover from '@radix-ui/react-popover';
import {
  RENDERER_PREFIX,
  VizOption,
  VizStringOption,
  VizSelectOption,
  VizBooleanOption,
  VizName,
} from '../utils/renderer';
import {ASTQuery, ASTView} from '@malloydata/malloy-query-builder';
import {Button, Token} from '../primitives';
import stylex, {StyleXStyles} from '@stylexjs/stylex';
import {fontStyles} from '../primitives/styles';
import {QueryEditorContext} from '../../contexts/QueryEditorContext';
import {SelectDropdown} from '../primitives/SelectDropdown';

export interface RendererPopoverProps {
  rootQuery: ASTQuery;
  viz: VizName;
  options: VizOption[];
  view: ASTQuery | ASTView;
  customStyle?: StyleXStyles;
}

export function RendererPopover({
  rootQuery,
  viz,
  options,
  view,
  customStyle,
}: RendererPopoverProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root onOpenChange={open => setOpen(open)} open={open}>
      <Popover.Trigger asChild>
        <Token
          icon="gear"
          customStyle={{...customStyle, ...dialogStyles.trigger}}
        />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content align="end">
          <RendererEditor
            rootQuery={rootQuery}
            view={view}
            viz={viz}
            options={options}
            setOpen={setOpen}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export interface RendererEditorProps {
  rootQuery: ASTQuery;
  viz: VizName;
  options: VizOption[];
  view: ASTQuery | ASTView;
  customStyle?: StyleXStyles;
  setOpen: (open: boolean) => void;
}

export function RendererEditor({
  rootQuery,
  view,
  viz,
  options,
  setOpen,
}: RendererEditorProps) {
  const {setQuery} = useContext(QueryEditorContext);
  const [current, setCurrent] = useState<Record<string, string>>();

  useEffect(() => {
    const current: Record<string, string> = {};
    const currentTag = view.getTag(RENDERER_PREFIX);
    for (const option of options) {
      current[option.name] =
        currentTag.text('viz', option.name) ?? option.default.toString();
    }
    setCurrent(current);
  }, [options, view, viz]);

  if (!current) {
    return null;
  }

  return (
    <div {...stylex.props(dialogStyles.content, fontStyles.body)}>
      <div {...stylex.props(dialogStyles.editor)}>
        <div {...stylex.props(dialogStyles.editorGrid)}>
          {options.map(option =>
            option.type === 'boolean' ? (
              <BooleanEditor
                option={option}
                current={current}
                setCurrent={setCurrent}
                key={option.name}
              />
            ) : option.type === 'string' ? (
              <StringEditor
                option={option}
                current={current}
                setCurrent={setCurrent}
                key={option.name}
              />
            ) : (
              // option.type === 'select
              <SelectEditor
                option={option}
                current={current}
                setCurrent={setCurrent}
                key={option.name}
              />
            )
          )}
        </div>
        <div {...stylex.props(dialogStyles.editorRow)}>
          <Button
            label="Cancel"
            onClick={() => {
              setOpen(false);
            }}
            customStyle={dialogStyles.editorCell}
          />
          <Button
            variant="primary"
            label="Apply"
            onClick={() => {
              if (!view.getTag(RENDERER_PREFIX).has('viz', viz)) {
                view.setTagProperty(['viz'], viz, RENDERER_PREFIX);
              }
              for (const option of options) {
                if (current[option.name] !== option.default.toString()) {
                  view.setTagProperty(
                    ['viz', option.name],
                    current[option.name],
                    RENDERER_PREFIX
                  );
                } else {
                  view.removeTagProperty(['viz', option.name], RENDERER_PREFIX);
                }
              }
              setQuery?.(rootQuery.build());
              setOpen(false);
            }}
            customStyle={dialogStyles.editorCell}
          />
        </div>
      </div>
    </div>
  );
}

interface BooleanEditorProps {
  option: VizBooleanOption;
  current: Record<string, string>;
  setCurrent: (current: Record<string, string>) => void;
}

function BooleanEditor({current, option, setCurrent}: BooleanEditorProps) {
  return (
    <>
      <div {...stylex.props(dialogStyles.left)} key={option.name}>
        <input
          type="checkbox"
          checked={current[option.name] === 'true'}
          onChange={({target: {checked}}) => {
            setCurrent({
              ...current,
              [option.name]: checked.toString(),
            });
          }}
        />
      </div>
      <label title={option.description} key={`${option.name}-label`}>
        {option.label}
      </label>
    </>
  );
}

interface StringEditorProps {
  option: VizStringOption;
  current: Record<string, string>;
  setCurrent: (current: Record<string, string>) => void;
}

function StringEditor({current, option, setCurrent}: StringEditorProps) {
  return (
    <>
      <div {...stylex.props(dialogStyles.left)} key={`${option.name}-label`}>
        <label>{option.label}:</label>
      </div>
      <input
        value={current[option.name]}
        onChange={({target: {value}}) => {
          setCurrent({...current, [option.name]: value});
        }}
        key={option.name}
      />
    </>
  );
}

interface SelectEditorProps {
  option: VizSelectOption;
  current: Record<string, string>;
  setCurrent: (current: Record<string, string>) => void;
}

function SelectEditor({current, option, setCurrent}: SelectEditorProps) {
  return (
    <>
      <div {...stylex.props(dialogStyles.left)} key={`${option.name}-label`}>
        <label>{option.label}:</label>
      </div>
      <SelectDropdown
        value={current[option.name]}
        options={option.options}
        onChange={value => {
          setCurrent({...current, [option.name]: value});
        }}
        key={option.name}
      />
    </>
  );
}
const dialogStyles = stylex.create({
  trigger: {
    height: 'calc(100% - 8px)',
  },
  left: {
    display: 'flex',
    justifyContent: 'right',
    fontWeight: 'bold',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    boxShadow:
      '0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 2px 12px 0 rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    minWidth: 240,
    maxWidth: 280,
    gap: 8,
  },
  editor: {
    width: 250,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  editorGrid: {
    display: 'grid',
    gridTemplateColumns: 'min-content 1fr',
    gap: 8,
  },
  editorRow: {
    display: 'flex',
    gap: 8,
  },
  editorCell: {
    flexGrow: 1,
  },
  input: {
    border: '1px solid #e0e0e0',
    color: 'rgb(95, 99, 104)',
    padding: '4px 8px 4px 8px',
    borderRadius: 5,
  },
});
