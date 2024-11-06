import React from 'react';

import { ArrowDownwardOutlined, ArrowUpwardOutlined, DeleteOutlined, CopyAll } from '@mui/icons-material';
import { IconButton, Paper, Stack, SxProps, Tooltip } from '@mui/material';

import { TEditorBlock } from '../../../editor/core';
import { resetDocument, setSelectedBlockId, useDocument } from '../../../editor/EditorContext';
import { ColumnsContainerProps } from '../../ColumnsContainer/ColumnsContainerPropsSchema';
import { GridContainerProps } from '../../GridContainer/ColumnsContainerPropsSchema';

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

// 左侧 浮动按钮，上下移动 删除 ，copy
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

    // 获取当前块的类型
    const currentBlockType = document[blockId]?.type;

    // 遍历新文档，找到当前块的父节点并添加新块ID
    for (const [id, b] of Object.entries(newDocument)) {
      const block = b as TEditorBlock;
      if (id === blockId) {
        // eslint-disable-next-line no-continue
        continue; // 跳过当前块的处理
      }
      switch (block.type) {
        case 'EmailLayout':
          if (block.data.childrenIds.includes(blockId)) {
            const index = block.data.childrenIds.indexOf(blockId);
            newDocument[id] = {
              ...block,
              data: {
                ...block.data,
                childrenIds: [
                  ...block.data.childrenIds.slice(0, index + 1),
                  newBlockId,
                  ...block.data.childrenIds.slice(index + 1),
                ],
              },
            };
          }
          break;
        case 'Container':
          if (block.data.props?.childrenIds?.includes(blockId)) {
            const index = block.data.props.childrenIds.indexOf(blockId);
            newDocument[id] = {
              ...block,
              data: {
                ...block.data,
                props: {
                  ...block.data.props,
                  childrenIds: [
                    ...block.data.props.childrenIds.slice(0, index + 1),
                    newBlockId,
                    ...block.data.props.childrenIds.slice(index + 1),
                  ],
                },
              },
            };
          }
          break;
        case 'GridContainer':
          if (block.data.props?.columns?.some(column => column.childrenIds.includes(blockId))) {
            const columnIndex = block.data.props.columns.findIndex(column => column.childrenIds.includes(blockId));
            const nextColumnIndex = columnIndex + 1;

            if (currentBlockType === 'Container' && nextColumnIndex < block.data.props.columns.length) {
              // 如果复制的块是 Container 类型且存在下一个列，将新块插入到下一个列的 childrenIds 中
              block.data.props.columns[nextColumnIndex].childrenIds.unshift(newBlockId);
            } else {
              // 否则，将新块插入到当前列的 childrenIds 中
              const currentColumn = block.data.props.columns[columnIndex];
              const index = currentColumn.childrenIds.indexOf(blockId);
              currentColumn.childrenIds = [
                ...currentColumn.childrenIds.slice(0, index + 1),
                newBlockId,
                ...currentColumn.childrenIds.slice(index + 1),
              ];
            }

            newDocument[id] = {
              type: 'GridContainer',
              data: {
                style: block.data.style,
                props: {
                  ...block.data.props,
                },
              } as GridContainerProps,
            };
          }
          break;
        case 'ColumnsContainer':
          if (block.data.props?.columns?.some(column => column.childrenIds.includes(blockId))) {
            const columnIndex = block.data.props.columns.findIndex(column => column.childrenIds.includes(blockId));
            const nextColumnIndex = columnIndex + 1;

            if (currentBlockType === 'Container' && nextColumnIndex < block.data.props.columns.length) {
              // 如果复制的块是 Container 类型且存在下一个列，将新块插入到下一个列的 childrenIds 中
              block.data.props.columns[nextColumnIndex].childrenIds.unshift(newBlockId);
            } else {
              // 否则，将新块插入到当前列的 childrenIds 中
              const currentColumn = block.data.props.columns[columnIndex];
              const index = currentColumn.childrenIds.indexOf(blockId);
              currentColumn.childrenIds = [
                ...currentColumn.childrenIds.slice(0, index + 1),
                newBlockId,
                ...currentColumn.childrenIds.slice(index + 1),
              ];
            }

            newDocument[id] = {
              type: 'ColumnsContainer',
              data: {
                style: block.data.style,
                props: {
                  ...block.data.props,
                },
              } as ColumnsContainerProps,
            };
          }
          break;
        default:
          newDocument[id] = block;
      }
    }

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
        // eslint-disable-next-line no-continue
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
        case 'GridContainer':
          nDocument[id] = {
            type: 'GridContainer',
            data: {
              style: block.data.style,
              props: {
                ...block.data.props,
                columns: block.data.props?.columns?.map((c) => ({
                  childrenIds: filterChildrenIds(c.childrenIds),
                })),
              },
            } as GridContainerProps,
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
    const currentBlockType = document[blockId]?.type;

    for (const [id, b] of Object.entries(nDocument)) {
      const block = b as TEditorBlock;
      if (id === blockId) {
        // eslint-disable-next-line no-continue
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
          if (block.data.props?.columns?.some(column => column.childrenIds.includes(blockId))) {
            const columnIndex = block.data.props.columns.findIndex(column => column.childrenIds.includes(blockId));
            const column = block.data.props.columns[columnIndex];

            if (currentBlockType === 'Container') {
              // 如果当前块是 Container 类型，进行 columns[index].childrenIds 的顺序交换
              const newIndex = direction === 'up' ? columnIndex - 1 : columnIndex + 1;
              if (newIndex >= 0 && newIndex < block.data.props.columns.length) {
                const newColumns = [...block.data.props.columns];
                [newColumns[columnIndex], newColumns[newIndex]] = [newColumns[newIndex], newColumns[columnIndex]];
                nDocument[id] = {
                  type: 'ColumnsContainer',
                  data: {
                    style: block.data.style,
                    props: {
                      ...block.data.props,
                      columns: newColumns,
                    },
                  } as ColumnsContainerProps,
                };
              }
            } else {
              // 否则，直接在 column.childrenIds 内交换
              const newChildrenIds = moveChildrenIds(column.childrenIds);
              block.data.props.columns[columnIndex] = {
                ...column,
                childrenIds: newChildrenIds,
              };
              nDocument[id] = {
                type: 'ColumnsContainer',
                data: {
                  style: block.data.style,
                  props: {
                    ...block.data.props,
                  },
                } as ColumnsContainerProps,
              };
            }
          }
          break;
        case 'GridContainer':
          if (block.data.props?.columns?.some(column => column.childrenIds.includes(blockId))) {
            const columnIndex = block.data.props.columns.findIndex(column => column.childrenIds.includes(blockId));
            const column = block.data.props.columns[columnIndex];

            if (currentBlockType === 'Container') {
              // 如果当前块是 Container 类型，进行 columns[index].childrenIds 的顺序交换
              const newIndex = direction === 'up' ? columnIndex - 1 : columnIndex + 1;
              if (newIndex >= 0 && newIndex < block.data.props.columns.length) {
                const newColumns = [...block.data.props.columns];
                [newColumns[columnIndex], newColumns[newIndex]] = [newColumns[newIndex], newColumns[columnIndex]];
                nDocument[id] = {
                  type: 'GridContainer',
                  data: {
                    style: block.data.style,
                    props: {
                      ...block.data.props,
                      columns: newColumns,
                    },
                  } as GridContainerProps,
                };
              }
            } else {
              // 否则，直接在 column.childrenIds 内交换
              const newChildrenIds = moveChildrenIds(column.childrenIds);
              block.data.props.columns[columnIndex] = {
                ...column,
                childrenIds: newChildrenIds,
              };
              nDocument[id] = {
                type: 'GridContainer',
                data: {
                  style: block.data.style,
                  props: {
                    ...block.data.props,
                  },
                } as ColumnsContainerProps,
              };
            }
          }
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
        <hr style={{ margin: '8px 0px', flexShrink: 0, border: ' 0.6px solid rgba(0, 0, 0, 0.12)' }} />
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
