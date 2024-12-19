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

const FIXED_WIDTHS_SCHEMA = z
  .tuple([
    z.any().nullish(),
    z.any().nullish(),
    z.any().nullish(),
    z.any().nullish(),
    z.any().nullish(),
    z.any().nullish(),
  ])
  .optional()
  .nullable();

const getPadding = (padding: z.infer<typeof PADDING_SCHEMA>) =>
  padding ? `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px` : undefined;

export const GridPropsSchema = z.object({
  style: z
    .object({
      backgroundColor: COLOR_SCHEMA,
      padding: PADDING_SCHEMA,
      flex: z.any().optional().nullable(),
      flexDirection: z.any().optional().nullable(),
      flexWrap: z.any().optional().nullable(),
      justifyContent: z.any().optional().nullable(),
      alignContent: z.any().optional().nullable(),
      alignItems: z.any().optional().nullable(),
      alignSelf: z.any().optional().nullable(),
      gap: z.any().optional().nullable(),
    })
    .optional()
    .nullable(),
  props: z
    .object({
      fixedWidths: FIXED_WIDTHS_SCHEMA,
      columnsCount: z.number().optional().nullable(),
      columnsGap: z.number().optional().nullable(),
      // contentAlignment: z.enum(['top', 'middle', 'bottom']).optional().nullable(),
      contentAlignment: z.enum(['center', 'flex-start', 'flex-end', 'stretch']).optional().nullable(),
      writingMode: z.any().optional().nullable(),
    })
    .optional()
    .nullable(),
});

type TColumn = JSX.Element | JSX.Element[] | null;
export type GridContainerProps = z.infer<typeof GridPropsSchema> & {
  columns?: TColumn[];
};

const ColumnsContainerPropsDefaults = {
  columnsCount: 2,
  columnsGap: 20,
  contentAlignment: 'stretch',
} as const;

export function GridContainer({ style, columns, props }: GridContainerProps) {
  const wStyle: CSSProperties = {
    backgroundColor: style?.backgroundColor ?? undefined,
    padding: getPadding(style?.padding),
  };

  const blockProps = {
    columnsCount: props?.columnsCount ?? ColumnsContainerPropsDefaults.columnsCount,
    columnsGap: props?.columnsGap ?? ColumnsContainerPropsDefaults.columnsGap,
    contentAlignment: props?.contentAlignment ?? ColumnsContainerPropsDefaults.contentAlignment,
    fixedWidths: props?.fixedWidths,
  };
  const columnsCount = [props?.columnsCount] ?? [ColumnsContainerPropsDefaults.columnsCount];
  const columnsArray = Array.from({ length: columnsCount ?? 2 }, (_, index) => index) as number[];
  const gridStyle = {
    display: style?.flex ?? 'flex', // 使用 flex 布局
    flexDirection: style?.flexDirection ?? 'row', // 水平行 或 垂直列
    flexWrap: style?.flexWrap ?? 'wrap', // 放在一条线上 、还是可以换行;
    justifyContent: style?.justifyContent ?? 'space-around', // 容器的列 水平对齐方式
    alignContent: style?.alignContent ?? 'flex-start', // 容器的列 对齐方式
    alignItems: blockProps?.contentAlignment ?? 'stretch', // 垂直对齐方式 (铺满高度)
    alignSelf: style?.alignSelf ?? 'stretch', // 垂直对齐方式 (铺满高度)
    gap: blockProps?.columnsGap, // flex 布局 间距
    writingMode: props?.writingMode ?? 'horizontal-tb', // 书写方式
  };

  return (
    <div style={wStyle}>
      <div style={gridStyle}>
        {columnsArray.map((element, index) => {
          const gridItemStyle = {
            flex: props?.fixedWidths?.[index] ? '0 0 auto' : '1 0 0%', // 没有设置宽度时 自动撑开， 否则 0 0 20%
            width: props?.fixedWidths?.[index] ? `${props?.fixedWidths?.[index]}%` : undefined, // 没有设置宽度时 自动撑开， 否则 0 0 20%
          };
          return <Col style={gridItemStyle} index={index} key={index} props={blockProps} columns={columns} />;
        })}
      </div>
    </div>
  );
}

type Props = {
  props: {
    fixedWidths: z.infer<typeof FIXED_WIDTHS_SCHEMA>;
    columnsCount: number;
    columnsGap: number;
    contentAlignment: string;
  };
  index: number;
  columns?: TColumn[];
  style?: any;
};
function Col({ style, index, props, columns }: Props) {
  const children = (columns && columns[index]) ?? null;
  return <div style={style}>{children}</div>;
}
