import React, { CSSProperties } from 'react';
import { z } from 'zod';

const COLOR_SCHEMA = z
  .string()
  .regex(/^#[0-9a-fA-F]{6}$/)
  .nullable()
  .optional();

const PADDING_SCHEMA = z
  .object({
    top: z.number(),
    bottom: z.number(),
    right: z.number(),
    left: z.number(),
  })
  .optional()
  .nullable();

const getPadding = (padding: z.infer<typeof PADDING_SCHEMA>) =>
  padding ? `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px` : undefined;

const getMargin = (margin: z.infer<typeof PADDING_SCHEMA>) =>
  margin ? `${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px` : undefined;

export const ContainerPropsSchema = z.object({
  style: z
    .object({
      backgroundColor: COLOR_SCHEMA,
      borderColor: COLOR_SCHEMA,
      borderRadius: z.number().optional().nullable(),
      bgSetting: z.any().optional().nullable(),
      url: z.any().optional().nullable(),
      padding: PADDING_SCHEMA,
      margin: PADDING_SCHEMA,
      float: z.any().optional().nullable(),
      right: z.any().optional().nullable(),
      left: z.any().optional().nullable(),
      bottom: z.any().optional().nullable(),
      top: z.any().optional().nullable(),
    })
    .optional()
    .nullable(),
});

export type ContainerProps = {
  style?: z.infer<typeof ContainerPropsSchema>['style'];
  children?: JSX.Element | JSX.Element[] | null;
};

function getBorder(style: ContainerProps['style']) {
  if (!style || !style.borderColor) {
    return undefined;
  }
  return `1px solid ${style.borderColor}`;
}

export function Container({ style, children }: ContainerProps) {
  const { url, bgSetting } = style ?? {};
  let wStyle: CSSProperties = {
    position: 'relative',
    backgroundColor: style?.backgroundColor ?? undefined,
    border: getBorder(style),
    borderRadius: style?.borderRadius ?? undefined,
    padding: getPadding(style?.padding),
    margin: getMargin(style?.margin),
    right: `${style?.float?.right}px`,
    left: `${style?.float?.left}px`,
    top: `${style?.float?.top}px`,
    bottom: `${style?.float?.bottom}px`,
    backgroundImage: url ? `url(${url})` : '',
  };
  if (bgSetting) {
    wStyle = {
      position: 'relative',
      backgroundColor: style?.backgroundColor ?? undefined,
      border: getBorder(style),
      borderRadius: style?.borderRadius ?? undefined,
      padding: getPadding(style?.padding),
      margin: getMargin(style?.margin),
      right: `${style?.float?.right}px`,
      left: `${style?.float?.left}px`,
      top: `${style?.float?.top}px`,
      bottom: `${style?.float?.bottom}px`,
      background: url ? `url(${style?.url}) ${bgSetting}` : `${bgSetting}`,
    };
  }
  if (!children) {
    return <div style={wStyle} />;
  }
  return <div style={wStyle}>{children}</div>;
}
