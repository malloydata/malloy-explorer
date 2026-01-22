/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {useContext, useEffect, useState} from 'react';
import * as stylex from '@stylexjs/stylex';
import {
  CSVWriter,
  dataIterator,
  DataWriter,
  JSONWriter,
  WriteStream,
} from '../utils/download';
import {Button, Icon} from '../primitives';
import {fontStyles} from '../primitives/styles';
import {backgroundColors, textColors} from '../primitives/colors.stylex';
import {QueryEditorContext} from '../../contexts/QueryEditorContext';
import {SubmittedQuery} from '../..';

export interface DownloadButtonProps {
  source: Malloy.SourceInfo;
  submittedQuery?: SubmittedQuery;
  name?: string;
}

export function DownloadButton({
  name = 'malloy',
  source,
  submittedQuery,
}: DownloadButtonProps) {
  const [href, setHref] = useState('');
  const [fileName, setFileName] = useState('');
  const [format, _setFormat] = useState('csv'); // TODO: JSON
  const {onDownload} = useContext(QueryEditorContext);

  useEffect(() => {
    if (onDownload) return;

    const result = submittedQuery?.response?.result;

    if (!result) {
      setHref('');
      return;
    }

    const createBlob = async () => {
      if (!submittedQuery?.response) {
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
  }, [name, format, onDownload, submittedQuery]);

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
  } else if (onDownload && submittedQuery?.response?.result) {
    return (
      <Button
        onClick={() =>
          onDownload({
            source,
            submittedQuery,
            name,
            format: 'csv',
          })
        }
        icon="download"
        label="Download CSV"
      />
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
