/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useEffect, useState} from 'react';
import * as stylex from '@stylexjs/stylex';
import * as Malloy from '@malloydata/malloy-interfaces';
import {
  CSVWriter,
  dataIterator,
  DataWriter,
  JSONWriter,
  WriteStream,
} from '../utils/download';
import {Icon} from '../primitives';
import {fontStyles} from '../primitives/styles';
import {backgroundColors, textColors} from '../primitives/colors.stylex';

export interface DownloadButtonProps {
  result?: Malloy.Result;
  name?: string;
}

export function DownloadButton({name = 'malloy', result}: DownloadButtonProps) {
  const [href, setHref] = useState('');
  const [fileName, setFileName] = useState('');
  const [format, _setFormat] = useState('csv'); // TODO: JSON

  useEffect(() => {
    const createBlob = async () => {
      if (!result?.data) {
        setHref('');
        return;
      }
      const writeStream = new MemoryWriteStream();
      let writer: DataWriter;
      let type: string;
      let fileName: string;
      if (format === 'json') {
        writer = new JSONWriter(writeStream, result);
        type = 'text/json';
        fileName = `${name}.json`;
      } else {
        writer = new CSVWriter(writeStream, result);
        type = 'text/csv';
        fileName = `${name}.csv`;
      }
      const rowStream = dataIterator(result);
      await writer.process(rowStream);
      writeStream.close();
      const data = writeStream.data;

      const blob = new Blob([data], {type});
      setHref(window.URL.createObjectURL(blob));
      setFileName(fileName);
    };
    void createBlob();
  }, [name, format, result]);

  useEffect(() => {
    return () => {
      if (href) {
        window.URL.revokeObjectURL(href);
      }
    };
  }, [href]);

  if (href) {
    return (
      <a
        href={href}
        download={fileName}
        {...stylex.props(styles.link, fontStyles.body)}
        style={{
          textDecoration: 'none',
          color: textColors.primary,
        }}
      >
        <Icon name="download" />
        <div>Download CSV</div>
      </a>
    );
  } else {
    return null;
  }
}

class MemoryWriteStream implements WriteStream {
  _data: string[] = [];

  write(data: string) {
    this._data.push(data);
  }

  close() {}

  get data(): string {
    return this._data.join('');
  }
}

const styles = stylex.create({
  link: {
    display: 'flex',
    alignContent: 'center',
    gap: 8,
    background: {
      default: 'transparent',
      ':hover': backgroundColors.overlayHover,
      ':active': backgroundColors.overlayActive,
    },
    borderRadius: 8,
    padding: 4,
  },
});
