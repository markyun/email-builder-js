/* eslint-disable no-useless-return */
/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
import React, { CSSProperties, useState } from 'react';

import { Box, Breadcrumbs, Link } from '@mui/material';

import { useCurrentBlockId } from '../../../editor/EditorBlock';
import { useDocument, setSelectedBlockId, useSelectedBlockId } from '../../../editor/EditorContext';
import TuneMenu from './TuneMenu';
import './breadcrumb.css';

type TEditorBlockWrapperProps = {
  children: JSX.Element;
};

export default function EditorBlockWrapper({ children }: TEditorBlockWrapperProps) {
  const selectedBlockId = useSelectedBlockId();
  const document = useDocument();
  const [mouseInside, setMouseInside] = useState(false);
  const blockId = useCurrentBlockId();

  function findNodeHierarchy(nodeId, nodes) {
    // 首先检查节点是否存在
    if (!nodes[nodeId]) {
      return [];
    }

    const hierarchy = [{ id: nodeId, type: nodes[nodeId].type }]; // 始终包含目标节点本身

    function traverse(currentId) {
      // eslint-disable-next-line guard-for-in
      for (const id in nodes) {
        const node = nodes[id];
        if (node.data && node.data.props) {
          // 检查是否是ColumnsContainer类型的节点
          if (node.type === 'ColumnsContainer') {
            const columnIndex = node.data.props.columns.findIndex((column) => {
              return column.childrenIds && column.childrenIds.includes(currentId);
            });
            if (columnIndex !== -1) {
              hierarchy.unshift({ id, type: node.type }); // 添加当前父节点的ID和类型
              return traverse(id); // 继续向上遍历
            }
          }
          // 检查是否有子节点数组
          if (Array.isArray(node.data.props.childrenIds) && node.data.props.childrenIds.includes(currentId)) {
            hierarchy.unshift({ id, type: node.type }); // 添加当前父节点的ID和类型
            return traverse(id); // 继续向上遍历
          }
        }
      }
      // 如果已经到达根节点，停止递归
      if (hierarchy.length === 1 || (hierarchy[0].type === 'EmailLayout' && hierarchy[1].id === 'root')) {
        return;
      }
      // 如果没有找到父节点，尝试向上遍历到根节点
      // const rootId = Object.keys(nodes).find(key => nodes[key].type === 'EmailLayout');
      // if (rootId) {
      //   hierarchy.unshift({ id: rootId, type: 'EmailLayout' });
      // }
    }

    // 从目标节点开始递归
    traverse(nodeId);

    return hierarchy;
  }

  const hierarchy = findNodeHierarchy(selectedBlockId, document);

  let outline: CSSProperties['outline'];
  if (selectedBlockId === blockId) {
    outline = '2px solid rgba(0,121,204, 1)';
  } else if (mouseInside) {
    outline = '2px solid rgba(0,121,204, 0.3)';
  }
  //  编辑器菜单，上下移动，删除功能
  const renderMenu = () => {
    if (selectedBlockId !== blockId) {
      return null;
    }
    return <TuneMenu blockId={blockId} />;
  };

  function handleBlockIdClick(ev, id) {
    setSelectedBlockId(id);
    ev.stopPropagation();
    ev.preventDefault();
  }
  //  编辑器面包屑导航栏
  const renderNav = () => {
    if (selectedBlockId !== blockId) {
      return null;
    }
    return (
      <>
        <div role="presentation" aria-label="breadcrumb" className="cee-breadcrumb">
          <Breadcrumbs aria-label="breadcrumb">
            {hierarchy.map(({ id, type }) => {
              return (
                <Link underline="hover" color="inherit" onClick={(event) => handleBlockIdClick(event, id)} key={id}>
                  {type}
                </Link>
              );
            })}
          </Breadcrumbs>
        </div>
      </>
    );
  };

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          maxWidth: '100%',
          outlineOffset: '-1px',
          outline,
        }}
        onMouseEnter={(ev) => {
          setMouseInside(true);
          ev.stopPropagation();
        }}
        onMouseLeave={() => {
          setMouseInside(false);
        }}
        onClick={(ev) => {
          setSelectedBlockId(blockId);
          ev.stopPropagation();
          ev.preventDefault();
        }}
      >
        {renderMenu()}
        {renderNav()}
        {children}
      </Box>
    </>
  );
}
