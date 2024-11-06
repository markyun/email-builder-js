import React from 'react';

import { Container as BaseContainer } from '@digitalc/block-container';

import { useCurrentBlockId } from '../../editor/EditorBlock';
import { setDocument, setSelectedBlockId, useDocument } from '../../editor/EditorContext';
import EditorChildrenIds from '../helpers/EditorChildrenIds';

import { ContainerProps } from './ContainerPropsSchema';

export default function ContainerEditor({ style, props }: ContainerProps) {
  const childrenIds = props?.childrenIds ?? [];

  const document = useDocument();
  const currentBlockId = useCurrentBlockId();

  return (
    <BaseContainer style={style}>
      <EditorChildrenIds
        childrenIds={childrenIds}
        onChange={({ block, blockId, containerBlockId, childrenIds }) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
                childrenIds: [blockId],
              },
            },
          };
          setDocument({
            // [blockId]: block,
            [containerBlockId]: block,
            [currentBlockId]: {
              type: 'Container',
              data: {
                ...document[currentBlockId].data,
                props: { childrenIds },
              },
            },
          });
          setSelectedBlockId(containerBlockId);
        }}
      />
    </BaseContainer>
  );
}
