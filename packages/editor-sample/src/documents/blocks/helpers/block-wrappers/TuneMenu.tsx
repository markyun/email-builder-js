import React from 'react';

import { ArrowDownwardOutlined, ArrowUpwardOutlined, DeleteOutlined, CopyAll } from '@mui/icons-material';
import { IconButton, Paper, Stack, SxProps, Tooltip } from '@mui/material';

import { TEditorBlock } from '../../../editor/core';
import { resetDocument, setSelectedBlockId, useDocument } from '../../../editor/EditorContext';
import { ColumnsContainerProps } from '../../ColumnsContainer/ColumnsContainerPropsSchema';

const sx: SxProps = {
  position: 'absolute',
  top: 0,
  left: -56,
  borderRadius: 64,
  paddingX: 0.5,
  paddingY: 1,
  zIndex: 'fab',
};

type Props = {
  blockId: string;
};
export default function TuneMenu({ blockId }: Props) {
  const document = useDocument();
  const generateNewId = (prefix = 'block') => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const cloneBlockRecursively = (blockId, document, idMapping = {}) => {
    const originalBlock = document[blockId];
    const newBlockId = generateNewId(blockId.split('-')[0]);
    idMapping[blockId] = newBlockId;

    // Deep clone the block
    const clonedBlock = JSON.parse(JSON.stringify(originalBlock));

    // Update childrenIds and clone them recursively
    const updateAndCloneChildrenIds = (childrenIds) => {
      if (!childrenIds) return childrenIds;
      return childrenIds.map(childId => {
        if (!idMapping[childId]) {
          const { newDocument, newMapping } = cloneBlockRecursively(childId, document, idMapping);
          Object.assign(document, newDocument);
          Object.assign(idMapping, newMapping);
        }
        return idMapping[childId];
      });
    };

    // Clone childrenIds in data.props if they exist
    if (clonedBlock.data?.props?.childrenIds) {
      clonedBlock.data.props.childrenIds = updateAndCloneChildrenIds(clonedBlock.data.props.childrenIds);
    }

    // Clone columns' childrenIds if they exist
    if (clonedBlock.data?.props?.columns) {
      clonedBlock.data.props.columns = clonedBlock.data.props.columns.map(column => ({
        ...column,
        childrenIds: updateAndCloneChildrenIds(column.childrenIds),
      }));
    }

    return {
      newDocument: { ...document, [newBlockId]: clonedBlock },
      newMapping: idMapping,
      newBlockId,
    };
  };

  const handleBlockDuplicateClick = () => {
    const { newDocument, newBlockId } = cloneBlockRecursively(blockId, document);
    newDocument['root'].data.childrenIds.push(newBlockId);
    resetDocument(newDocument);
  };

  // const handleBlockDuplicateClick = () => {
  //   const block = document[blockId] as TEditorBlock;
  //   const newBlockId = `block-${Date.now()}`;
  //   const blockCopy = Object.assign({}, block);
  //   const nDocument = { ...document, [newBlockId]: blockCopy };
  //   document['root'].data.childrenIds.push(newBlockId);
  //   resetDocument(nDocument);
  // };

  const handleDeleteClick = () => {
    const filterChildrenIds = (childrenIds: string[] | null | undefined) => {
      if (!childrenIds) {
        return childrenIds;
      }
      return childrenIds.filter((f) => f !== blockId);
    };
    const nDocument: typeof document = { ...document };
    for (const [id, b] of Object.entries(nDocument)) {
      const block = b as TEditorBlock;
      if (id === blockId) {
        continue;
      }
      switch (block.type) {
        case 'EmailLayout':
          nDocument[id] = {
            ...block,
            data: {
              ...block.data,
              childrenIds: filterChildrenIds(block.data.childrenIds),
            },
          };
          break;
        case 'Container':
          nDocument[id] = {
            ...block,
            data: {
              ...block.data,
              props: {
                ...block.data.props,
                childrenIds: filterChildrenIds(block.data.props?.childrenIds),
              },
            },
          };
          break;
        case 'ColumnsContainer':
          nDocument[id] = {
            type: 'ColumnsContainer',
            data: {
              style: block.data.style,
              props: {
                ...block.data.props,
                columns: block.data.props?.columns?.map((c) => ({
                  childrenIds: filterChildrenIds(c.childrenIds),
                })),
              },
            } as ColumnsContainerProps,
          };
          break;
        default:
          nDocument[id] = block;
      }
    }
    delete nDocument[blockId];
    resetDocument(nDocument);
  };

  const handleMoveClick = (direction: 'up' | 'down') => {
    const moveChildrenIds = (ids: string[] | null | undefined) => {
      if (!ids) {
        return ids;
      }
      const index = ids.indexOf(blockId);
      if (index < 0) {
        return ids;
      }
      const childrenIds = [...ids];
      if (direction === 'up' && index > 0) {
        [childrenIds[index], childrenIds[index - 1]] = [childrenIds[index - 1], childrenIds[index]];
      } else if (direction === 'down' && index < childrenIds.length - 1) {
        [childrenIds[index], childrenIds[index + 1]] = [childrenIds[index + 1], childrenIds[index]];
      }
      return childrenIds;
    };
    const nDocument: typeof document = { ...document };
    for (const [id, b] of Object.entries(nDocument)) {
      const block = b as TEditorBlock;
      if (id === blockId) {
        continue;
      }
      switch (block.type) {
        case 'EmailLayout':
          nDocument[id] = {
            ...block,
            data: {
              ...block.data,
              childrenIds: moveChildrenIds(block.data.childrenIds),
            },
          };
          break;
        case 'Container':
          nDocument[id] = {
            ...block,
            data: {
              ...block.data,
              props: {
                ...block.data.props,
                childrenIds: moveChildrenIds(block.data.props?.childrenIds),
              },
            },
          };
          break;
        case 'ColumnsContainer':
          nDocument[id] = {
            type: 'ColumnsContainer',
            data: {
              style: block.data.style,
              props: {
                ...block.data.props,
                columns: block.data.props?.columns?.map((c) => ({
                  childrenIds: moveChildrenIds(c.childrenIds),
                })),
              },
            } as ColumnsContainerProps,
          };
          break;
        default:
          nDocument[id] = block;
      }
    }

    resetDocument(nDocument);
    setSelectedBlockId(blockId);
  };

  return (
    <Paper sx={sx} onClick={(ev) => ev.stopPropagation()}>
      <Stack>
        <Tooltip title="Move up" placement="left-start">
          <IconButton onClick={() => handleMoveClick('up')} sx={{ color: 'text.primary' }}>
            <ArrowUpwardOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Move down" placement="left-start">
          <IconButton onClick={() => handleMoveClick('down')} sx={{ color: 'text.primary' }}>
            <ArrowDownwardOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
        <hr style={{margin: '8px 0px',flexShrink: 0,border:' 0.6px solid rgba(0, 0, 0, 0.12)'}}></hr>
        <Tooltip title="Duplicate" placement="left-start">
          <IconButton sx={{ color: 'text.primary' }} onClick={handleBlockDuplicateClick}>
            <CopyAll fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete" placement="left-start">
          <IconButton onClick={handleDeleteClick} sx={{ color: 'text.primary' }}>
            <DeleteOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Paper>
  );
}
