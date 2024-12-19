import React from 'react';
import { GridContainer as BaseColumnsContainer } from '@digitalc/block-grid-layout';

import { ReaderBlock } from '../../Reader/core';

import { GridContainerProps } from './GridContainerPropsSchema';

export default function GrtidContainerReader({ style, props }: GridContainerProps) {
  const { columns, ...restProps } = props ?? {};
  // eslint no-undef-init: "error"
  let cols;
  if (columns) {
    cols = columns.map((col) => col.childrenIds.map((childId) => <ReaderBlock key={childId} id={childId} />));
  }

  return <BaseColumnsContainer props={restProps} columns={cols} style={style} />;
}
