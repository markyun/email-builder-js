/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useRef } from 'react';
import { z } from 'zod';

const FONT_FAMILY_SCHEMA = z
  .enum([
    'MODERN_SANS',
    'BOOK_SANS',
    'ORGANIC_SANS',
    'GEOMETRIC_SANS',
    'HEAVY_SANS',
    'ROUNDED_SANS',
    'MODERN_SERIF',
    'BOOK_SERIF',
    'MONOSPACE',
  ])
  .nullable()
  .optional();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFontFamily(fontFamily: z.infer<typeof FONT_FAMILY_SCHEMA>) {
  // eslint-disable-next-line default-case
  switch (fontFamily) {
    case 'MODERN_SANS':
      return '"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif';
    case 'BOOK_SANS':
      return 'Optima, Candara, "Noto Sans", source-sans-pro, sans-serif';
    case 'ORGANIC_SANS':
      return 'Seravek, "Gill Sans Nova", Ubuntu, Calibri, "DejaVu Sans", source-sans-pro, sans-serif';
    case 'GEOMETRIC_SANS':
      return 'Avenir, "Avenir Next LT Pro", Montserrat, Corbel, "URW Gothic", source-sans-pro, sans-serif';
    case 'HEAVY_SANS':
      return 'Bahnschrift, "DIN Alternate", "Franklin Gothic Medium", "Nimbus Sans Narrow", sans-serif-condensed, sans-serif';
    case 'ROUNDED_SANS':
      return 'ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa, Manjari, "Arial Rounded MT Bold", Calibri, source-sans-pro, sans-serif';
    case 'MODERN_SERIF':
      return 'Charter, "Bitstream Charter", "Sitka Text", Cambria, serif';
    case 'BOOK_SERIF':
      return '"Iowan Old Style", "Palatino Linotype", "URW Palladio L", P052, serif';
    case 'MONOSPACE':
      return '"Nimbus Mono PS", "Courier New", "Cutive Mono", monospace';
  }
  return undefined;
}

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

export const NudgePropsSchema = z.object({
  elementId: z.string().optional().nullable(),
  elementType: z.enum(['text', 'image', 'button']).optional().nullable(),
  elementContent: z.any().optional().nullable(),
  style: z
    .object({
      color: COLOR_SCHEMA,
      padding: PADDING_SCHEMA,
    })
    .optional()
    .nullable(),
  props: z
    .object({
      text: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
});

export type NudgeProps = z.infer<typeof NudgePropsSchema>;

export const NudgePropsDefaults = {
  text: 'default',
  elementType: 'text',
  elementContent: null,
};


export function CEENudge({ elementId, elementType, elementContent, style, props }) {
  const content = elementContent ?? null;
  const text = props?.text ?? NudgePropsDefaults.text;

  // 创建元素
  let element;
  switch (elementType) {
    case 'text':
      element = document.createElement('div');
      element.textContent = content ?? text;
      break;
    case 'image':
      element = document.createElement('img');
      element.src = content as string;
      element.alt = text;
      break;
    case 'button':
      element = document.createElement('button');
      element.textContent = content as string;
      break;
    default:
      element = document.createElement('div');
      element.textContent = content ?? text;
  }

  // 设置样式
  if (element instanceof HTMLElement) {
    Object.assign(element.style, style);
    element.style.position = 'fixed'; // 设置为fixed，以便悬浮
    // 计算位置并设置
    const targetElement = document.getElementById(elementId) || document.querySelector(`.${elementId}`);
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      element.style.top = `${rect.top + window.scrollY}px`;
      element.style.left = `${rect.left + window.scrollX}px`;
    }
  }

  // 将元素添加到页面中
  document.body.appendChild(element);

  console.log("🚀 ~ CEENudge插件，将元素添加到页面中 ~ element:", element);
  // 返回一个函数，用于清理和移除悬浮层
  return () => {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  };
}
