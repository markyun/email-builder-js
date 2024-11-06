import React from 'react';

import { GridContainer as BaseColumnsContainer } from '@digitalc/block-grid-layout';

import { useCurrentBlockId } from '../../editor/EditorBlock';
import { setDocument, setSelectedBlockId } from '../../editor/EditorContext';
import EditorChildrenIds, { EditorChildrenChange } from '../helpers/EditorChildrenIds';

import GridContainerPropsSchema, { GridContainerProps } from './ColumnsContainerPropsSchema';

const EMPTY_COLUMNS = [{ childrenIds: [] }, { childrenIds: [] }, { childrenIds: [] }];

export default function GridContainerEditor({ style, props }: GridContainerProps) {
  const currentBlockId = useCurrentBlockId();

  const { columns, ...restProps } = props ?? {};
  const columnsValue = columns ?? EMPTY_COLUMNS;

  const updateColumn = (columnIndex, { block, blockId, containerBlockId, childrenIds }: EditorChildrenChange) => {
    const nColumns = [...columnsValue];
    nColumns[columnIndex] = { childrenIds };
    const ContainerBlock = {
      type: 'Container',
      data: {
        style: {
          padding: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          },
        },
        props: {
          childrenIds:
            [blockId]
          ,
        },
      },
    };

    setDocument({
      [blockId]: block,
      [containerBlockId]: ContainerBlock,
      [currentBlockId]: {
        type: 'GridContainer',
        data: GridContainerPropsSchema.parse({
          style,
          props: {
            ...restProps,
            columns: nColumns,
          },
        }),
      },
    });
    setSelectedBlockId(blockId);
  };

  return (
    <BaseColumnsContainer
      props={restProps}
      style={style}
      columns={[
        <EditorChildrenIds childrenIds={columns?.[0]?.childrenIds} onChange={(change) => updateColumn(0, change)} />,
        <EditorChildrenIds childrenIds={columns?.[1]?.childrenIds} onChange={(change) => updateColumn(1, change)} />,
        <EditorChildrenIds childrenIds={columns?.[2]?.childrenIds} onChange={(change) => updateColumn(2, change)} />,
        <EditorChildrenIds childrenIds={columns?.[3]?.childrenIds} onChange={(change) => updateColumn(3, change)} />,
        <EditorChildrenIds childrenIds={columns?.[4]?.childrenIds} onChange={(change) => updateColumn(4, change)} />,
        <EditorChildrenIds childrenIds={columns?.[5]?.childrenIds} onChange={(change) => updateColumn(5, change)} />,
      ]}
    />
  );
}
