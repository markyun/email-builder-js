import React from 'react';

import {
  AccountCircleOutlined,
  Crop32Outlined,
  HMobiledataOutlined,
  HorizontalRuleOutlined,
  HtmlOutlined,
  ImageOutlined,
  LibraryAddOutlined,
  NotesOutlined,
  SmartButtonOutlined,
  ViewColumnOutlined,
  OndemandVideoOutlined,
  GridOnOutlined,
} from '@mui/icons-material';

import { TEditorBlock } from '../../../../editor/core';

type TButtonProps = {
  label: string;
  icon: JSX.Element;
  block: () => TEditorBlock;
};
// 渲染按钮，添加页面组件
export const BUTTONS: TButtonProps[] = [
  {
    label: 'Heading',
    icon: <HMobiledataOutlined />,
    block: () => ({
      type: 'Heading',
      data: {
        props: { text: 'Heading' },
        style: {
          padding: { top: 8, bottom: 8, left: 16, right: 16 },
        },
      },
    }),
  },
  {
    label: 'Text',
    icon: <NotesOutlined />,
    block: () => ({
      type: 'Text',
      data: {
        props: { text: '### New text block, markdown supported.', markdown: true },
        style: {
          padding: { top: 0, bottom: 0, left: 0, right: 0 },
          fontWeight: 'normal',
        },
      },
    }),
  },
  {
    label: 'Button',
    icon: <SmartButtonOutlined />,
    block: () => ({
      type: 'Button',
      data: {
        props: {
          text: 'Button',
          url: 'https://www.xxx.com',
        },
        style: { padding: { top: 8, bottom: 8, left: 16, right: 16 } },
      },
    }),
  },
  {
    label: 'Image',
    icon: <ImageOutlined />,
    block: () => ({
      type: 'Image',
      data: {
        props: {
          url: 'https://cover.sli.dev/',
          alt: 'Sample background',
          contentAlignment: 'middle',
          linkHref: null,
        },
        style: { padding: { top: 8, bottom: 8, left: 16, right: 16 } },
      },
    }),
  },
  {
    label: 'Avatar',
    icon: <AccountCircleOutlined />,
    block: () => ({
      type: 'Avatar',
      data: {
        props: {
          imageUrl: 'https://ui-avatars.com/api/?size=128',
          shape: 'circle',
        },
        style: { padding: { top: 8, bottom: 8, left: 16, right: 16 } },
      },
    }),
  },
  {
    label: 'Divider',
    icon: <HorizontalRuleOutlined />,
    block: () => ({
      type: 'Divider',
      data: {
        style: { padding: { top: 16, right: 0, bottom: 16, left: 0 } },
        props: {
          lineColor: '#e5e5e5',
        },
      },
    }),
  },
  {
    label: 'Spacer',
    icon: <Crop32Outlined />,
    block: () => ({
      type: 'Spacer',
      data: {},
    }),
  },
  {
    label: 'Html',
    icon: <HtmlOutlined />,
    block: () => ({
      type: 'Html',
      data: {
        props: { contents: '<strong>Html Code</strong>' },
        style: {
          fontSize: 16,
          textAlign: null,
          padding: { top: 8, bottom: 8, left: 16, right: 16 },
        },
      },
    }),
  },

  {
    label: 'Video',
    icon: <OndemandVideoOutlined />,
    block: () => ({
      type: 'Video',
      data: {
        props: { url: '', controls: true },
        style: {
          padding: { top: 8, bottom: 8, left: 16, right: 16 },
          fontWeight: 'normal',
        },
      },
    }),
  },
  {
    label: 'Email Columns',
    icon: <ViewColumnOutlined />,
    block: () => ({
      type: 'ColumnsContainer',
      data: {
        props: {
          columnsGap: 16,
          columnsCount: 3,
          columns: [{ childrenIds: [] }, { childrenIds: [] }, { childrenIds: [] }],
        },
        style: { padding: { top: 8, bottom: 8, left: 16, right: 16 } },
      },
    }),
  },
  {
    label: 'Grid Layout',
    icon: <GridOnOutlined />,
    block: () => ({
      type: 'GridContainer',
      data: {
        props: {
          flexDirection: 'row',
          columnsCount: 3,
          columns: [{ childrenIds: [] }, { childrenIds: [] }, { childrenIds: [] }, { childrenIds: [] }, { childrenIds: [] }, { childrenIds: [] }],
        },
        style: { flex: 'flex', alignItems: 'stretch', padding: { top: 8, bottom: 8, left: 16, right: 16 } },
      },
    }),
  },
  {
    label: 'Container',
    icon: <LibraryAddOutlined />,
    block: () => ({
      type: 'Container',
      data: {
        style: { padding: { top: 8, bottom: 8, left: 16, right: 16 } },
      },
    }),
  },

  // { label: 'ProgressBar', icon: <ProgressBarOutlined />, block: () => ({}) },
  // { label: 'LoopContainer', icon: <ViewListOutlined />, block: () => ({}) },
];
